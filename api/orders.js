import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://rachit4907_db_user:3Jmy3PRD0an8rAAU@cluster0.4xensun.mongodb.net/cutiepage?retryWrites=true&w=majority';

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}

const OrderSchema = new mongoose.Schema({
  customerName: String,
  customerPhone: String,
  templateTitle: String,
  price: String,
  status: { type: String, default: 'Pending WhatsApp' },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.status(200).json(orders);
    }

    if (req.method === 'POST') {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const newOrder = new Order(payload);
      await newOrder.save();
      return res.status(201).json({ success: true, order: newOrder });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await Order.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: 'Order deleted' });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
