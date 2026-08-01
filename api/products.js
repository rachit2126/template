import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://rachit4907_db_user:3Jmy3PRD0an8rAAU@cluster0.4xensun.mongodb.net/cutiepage?retryWrites=true&w=majority';

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      return m;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}

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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default async function handler(req, res) {
  // Disable all serverless/CDN/edge caching for 100% fresh data on every request
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const { category, featured, active, search, slug } = req.query;

      if (slug) {
        let product = await Product.findOne({ slug });
        if (!product && mongoose.Types.ObjectId.isValid(slug)) {
          product = await Product.findById(slug);
        }
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        return res.status(200).json(product);
      }

      let query = {};
      if (category && category !== 'all') query.category = category;
      if (featured === 'true') query.featured = true;
      if (active === 'true') query.active = { $ne: false };
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } }
        ];
      }

      const products = await Product.find(query).sort({ createdAt: -1 });
      console.log(`[API /api/products] Returned ${products.length} products from MongoDB. IDs:`, products.map(p => p._id.toString()));
      return res.status(200).json(products);
    }

    if (req.method === 'POST') {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const { title, description, category, price, originalPrice, discount, image, badge, featured, active } = payload;

      if (!title || !price || !image) {
        return res.status(400).json({ success: false, message: 'Title, Price, and Image are required' });
      }

      const baseSlug = title.toLowerCase().trim().replace(/[^a-z0-9]/g, '-');
      let uniqueSlug = baseSlug || 'product';
      let count = 1;
      while (await Product.findOne({ slug: uniqueSlug })) {
        count++;
        uniqueSlug = `${baseSlug}-${count}`;
      }

      const newProduct = new Product({
        title,
        slug: uniqueSlug,
        description: description || '',
        category: category || 'love',
        price,
        originalPrice: originalPrice || '',
        discount: discount || '',
        badge: badge || '',
        image,
        featured: featured !== undefined ? featured : false,
        active: active !== undefined ? active : true,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      await newProduct.save();
      console.log('✅ Created product in MongoDB Atlas via Vercel Function:', newProduct.title, newProduct._id.toString());
      return res.status(201).json({ success: true, product: newProduct });
    }

    if (req.method === 'PUT') {
      const { id } = req.query;
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const updated = await Product.findByIdAndUpdate(id, { ...payload, updatedAt: new Date() }, { new: true });
      return res.status(200).json({ success: true, product: updated });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      let deleted = null;
      if (mongoose.Types.ObjectId.isValid(id)) {
        deleted = await Product.findByIdAndDelete(id);
      }
      if (!deleted) {
        deleted = await Product.findOneAndDelete({ slug: id });
      }
      return res.status(200).json({ success: true, message: 'Product deleted' });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    console.error('MongoDB API Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
