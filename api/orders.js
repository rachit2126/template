import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://rachit4907_db_user:3Jmy3PRD0an8rAAU@cluster0.4xensun.mongodb.net/cutiepage?retryWrites=true&w=majority';

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) return cachedDb;
  const db = await mongoose.connect(MONGODB_URI);
  cachedDb = db;
  return db;
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
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.json(orders);
    }

    if (req.method === 'POST') {
      const newOrder = new Order(req.body);
      await newOrder.save();
      return res.status(201).json({ success: true, order: newOrder });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await Order.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Order deleted' });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
