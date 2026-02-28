import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Challenge } from '../types';
import { io } from 'socket.io-client';

export const ChallengesView: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await api.getChallenges();
        setChallenges(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();

    const socket = io();
    socket.on('challenge_update', (updatedChallenge: Challenge) => {
      setChallenges(prev => prev.map(c => c.id === updatedChallenge.id ? updatedChallenge : c));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleJoin = async (id: string) => {
    try {
      const updated = await api.joinChallenge(id);
      setChallenges(prev => prev.map(c => c.id === id ? updated : c));
    } catch (e) {
      alert('Failed to join challenge');
    }
  };

  if (loading) return <div className="py-20 text-center text-slate-400">Loading challenges...</div>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {challenges.map(challenge => (
          <div key={challenge.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
              <div className="flex justify-between items-start mb-4">
                <span className="p-3 bg-white/20 rounded-2xl text-2xl">🏆</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {challenge.type}
                </span>
              </div>
              <h3 className="text-2xl font-black mb-2">{challenge.name}</h3>
              <p className="text-blue-100 text-sm">Target: {challenge.target.toLocaleString()} {challenge.type === 'steps' ? 'steps' : 'units'}</p>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Leaderboard</h4>
              <div className="space-y-4 flex-1">
                {challenge.leaderboard.length === 0 ? (
                  <p className="text-slate-400 text-sm italic py-4">No participants yet. Be the first!</p>
                ) : (
                  challenge.leaderboard
                    .sort((a, b) => b.score - a.score)
                    .map((entry, idx) => (
                      <div key={entry.userId} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${
                            idx === 0 ? 'bg-yellow-100 text-yellow-700' : 
                            idx === 1 ? 'bg-slate-100 text-slate-700' : 
                            idx === 2 ? 'bg-orange-100 text-orange-700' : 
                            'bg-slate-50 text-slate-400'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="font-bold text-slate-700 text-sm">{entry.name}</span>
                        </div>
                        <span className="font-black text-slate-900 text-sm">{entry.score.toLocaleString()}</span>
                      </div>
                    ))
                )}
              </div>

              <button 
                onClick={() => handleJoin(challenge.id)}
                className="mt-8 w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all active:scale-[0.98]"
              >
                Join Challenge
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
