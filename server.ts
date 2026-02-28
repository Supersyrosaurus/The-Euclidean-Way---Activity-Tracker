import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const PORT = 3000;
const JWT_SECRET = "activity-track-secret-123";

// In-memory database
const db = {
  users: [] as any[],
  activities: [] as any[],
  goals: [] as any[],
  steps: [] as any[],
  challenges: [
    { id: '1', name: '10k Steps Daily', type: 'steps', target: 10000, participants: [], leaderboard: [] },
    { id: '2', name: 'Calorie Crusher', type: 'calories', target: 500, participants: [], leaderboard: [] }
  ] as any[]
};

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: { origin: "*" }
  });

  app.use(cors());
  app.use(express.json());

  // Auth Middleware
  const authenticate = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  // Auth Routes
  app.post("/api/register", async (req, res) => {
    const { email, password, name } = req.body;
    if (db.users.find(u => u.email === email)) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: Math.random().toString(36).substr(2, 9), email, password: hashedPassword, name, profile: { weight: 70, height: 175, age: 25, gender: 'other' } };
    db.users.push(user);
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, profile: user.profile } });
  });

  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const user = db.users.find(u => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, profile: user.profile } });
  });

  // Profile Routes
  app.get("/api/profile", authenticate, (req: any, res) => {
    const user = db.users.find(u => u.id === req.user.id);
    res.json(user.profile);
  });

  app.put("/api/profile", authenticate, (req: any, res) => {
    const userIndex = db.users.findIndex(u => u.id === req.user.id);
    db.users[userIndex].profile = { ...db.users[userIndex].profile, ...req.body };
    res.json(db.users[userIndex].profile);
  });

  // Activity Routes
  app.get("/api/activities", authenticate, (req: any, res) => {
    const activities = db.activities.filter(a => a.userId === req.user.id);
    res.json(activities);
  });

  app.post("/api/activities", authenticate, (req: any, res) => {
    const activity = { ...req.body, id: Math.random().toString(36).substr(2, 9), userId: req.user.id, timestamp: Date.now() };
    db.activities.push(activity);
    res.json(activity);
  });

  // Goals Routes
  app.get("/api/goals", authenticate, (req: any, res) => {
    const goals = db.goals.filter(g => g.userId === req.user.id);
    res.json(goals);
  });

  app.post("/api/goals", authenticate, (req: any, res) => {
    const goal = { ...req.body, id: Math.random().toString(36).substr(2, 9), userId: req.user.id };
    db.goals.push(goal);
    res.json(goal);
  });

  // Steps Routes
  app.get("/api/steps", authenticate, (req: any, res) => {
    const steps = db.steps.filter(s => s.userId === req.user.id);
    res.json(steps);
  });

  app.post("/api/steps", authenticate, (req: any, res) => {
    const stepEntry = { ...req.body, id: Math.random().toString(36).substr(2, 9), userId: req.user.id, timestamp: Date.now() };
    db.steps.push(stepEntry);
    res.json(stepEntry);
  });

  // Challenges Routes
  app.get("/api/challenges", authenticate, (req: any, res) => {
    res.json(db.challenges);
  });

  app.post("/api/challenges/:id/join", authenticate, (req: any, res) => {
    const challenge = db.challenges.find(c => c.id === req.params.id);
    if (!challenge) return res.status(404).json({ error: "Challenge not found" });
    if (!challenge.participants.includes(req.user.id)) {
      challenge.participants.push(req.user.id);
      challenge.leaderboard.push({ userId: req.user.id, name: db.users.find(u => u.id === req.user.id).name, score: 0 });
    }
    io.emit("challenge_update", challenge);
    res.json(challenge);
  });

  // Socket.io for real-time updates
  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => console.log("User disconnected"));
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
