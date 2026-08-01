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

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas Database: cutiepage'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Schemas & Models
const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  templateTitle: { type: String, required: true },
  price: { type: String, required: true },
  status: { type: String, default: 'Pending WhatsApp' },
  createdAt: { type: Date, default: Date.now }
});

const ProjectSchema = new mongoose.Schema({
  projectId: { type: String, required: true, unique: true },
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

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true, default: '' },
  category: { type: String, required: true, default: 'love' },
  image: { type: String, required: true },
  images: [{ type: String }],
  price: { type: String, required: true },
  originalPrice: { type: String, default: '' },
  discount: { type: String, default: '' },
  badge: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', OrderSchema);
const Project = mongoose.model('Project', ProjectSchema);
const Product = mongoose.model('Product', ProductSchema);

// Slug Helper Function for unique slug generation
async function generateUniqueSlug(title, currentId = null) {
  let baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (!baseSlug) baseSlug = 'product';

  let slug = baseSlug;
  let count = 1;

  while (true) {
    const existing = await Product.findOne({ slug });
    if (!existing || (currentId && existing._id.toString() === currentId.toString())) {
      return slug;
    }
    count++;
    slug = `${baseSlug}-${count}`;
  }
}

// Default Seed Products
const seedDefaultProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      const defaults = [
        {
          title: 'Sweet Birthday',
          slug: 'sweet-birthday',
          description: '🎉 A cute little surprise they will never forget! Add custom photos, wishes, background music, and instant QR code.',
          category: 'birthday',
          image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
          images: ['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80'],
          price: '₹79',
          originalPrice: '₹419',
          discount: '81% OFF',
          badge: 'POPULAR',
          featured: true,
          active: true
        },
        {
          title: 'Cutie Pack (All 17 Templates)',
          slug: 'cutie-pack-bundle',
          description: 'Unlock every current and future premium template. Pay once. Access forever with lifetime hosting and instant WhatsApp support!',
          category: 'love',
          image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
          images: ['https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80'],
          price: '₹999',
          originalPrice: '₹2,583',
          discount: 'SAVE ₹1,584',
          badge: 'BUNDLE',
          featured: true,
          active: true
        },
        {
          title: 'Friendship Day Special',
          slug: 'friendship-day',
          description: '🎈 Floating hot-air balloon unseal letter carrying their name with background music and custom photo memories timeline.',
          category: 'friendship',
          image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
          images: ['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80'],
          price: '₹309',
          originalPrice: '₹618',
          discount: '50% OFF',
          badge: 'TRENDING',
          featured: true,
          active: true
        },
        {
          title: 'Romantic Sky Lanterns',
          slug: 'romantic-sky-lanterns',
          description: '💖 Flying heart balloons carrying a romantic unseal letter with background piano music, custom polaroid photos & memory timeline.',
          category: 'love',
          image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
          images: ['https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80'],
          price: '₹399',
          originalPrice: '₹798',
          discount: '50% OFF',
          badge: 'ROMANTIC',
          featured: true,
          active: true
        },
        {
          title: 'Netflix Style Love Story',
          slug: 'netflix-style-memory-lane',
          description: '🎬 Stream your love story like a Netflix movie with episodes, trailers, custom subtitles, and secret message reveals.',
          category: 'love',
          image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
          images: ['https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80'],
          price: '₹449',
          originalPrice: '₹898',
          discount: 'BESTSELLER',
          badge: 'BESTSELLER',
          featured: true,
          active: true
        }
      ];
      await Product.insertMany(defaults);
      console.log('🌱 Seeded default templates into MongoDB Atlas');
    }
  } catch (err) {
    console.error('Seeding error:', err);
  }
};

seedDefaultProducts();

// HEALTH CHECK
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Cutiepage MongoDB Backend API is running' });
});

// ORDERS API
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, order: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PRODUCTS API
app.get('/api/products', async (req, res) => {
  try {
    const { category, featured, active, search, sort } = req.query;
    let query = {};

    if (category && category !== 'all') {
      query.category = category;
    }
    if (featured === 'true') {
      query.featured = true;
    }
    if (active === 'true') {
      query.active = true;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    let sortOptions = { createdAt: -1 }; // Default newest first
    if (sort === 'oldest') sortOptions = { createdAt: 1 };

    const products = await Product.find(query).sort(sortOptions);
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/products/:slug', async (req, res) => {
  try {
    const param = req.params.slug;
    let product = null;

    if (mongoose.Types.ObjectId.isValid(param)) {
      product = await Product.findById(param);
    }
    if (!product) {
      product = await Product.findOne({ slug: param });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { title, description, category, price, originalPrice, discount, image, badge, featured, active } = req.body;

    if (!title || !description || !price || !image) {
      return res.status(400).json({ success: false, message: 'Title, Description, Price, and Image are required' });
    }

    const uniqueSlug = await generateUniqueSlug(title);

    const newProduct = new Product({
      title,
      slug: uniqueSlug,
      description,
      category: category || 'love',
      price,
      originalPrice: originalPrice || '',
      discount: discount || '',
      badge: badge || '',
      image,
      images: [image],
      featured: featured !== undefined ? featured : false,
      active: active !== undefined ? active : true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await newProduct.save();
    console.log(`✅ Saved Product into MongoDB Atlas: ${newProduct.title} (${newProduct.slug})`);

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error('❌ Error creating product:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const prodId = req.params.id;
    let updateData = { ...req.body, updatedAt: new Date() };

    if (updateData.title) {
      updateData.slug = await generateUniqueSlug(updateData.title, prodId);
    }

    const updated = await Product.findByIdAndUpdate(prodId, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, product: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const prodId = req.params.id;
    let deleted = null;

    if (mongoose.Types.ObjectId.isValid(prodId)) {
      deleted = await Product.findByIdAndDelete(prodId);
    }
    if (!deleted) {
      deleted = await Product.findOneAndDelete({ slug: prodId });
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PROJECTS API
app.post('/api/projects', async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { projectId: req.body.projectId },
      req.body,
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/projects/:projectId', async (req, res) => {
  try {
    const project = await Project.findOne({ projectId: req.params.projectId });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Cutiepage Express Server running on http://localhost:${PORT}`);
});
