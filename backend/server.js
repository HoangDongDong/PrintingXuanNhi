const express = require('express');
const cors = require('cors');
const db = require('./models');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
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
app.use('/api/categories', categoryRoutes);

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

    // Sync database models (creates tables if they don't exist, safely alters if they changed)
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

    const categoryCount = await db.Category.count();
    if (categoryCount === 0) {
      await db.Category.bulkCreate([
        { id: 1, name: 'Catalogue', icon: 'menu_book' },
        { id: 2, name: 'Hóa đơn', icon: 'receipt_long' },
        { id: 3, name: 'Hộp giấy', icon: 'package_2' },
        { id: 4, name: 'Túi giấy', icon: 'shopping_bag' },
        { id: 5, name: 'Nhãn Decal', icon: 'label' },
        { id: 6, name: 'Thiệp mời', icon: 'mail' },
        { id: 7, name: 'In name card', icon: 'badge' },
        { id: 8, name: 'In tờ gấp', icon: 'layers' },
        { id: 9, name: 'In Bao Thư', icon: 'drafts' },
        { id: 10, name: 'In Phiếu Quà Tặng', icon: 'confirmation_number' }
      ]);
      console.log('🌱 Seeded default categories.');
    }

    const productCount = await db.Product.count();
    if (productCount === 0) {
      await db.Product.bulkCreate([
        {
          title: 'Name Card Cao Cấp',
          description: 'Giấy mỹ thuật 300gsm, cán màng mờ, in 2 mặt sắc nét.',
          price: 120000.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxdHHhr7il-_6Xm5Ul_7DR8l-RnjDIGZ0KygA1K7--kWj7FabntmeNoRcGtf2q4MmMftyOAZiEIy5W7omKy8d8kexR2VQxWfUBe_dNKS9icoANZZ8-kcbVqoxaPKQCSr-koH5MGRbh-FoFldmnf51N3a-gcHC70lZnI1-IGgNh-8mbDXNE7BFipSS-5pzwtv9gYM2wAwvPKBV-mL_-vuJAOmwxrgzlPNDSaAnvDBTVIdbluooSi9i9cg',
          isFeatured: true,
          categoryId: 7
        },
        {
          title: 'Catalogue Doanh Nghiệp',
          description: 'Khổ A4, đóng kim hoặc keo gáy, màu sắc trung thực.',
          price: 4500.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM8x4Jxic2AQdZEmpjOesegkjBSBqvslS-7kx2z8f8LIec1YAHLUyOJ2mYp2ZJXAgOnMyIvKuwdPmAx1o8Zn4ZopTTfVf4QkKFNW99sFI_lqEF6HvuteGVRUCCdG9GpnBElBSD9Tsl3S8iropobEBAGCdFcZc0yhFMr4txoGqMs61TR0RMtcEjyc3eh49Ukor8MkDZNqiEoCB81yHAXaTCM7x7CnYEPLepUm57TgiNSoIZTDVtUBtWRA',
          isFeatured: true,
          categoryId: 1
        },
        {
          title: 'Túi Giấy Kraft',
          description: 'Chất liệu thân thiện, chịu lực tốt, in logo theo yêu cầu.',
          price: 15000.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1FswSd6Oa3_caQgRqfVj7-vA8ZM2fk8quVnjzIX2E1uYFMFTc_WN0pP3n1WokX3T8nWlP9Q1EAo6ODpasPswSeeZPObxeVLGtBz3gCERLw2NcYpVXeZGpRyoYM-h-jN6iqZ73E3522mwYPPLf5JZ4kYgmOBoQncKDs4CxRqHCYO8vZwLXAc9wzThJ3szo2Iz2ZL7tM8NPfz0tUqYGLW4nSSRH4PRr5EpQ_q96A_qU4RHW6sEzvjXTcw',
          isFeatured: true,
          categoryId: 4
        },
        {
          title: 'Nhãn Decal Cuộn',
          description: 'Chống nước, độ bám dính cao, bế hình theo file thiết kế.',
          price: 650.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjxfpg5R6jqYkLPafLmrbO0mDRci5ON0Tjuv8VFDgQ8awQNjXMQMGKRTy8hGh8RH81AYTqMy_eve4jVNshbJ88FKdkZFDmq2fh1_K0cGbd2iijHgZhz9tW7llrcwrmdHBxc_Amow1cod6UOU2ldQHNTVKA2g3j41eMeO3n_ShDQe3duudk6JkOXesO9CHFGxf0kLUvpx97tLp_jdn4qYhv55GlIB1wS0wrn_O-87g4I2IIzXUwt926Kg',
          isFeatured: true,
          categoryId: 5
        },
        {
          title: 'Tờ Gấp / Brochure',
          description: 'Giấy Couche 150gsm, cấn 2 đường, in offset chất lượng cao.',
          price: 4500.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbglSo0PwCB-RWsoqhtTKinDZniVgnxFEpeiTU9N57HUIeHS4P2t9IrUHc_e8LIecu627NW7NisR747vEBrz7exq4YWTy7aO8PyS3Ws63XEOn1Oic7lV4m9DS0_jLrtUZOq4k4ahy7fS8RSuABYMSRVGCxjXIec_9XLL1lTCimo3zqnNufZX2RvCDen3n-7HkD7wXVGXuTF8jaroTHHqJQbG9libskjuT3AMnj3tRneakNoWVomQSCvQ',
          isFeatured: true,
          categoryId: 8
        },
        {
          title: 'Bao Thư Văn Phòng',
          description: 'Nắp dán keo sẵn, nhiều kích thước chuẩn (12x22, 16x23, 25x35).',
          price: 1150.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWFr8oHmtEw4S6gnXyHrRIK9A1HAQESp2Pp2o6fDqUA_W6_eDSl1TO9YtneWSdMALPjDUPNyJCGscZn7g3swjb46udGtr3pH9AFvfuUbPmEXdOy5VdU-wX7NdqJiNi9w7hoBUpK4y7_dLdNuZtQTI6zLJKr6l2iv-KyrdsmxovqfIUTAH_cqJ5T2FKgSDAfsZn7pI4JzMiBH3aSNYSiPKcmlLj9I_x83iUxVzhOYMCYmrGr9DBDKugLw',
          isFeatured: true,
          categoryId: 9
        },
        {
          title: 'In Bao Thư',
          description: 'Bao thư văn phòng chất lượng cao, keo dán sẵn nắp tiện lợi.',
          price: 1150.00,
          imageUrl: 'https://inanxuannhi.com/wp-content/uploads/2026/05/in-bao-thu-300x300.webp',
          isFeatured: true,
          categoryId: 9
        },
        {
          title: 'In catalogue Bất động sản',
          description: 'Catalogue giới thiệu dự án bất động sản sang trọng, hình ảnh sắc nét, đẳng cấp.',
          price: 15000.00,
          imageUrl: 'https://inanxuannhi.com/wp-content/uploads/2026/05/catalogue-bat-dong-san-300x300.jpg',
          isFeatured: true,
          categoryId: 1
        },
        {
          title: 'In catalogue du lịch',
          description: 'Catalogue quảng bá dịch vụ du lịch, màu sắc trung thực, sống động.',
          price: 12000.00,
          imageUrl: 'https://inanxuannhi.com/wp-content/uploads/2026/05/mau-catalogue-du-lich-dep-11-300x300.jpg',
          isFeatured: true,
          categoryId: 1
        },
        {
          title: 'In phiếu chi',
          description: 'Phiếu chi các liên, giấy carbonless tự in chữ sang các liên dưới.',
          price: 800.00,
          imageUrl: 'https://inanxuannhi.com/wp-content/uploads/2026/05/phieu-chi-Quan-thanh-co-lan2-02_1452095050-300x300.jpg',
          isFeatured: true,
          categoryId: 2
        },
        {
          title: 'In phiếu nhập kho',
          description: 'Phiếu nhập kho, xuất kho chuẩn biểu mẫu kế toán, dễ dàng lưu trữ.',
          price: 900.00,
          imageUrl: 'https://inanxuannhi.com/wp-content/uploads/2026/05/Mau-phieu-nhap-kho-thumbnail-300x300.webp',
          isFeatured: true,
          categoryId: 2
        },
        {
          title: 'In phiếu order',
          description: 'Phiếu order dành cho nhà hàng, quán ăn, quán cafe thiết kế nhỏ gọn.',
          price: 650.00,
          imageUrl: 'https://inanxuannhi.com/wp-content/uploads/2026/05/mau-order-in-2-lien-giay-carbonless-in-1-mau-300x300.jpg',
          isFeatured: true,
          categoryId: 2
        },
        {
          title: 'In catalogue Mỹ phẩm',
          description: 'Catalogue giới thiệu các dòng mỹ phẩm chăm sóc sắc đẹp cao cấp.',
          price: 12000.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGl_VAOaF2A06ofuF2vDwsuumduTajsczopRbFoON5y5Boom6hBctiO6xSIddU5UM7jcDrRemX_B9KBsluf5gfp-OCyr-C0fK7C1H-ECXu9QDp52SNBWkYVSD_KhNyhAnUszgnYxEsvDFcGt92t3RodRL4-VR1qzWLj3vIjVMq57mEuljkM3u7aR32xy_Bwqj22lsOgw6-Mihn2o0Zg4xvHlawvIBD8iuS6hSDtyeg7RgxFnHpO63INw',
          isFeatured: true,
          categoryId: 1
        },
        {
          title: 'In catalogue nhà hàng, khách sạn',
          description: 'Catalogue quảng bá dịch vụ ẩm thực, phòng nghỉ cao cấp sang trọng.',
          price: 15000.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuEn5lJN2UAgYztmJgqd-4Q5JcAkvHUlMhN1moOHZm9ahpjGN4Pf7hl-gsqWHzOuIS4R3HQU7VZQFUXj5O_oNNG3aWIuYRT1Gi2FdSn94WBAq37DbcoBHXF0ltkatSKVHNVWnvQm62gXoI65wjBIrFgZ-_w3x2Gc_EttHmWEUnvW7Vl0R1jDK3ze0_lkMVne0YvLqfuhAE-bDPP6KAeOMnBvsw2ftlwLeGk1IXr8pfq3ThWRGm_5UgzUA',
          isFeatured: true,
          categoryId: 1
        },
        {
          title: 'In catalogue thời trang',
          description: 'Bộ sưu tập thời trang theo mùa, in ấn chất lượng high-end sắc nét.',
          price: 14000.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGzXaFqnsUsZHdkkD9n3X-SYCWc7xcbMHVCpWlhWaXchQHajqKPcygb4Lsx_whaTNfLKeKf8HOMWhL8thL34akIaTO8aydtVBUI9MPQIUuhjiMLb5vsWVcz7I48ZcqjBanbTtwQCO1U520uJLAGGp1sMjqP1Q3dV4ZKFbFjdusnAfQJhaCO2BgGsyHa4Mldb3DIMQqPHPC5NuoDpvoEY5w9E_h-mu_nlc2FWdFdi41fMFsRohYWAZgLg',
          isFeatured: true,
          categoryId: 1
        },
        {
          title: 'In catalogue Xây dựng, Nội thất',
          description: 'Catalogue giới thiệu năng lực thi công thiết kế nội thất chuyên nghiệp.',
          price: 15000.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_mMWQXxOC0kdUEyN9-c-qVqIgCviT3IFKbNrbkonZsHUFwM85IUMGsmKFcZTGTq3owOUksfQ4FY4bKc-v_rF17ql0SGzFupnl3xnpOyMKU5uNuo7MkXEN54N9yjWLTeaNgwTKK3NuQPripqEMAI2tcBX5t3QPwhSEr_WB46AcliGPBpvt_FbzXc07wEWliQmbY-EApMR8Nls6vRtZ8LukwJAXxOl9VrCeDna2m1oX0gsqs5hrK5bJhg',
          isFeatured: true,
          categoryId: 1
        },
        {
          title: 'In hộp giấy mỹ phẩm dược phẩm',
          description: 'Vỏ hộp giấy mỹ phẩm cao cấp bảo vệ sản phẩm cực tốt.',
          price: 8000.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCFMdxlhVx7VY_6BYc8EOuZ_QeArXufhP_MD-r6Mll_ZAtZ-c-3Xn8h09O8As0LoiwTBzZoG0McKTiY4VxIoapMPI5t2EDe9IUrjr3EUh53Aeu9fepRXr8Yv8dwy5_rh7BWCWSsMkqRmzoCORFXZzpKJFZ4RGjPR8j_rhOwVoWeMfRK-Dq-0iT-8A_W0jiETiVznhkHGoVM8KvMsd0zjOym29TqBg7jnDkPe2_ZQVjOr5IxRsFPFXkRA',
          isFeatured: true,
          categoryId: 3
        },
        {
          title: 'In hộp giấy quà tặng',
          description: 'Hộp giấy cứng cao cấp đựng quà tặng lễ tết, sự kiện ý nghĩa.',
          price: 18000.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3x9iCFyhKeSdqpqF7mhet5cFXrN67a8KYQa8mGNdkR3PN0aNmpqcvT79iGbD17X_4sWYPu2clOo4juxQQpmDWmacekVPAy2zof0fp4WwS3t-Br60ucuyAmEht2mTxsuXNLMwb_yCzCBwOEKDrC_Wn-Jagn_NW53suGnjfHRca1V-AYFWzIiq0ICJwOMnM0gTzj4loX_MKM_GUCgIHXyY0fljgJyaCqoeo8srwCK_skqQewmFfphtWZA',
          isFeatured: true,
          categoryId: 3
        },
        {
          title: 'In hộp giấy Thời trang & Phụ kiện',
          description: 'Bao bì hộp giấy đóng gói thời trang, phụ kiện sang trọng.',
          price: 12000.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBntwfkA0Ve1FizNbI9ofU8V_HKX1gLVNBygZjqPOOrHKAJaljbz_431MC71xQdQr8mYHBDlbU8_DcWTi-9Q6g3NB6xrj8KaqHIrPu60osDbxXQ-DEvJxEErou8Pb3ol2Ffy2YEr7qgNz_DjoE0pTiNAf2-LTeGHEFgUcBdsaVWYX3u-G4hTU4Sr1_CajUs7LlqGU4U7oX1kYsfsbzzxAYrsNytWzRjc2dgdU1YZQYkEhlBXI0lF6uX7w',
          isFeatured: true,
          categoryId: 3
        },
        {
          title: 'In hộp giấy Thực phẩm',
          description: 'Vỏ hộp giấy tiêu chuẩn an toàn thực phẩm, mẫu mã đẹp mắt.',
          price: 9000.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp0rhsWTMSVcKKX-bvArOsIBHgrlTKFNutJ5i5OG6SSA-6Bm3VRVT7AGI5aqe_Ez1VWvzgy-9ycF_N7DAKBAEwrdhYxYAlfEVwO-WluyNCYfo8_SPxGq06vFVp5bRuuj002ES7Qw6_DEw93ecr3YK8hFycBE5Eft9mZi7nAPFwqkH9MGuJgA4xohdoP0QrmWUg3jxci348OGgbNiaczYxBS5T_enQ3QqV-NPPAlFH1QDe_mFBE3hIjYA',
          isFeatured: true,
          categoryId: 3
        },
        {
          title: 'In name card theo từng ngành nghề',
          description: 'Danh thiếp thiết kế riêng biệt tối ưu cho từng lĩnh vực hoạt động.',
          price: 120000.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdVnu92AocddshUSfoWECqXEWq-p2Vrkb9vLIhMhbPbZ7doilRGI3ku5JLlc5GsfvCvbE1zANctJr37ZkRVUwRxRXKtvti_uMudswtbLq9R_M74w8XmwuNYAShfVpJJn69HqagwguksXFuxICVSn18XtqsZGgayQ828p485GoiQtGiXIJfiT96uy2e8ImAsv2urqvq6uNmgrx22BiykCzbpBZhJmnxL1dPNIkgjvxY5BOFF7yinA7ILw',
          isFeatured: true,
          categoryId: 7
        },
        {
          title: 'In Phiếu Quà Tặng',
          description: 'Gift Voucher, coupon giảm giá in offset màu sắc rực rỡ.',
          price: 1500.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpMy_sLOhzqAhGrEQr0ohpoF6JJ4D7GaWoHWcgCbHjbNqy8w2ROF3YRe06HnUFcQLrL-wQO2mK_x3FBSwj_gjqjBrHfAcLIN_tK5RrNJPSH3PtifUF_njiCbtKdnX5yhJWVUdRuVsD8_3-JsG8Or7IZUJF3a5312k5JapDWVeAYcfpQBi7rx8hebELEE8a1Bq_8ET8eFemIG9cr_k1zNENbuIwMxpkFGG_bphl-nngO6jOfFya8x_Uzg',
          isFeatured: true,
          categoryId: 10
        },
        {
          title: 'In phiếu thu',
          description: 'Phiếu thu kế toán 2 liên, 3 liên giấy Carbonless chuẩn chỉ.',
          price: 850.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvYKITKqPGef61gRniNdNJL2milcgkKqSZ3sTeD3JgBEfBnypXe_mlqNWTwHvDLy-O7cMLy8PvFLcy2VyaIrqj6hJSZTEiUdtQ01FghoLnfUDKuIYEbZ2Nwul24CCNRCeriy8V82hPpknAWmtb0EKdP4mL_D2jlsC-szrvR50no3osnOKESBXNO7cCVRuPWVFXvcRt00sAJRukqsQBVJ42nPpxnxIfKJnPc3ZYYGFoD7SgIYlxqTpamQ',
          isFeatured: true,
          categoryId: 2
        },
        {
          title: 'In phiếu xuất kho',
          description: 'Biểu mẫu phiếu xuất kho 2 liên chuyên nghiệp dễ dàng quản lý hàng hóa.',
          price: 900.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbL9NWGtKmdZo9fddM_3_hM0IbViVAUINp3MjtfNMkXajAdEcLw54ZRumad1xtrurz3pPAcz4cM9N33enE9_Km49ABvhlR32QdOzj1tTrru_9kYO6fy4HhIanSF0oawOY3UlXQgV4IgmHNu_I9WpusuAbNP3KoCktUYQ-JlWbsoNpMheque2XBgW-KOlYyoucbCgm-81pzfMyqxmbEs5gC5fmlRdjvie4w5KdlyGxuTQlYF_84fKrZlQ',
          isFeatured: true,
          categoryId: 2
        },
        {
          title: 'In Ruy Băng',
          description: 'Ruy băng satin in logo sắc nét làm nơ buộc hộp quà sang trọng.',
          price: 5000.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHhS5htN6o_TIsK2onvyfnw21ge8NnbQMuQQ0nAErrvrRPpiXST_Hx6LnTUogltwQIU1XBof6wMNEQ6pXtPdCLnpl-lOyIcJIC1ypDzi4OsxhxvnvtscugG8PRGgWiv3RNXvfQEgTXJggjPK-vQnrB-RQUSMiE6PbIbGIycmLNyMDP7rHpY1HXC7zoDFDKb2LNgj9wG8FTiyh8jD4C9H6Hixofn2nsQurKT_-a83-jG-WlttdKVGLhqQ',
          isFeatured: true,
          categoryId: 5
        },
        {
          title: 'In thiệp chúc mừng',
          description: 'Thiệp mừng sinh nhật, thiệp chúc Tết, thiệp chúc mừng ngày lễ đẹp mắt.',
          price: 10000.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQXOjdXjW9Sj0vHMMxqmZkDWnB6ryhWsDMos4kNFGhoV8iF5WVumGgfXyyhntpyIIixeFarFhAgZJxXwHcX7rDh7auBCYKtjawK4FIiCMKrm8vXFoDfD3-cVY-c29e0yKgmRud2aZjNnowAu6BIhEfKlSq15V6do-MXvKydUniW_5FOqg1IMcoL2hAAkCKOXNherSN0cjJYn0om1TV0V-POAxg8OcIvBaiExz8jwZ_9fMZ9b5T2p0VNA',
          isFeatured: true,
          categoryId: 6
        },
        {
          title: 'In thiệp cưới',
          description: 'Thiệp cưới tinh tế kết hợp kỹ thuật ép kim, bế nổi độc đáo.',
          price: 12000.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEFDN9m_Ex7Gz7KWAYgVM-HKVRHSQBnvn0kmyZIT_s2BzxFazyPyuP8HpHmUnRrgKa_VpyNFYxqbJIuW2KEbZJ6X7Hp5CLkI-EIpVX0rtMVmiWXu_q2D6s22-4Wb-T2JEoqZgrHpFovZsJ-ag3Eo6bhtOte9xHkBOIkgl0nMnB3pNHoEvBdG0bvw9mjXLywjbV2L5HZmmIM7Cq_BDHm7fDCVl9L3I2Pn6m_f8m3uzAS9mLhIG8UsOHYA',
          isFeatured: true,
          categoryId: 6
        },
        {
          title: 'In thiệp mời sự kiện',
          description: 'Thiệp mời tham dự hội nghị, khai trương, event thiết kế tinh xảo.',
          price: 11000.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDknTEZVWCpj655SHMsnh8PLoKmWAikZtZE5DsfiS5zaQIp9ltdgFuhLhPiy38NWGf1YPL8jZCLiyr2FTF82-gQCvJpBzssjg6G2B3AZhTUfo4e4eF-EBipxcqghQvvcpXzdTBsu_U9dnFk0M8_z6Zj9h7nwZK5v4xnQlLw5aBLYaaQS9_B8XTKMAGMsD0WmIk78bTKnR3t1LGqsDtsD7okoo68Dkk41ufkahUnC6w7MaWfsJuThriPWg',
          isFeatured: true,
          categoryId: 6
        },
        {
          title: 'In tờ gấp',
          description: 'Tờ rơi gấp 2, gấp 3 tiện lợi cung cấp đầy đủ thông tin dịch vụ.',
          price: 4500.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoXTOHZLa4z-_HEri5MHkW2c1Gez2RRoLUoLJ45U94tg6JV6cePXI0-OvDXdb3ntctzfJZofM3wZtrxTyKCfo9zvv8Mym00tDhnIJZlYLQuL-dpF3C85Amtp29VaoI2K7aRzvQ_89dqcUqPh6BryXI-MWc4feJ1EJPaoxrv663xA2PwwUlkUa7D0jYKhyBWVjFX5R4wGX6FJuYznFSRdCcq7YoMvudz2Y6EkgmkENWMOZ12n7zr4Jngw',
          isFeatured: true,
          categoryId: 8
        },
        {
          title: 'In túi giấy mỹ phẩm dược phẩm',
          description: 'Túi xách giấy đựng mỹ phẩm, thuốc cao cấp tăng độ nhận diện thương hiệu.',
          price: 12000.00,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZO6wPhJR7Oc9QoI0PF_NZOS6gd8Ku8AABJWMhMumFh_IdYI-aU3CNGbMLKJtMczRL9Ih8p27pB5L9IDlZ0PyYszlwKw22hHvT-IUCjY3-qMK2pGr6-S_ugGS5QbzblWcSwL-UmQZGCLfU-4NF54L3G0mykm9D3qKF7jk_qaFaXfKea1DUqYQl_ltujoNPTou8QeLLgeu20bLIMHC96NQSXahh3MKvQkxuxR_kZsqB6WFca_mMUoBOBg',
          isFeatured: true,
          categoryId: 4
        }
      ]);
      console.log('🌱 Seeded default products matching frontend modern UI.');
    }
  } catch (error) {
    console.error('⚠️ Seeding error:', error);
  }
}

startServer();
