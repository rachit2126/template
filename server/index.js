import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://rachit4907_db_user:3Jmy3PRD0an8rAAU@cluster0.4xensun.mongodb.net/cutiepage?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json());

// MongoDB Mongoose Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas Database: cutiepage'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Schemas & Models
const OrderSchema = new mongoose.Schema({
  templateTitle: String,
  templateSlug: String,
  price: String,
  customerName: String,
  customerPhone: String,
  recipientName: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

const ProjectSchema = new mongoose.Schema({
  projectId: String,
  title: String,
  recipientName: String,
  templateSlug: String,
  pinCode: String,
  photos: [String],
  letterMessage: String,
  songUrl: String,
  isPublished: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', OrderSchema);
const Project = mongoose.model('Project', ProjectSchema);

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Cutiepage MongoDB Backend API is running' });
});

// Orders API
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Projects API
app.post('/api/projects', async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { projectId: req.body.projectId },
      req.body,
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/projects/:projectId', async (req, res) => {
  try {
    const project = await Project.findOne({ projectId: req.params.projectId });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Cutiepage Express Server running on http://localhost:${PORT}`);
});
