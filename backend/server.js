const express = require('express');
const cors = require('cors');
const db = require('./models');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with support for credentials
app.use(cors({
  origin: '*', // For development. You can customize this to allow only specific domains
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Standard Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Printing Service API is online' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Unhandled route handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Global Error Handler
app.use(errorHandler);

// Database connection & Server initialization
const startServer = async () => {
  try {
    // Authenticate database connection
    await db.sequelize.authenticate();
    console.log('✅ Connection to MySQL database has been established successfully.');

    // Sync database models (creates tables if they don't exist)
    // In production, you would use Migrations instead of sync.
    await db.sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized successfully.');

    // Optional: Seed initial admin user and products if tables are empty
    await seedInitialData();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`🔗 API Health: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database or start server:', error);
    process.exit(1);
  }
};

// Helper to seed initial data in server startup if empty
async function seedInitialData() {
  try {
    const userCount = await db.User.count();
    if (userCount === 0) {
      await db.User.create({
        username: 'admin_xuannhi',
        email: 'inanxuannhi@gmail.com',
        // '$2a$10$SampleHashString1234567890' is a bcrypt hash for 'admin123' or similar. 
        // We will seed standard passwords so user can login with 'admin123'
        password: 'admin123',
        phone: '0943126406',
        role: 'admin'
      });
      await db.User.create({
        username: 'khachhang01',
        email: 'nguyenvana@gmail.com',
        password: 'customer123',
        phone: '0912345678',
        role: 'customer'
      });
      console.log('🌱 Seeded default users: admin_xuannhi (password: admin123), khachhang01 (password: customer123)');
    }

    const productCount = await db.Product.count();
    if (productCount === 0) {
      await db.Product.bulkCreate([
        {
          title: 'In túi giấy mỹ phẩm dược phẩm',
          description: 'Túi giấy cao cấp, thiết kế trang nhã phù hợp cho ngành mỹ phẩm và dược phẩm.',
          price: 12000.00,
          imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=60',
          isFeatured: true
        },
        {
          title: 'In túi giấy quà tặng',
          description: 'Túi giấy sang trọng dành cho các sự kiện, có hỗ trợ ép kim và bế nổi logo.',
          price: 15000.00,
          imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=60',
          isFeatured: true
        },
        {
          title: 'In name card giấy mỹ thuật',
          description: 'Danh thiếp sử dụng giấy mỹ thuật cao cấp, dập nổi, sang trọng.',
          price: 120000.00,
          imageUrl: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=600&auto=format&fit=crop&q=60',
          isFeatured: false
        },
        {
          title: 'In tờ gấp 3 (Brochure A4)',
          description: 'In tờ gấp chất lượng cao, công nghệ in offset sắc nét, cấn 2 đường chuẩn.',
          price: 4500.00,
          imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=60',
          isFeatured: true
        }
      ]);
      console.log('🌱 Seeded default products.');
    }
  } catch (error) {
    console.error('⚠️ Seeding error:', error);
  }
}

startServer();
