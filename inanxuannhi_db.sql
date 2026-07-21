-- SQL Script to initialize and seed 'inanxuannhi_db' database manually
-- Run this in phpMyAdmin, MySQL Command Line, or any database client

CREATE DATABASE IF NOT EXISTS `inanxuannhi_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `inanxuannhi_db`;

-- Drop tables if they exist (handling foreign keys)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `order_details`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Create table 'users'
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) DEFAULT NULL,
  `role` ENUM('admin', 'staff', 'customer') DEFAULT 'customer',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Create table 'categories'
CREATE TABLE `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `icon` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Create table 'products'
CREATE TABLE `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `price` DECIMAL(10, 2) DEFAULT 0.00,
  `image_url` TEXT DEFAULT NULL,
  `is_featured` TINYINT(1) DEFAULT 0,
  `category_id` INT DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Seed 'users'
INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `phone`, `role`) VALUES
(1, 'admin_xuannhi', 'inanxuannhi@gmail.com', '$2a$10$KEw8MD57e3rAoGa5mUoWpOGfCR9WmMysFu74UdITrccLMh5JBqi2u', '0943126406', 'admin'),
(2, 'khachhang01', 'nguyenvana@gmail.com', '$2a$10$3tAqAroz8O6Av5lODLqaNuy.MrhsvvaiZNzYDRUREjW4UhyU53m16', '0912345678', 'customer');

-- 5. Seed 'categories'
INSERT INTO `categories` (`id`, `name`, `icon`) VALUES
(1, 'Catalogue', 'menu_book'),
(2, 'Hóa đơn', 'receipt_long'),
(3, 'Hộp giấy', 'package_2'),
(4, 'Túi giấy', 'shopping_bag'),
(5, 'Nhãn Decal', 'label'),
(6, 'Thiệp mời', 'mail'),
(7, 'In name card', 'badge'),
(8, 'In tờ gấp', 'layers'),
(9, 'In Bao Thư', 'drafts'),
(10, 'In Phiếu Quà Tặng', 'confirmation_number');

-- 6. Seed 'products' (30 items matching UI)
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image_url`, `is_featured`, `category_id`) VALUES
(1, 'Name Card Cao Cấp', 'Giấy mỹ thuật 300gsm, cán màng mờ, in 2 mặt sắc nét.', 120000.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxdHHhr7il-_6Xm5Ul_7DR8l-RnjDIGZ0KygA1K7--kWj7FabntmeNoRcGtf2q4MmMftyOAZiEIy5W7omKy8d8kexR2VQxWfUBe_dNKS9icoANZZ8-kcbVqoxaPKQCSr-koH5MGRbh-FoFldmnf51N3a-gcHC70lZnI1-IGgNh-8mbDXNE7BFipSS-5pzwtv9gYM2wAwvPKBV-mL_-vuJAOmwxrgzlPNDSaAnvDBTVIdbluooSi9i9cg', 1, 7),
(2, 'Catalogue Doanh Nghiệp', 'Khổ A4, đóng kim hoặc keo gáy, màu sắc trung thực.', 4500.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM8x4Jxic2AQdZEmpjOesegkjBSBqvslS-7kx2z8f8LIec1YAHLUyOJ2mYp2ZJXAgOnMyIvKuwdPmAx1o8Zn4ZopTTfVf4QkKFNW99sFI_lqEF6HvuteGVRUCCdG9GpnBElBSD9Tsl3S8iropobEBAGCdFcZc0yhFMr4txoGqMs61TR0RMtcEjyc3eh49Ukor8MkDZNqiEoCB81yHAXaTCM7x7CnYEPLepUm57TgiNSoIZTDVtUBtWRA', 1, 1),
(3, 'Túi Giấy Kraft', 'Chất liệu thân thiện, chịu lực tốt, in logo theo yêu cầu.', 15000.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1FswSd6Oa3_caQgRqfVj7-vA8ZM2fk8quVnjzIX2E1uYFMFTc_WN0pP3n1WokX3T8nWlP9Q1EAo6ODpasPswSeeZPObxeVLGtBz3gCERLw2NcYpVXeZGpRyoYM-h-jN6iqZ73E3522mwYPPLf5JZ4kYgmOBoQncKDs4CxRqHCYO8vZwLXAc9wzThJ3szo2Iz2ZL7tM8NPfz0tUqYGLW4nSSRH4PRr5EpQ_q96A_qU4RHW6sEzvjXTcw', 1, 4),
(4, 'Nhãn Decal Cuộn', 'Chống nước, độ bám dính cao, bế hình theo file thiết kế.', 650.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjxfpg5R6jqYkLPafLmrbO0mDRci5ON0Tjuv8VFDgQ8awQNjXMQMGKRTy8hGh8RH81AYTqMy_eve4jVNshbJ88FKdkZFDmq2fh1_K0cGbd2iijHgZhz9tW7llrcwrmdHBxc_Amow1cod6UOU2ldQHNTVKA2g3j41eMeO3n_ShDQe3duudk6JkOXesO9CHFGxf0kLUvpx97tLp_jdn4qYhv55GlIB1wS0wrn_O-87g4I2IIzXUwt926Kg', 1, 5),
(5, 'Tờ Gấp / Brochure', 'Giấy Couche 150gsm, cấn 2 đường, in offset chất lượng cao.', 4500.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbglSo0PwCB-RWsoqhtTKinDZniVgnxFEpeiTU9N57HUIeHS4P2t9IrUHc_e8LIecu627NW7NisR747vEBrz7exq4YWTy7aO8PyS3Ws63XEOn1Oic7lV4m9DS0_jLrtUZOq4k4ahy7fS8RSuABYMSRVGCxjXIec_9XLL1lTCimo3zqnNufZX2RvCDen3n-7HkD7wXVGXuTF8jaroTHHqJQbG9libskjuT3AMnj3tRneakNoWVomQSCvQ', 1, 8),
(6, 'Bao Thư Văn Phòng', 'Nắp dán keo sẵn, nhiều kích thước chuẩn (12x22, 16x23, 25x35).', 1150.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWFr8oHmtEw4S6gnXyHrRIK9A1HAQESp2Pp2o6fDqUA_W6_eDSl1TO9YtneWSdMALPjDUPNyJCGscZn7g3swjb46udGtr3pH9AFvfuUbPmEXdOy5VdU-wX7NdqJiNi9w7hoBUpK4y7_dLdNuZtQTI6zLJKr6l2iv-KyrdsmxovqfIUTAH_cqJ5T2FKgSDAfsZn7pI4JzMiBH3aSNYSiPKcmlLj9I_x83iUxVzhOYMCYmrGr9DBDKugLw', 1, 9),
(7, 'In Bao Thư', 'Bao thư văn phòng chất lượng cao, keo dán sẵn nắp tiện lợi.', 1150.00, 'https://inanxuannhi.com/wp-content/uploads/2026/05/in-bao-thu-300x300.webp', 1, 9),
(8, 'In catalogue Bất động sản', 'Catalogue giới thiệu dự án bất động sản sang trọng, hình ảnh sắc nét, đẳng cấp.', 15000.00, 'https://inanxuannhi.com/wp-content/uploads/2026/05/catalogue-bat-dong-san-300x300.jpg', 1, 1),
(9, 'In catalogue du lịch', 'Catalogue quảng bá dịch vụ du lịch, màu sắc trung thực, sống động.', 12000.00, 'https://inanxuannhi.com/wp-content/uploads/2026/05/mau-catalogue-du-lich-dep-11-300x300.jpg', 1, 1),
(10, 'In phiếu chi', 'Phiếu chi các liên, giấy carbonless tự in chữ sang các liên dưới.', 800.00, 'https://inanxuannhi.com/wp-content/uploads/2026/05/phieu-chi-Quan-thanh-co-lan2-02_1452095050-300x300.jpg', 1, 2),
(11, 'In phiếu nhập kho', 'Phiếu nhập kho, xuất kho chuẩn biểu mẫu kế toán, dễ dàng lưu trữ.', 900.00, 'https://inanxuannhi.com/wp-content/uploads/2026/05/Mau-phieu-nhap-kho-thumbnail-300x300.webp', 1, 2),
(12, 'In phiếu order', 'Phiếu order dành cho nhà hàng, quán ăn, quán cafe thiết kế nhỏ gọn.', 650.00, 'https://inanxuannhi.com/wp-content/uploads/2026/05/mau-order-in-2-lien-giay-carbonless-in-1-mau-300x300.jpg', 1, 2),
(13, 'In catalogue Mỹ phẩm', 'Catalogue giới thiệu các dòng mỹ phẩm chăm sóc sắc đẹp cao cấp.', 12000.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGl_VAOaF2A06ofuF2vDwsuumduTajsczopRbFoON5y5Boom6hBctiO6xSIddU5UM7jcDrRemX_B9KBsluf5gfp-OCyr-C0fK7C1H-ECXu9QDp52SNBWkYVSD_KhNyhAnUszgnYxEsvDFcGt92t3RodRL4-VR1qzWLj3vIjVMq57mEuljkM3u7aR32xy_Bwqj22lsOgw6-Mihn2o0Zg4xvHlawvIBD8iuS6hSDtyeg7RgxFnHpO63INw', 1, 1),
(14, 'In catalogue nhà hàng, khách sạn', 'Catalogue quảng bá dịch vụ ẩm thực, phòng nghỉ cao cấp sang trọng.', 15000.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuEn5lJN2UAgYztmJgqd-4Q5JcAkvHUlMhN1moOHZm9ahpjGN4Pf7hl-gsqWHzOuIS4R3HQU7VZQFUXj5O_oNNG3aWIuYRT1Gi2FdSn94WBAq37DbcoBHXF0ltkatSKVHNVWnvQm62gXoI65wjBIrFgZ-_w3x2Gc_EttHmWEUnvW7Vl0R1jDK3ze0_lkMVne0YvLqfuhAE-bDPP6KAeOMnBvsw2ftlwLeGk1IXr8pfq3ThWRGm_5UgzUA', 1, 1),
(15, 'In catalogue thời trang', 'Bộ sưu tập thời trang theo mùa, in ấn chất lượng high-end sắc nét.', 14000.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGzXaFqnsUsZHdkkD9n3X-SYCWc7xcbMHVCpWlhWaXchQHajqKPcygb4Lsx_whaTNfLKeKf8HOMWhL8thL34akIaTO8aydtVBUI9MPQIUuhjiMLb5vsWVcz7I48ZcqjBanbTtwQCO1U520uJLAGGp1sMjqP1Q3dV4ZKFbFjdusnAfQJhaCO2BgGsyHa4Mldb3DIMQqPHPC5NuoDpvoEY5w9E_h-mu_nlc2FWdFdi41fMFsRohYWAZgLg', 1, 1),
(16, 'In catalogue Xây dựng, Nội thất', 'Catalogue giới thiệu năng lực thi công thiết kế nội thất chuyên nghiệp.', 15000.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_mMWQXxOC0kdUEyN9-c-qVqIgCviT3IFKbNrbkonZsHUFwM85IUMGsmKFcZTGTq3owOUksfQ4FY4bKc-v_rF17ql0SGzFupnl3xnpOyMKU5uNuo7MkXEN54N9yjWLTeaNgwTKK3NuQPripqEMAI2tcBX5t3QPwhSEr_WB46AcliGPBpvt_FbzXc07wEWliQmbY-EApMR8Nls6vRtZ8LukwJAXxOl9VrCeDna2m1oX0gsqs5hrK5bJhg', 1, 1),
(17, 'In hộp giấy mỹ phẩm dược phẩm', 'Vỏ hộp giấy mỹ phẩm cao cấp bảo vệ sản phẩm cực tốt.', 8000.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCFMdxlhVx7VY_6BYc8EOuZ_QeArXufhP_MD-r6Mll_ZAtZ-c-3Xn8h09O8As0LoiwTBzZoG0McKTiY4VxIoapMPI5t2EDe9IUrjr3EUh53Aeu9fepRXr8Yv8dwy5_rh7BWCWSsMkqRmzoCORFXZzpKJFZ4RGjPR8j_rhOwVoWeMfRK-Dq-0iT-8A_W0jiETiVznhkHGoVM8KvMsd0zjOym29TqBg7jnDkPe2_ZQVjOr5IxRsFPFXkRA', 1, 3),
(18, 'In hộp giấy quà tặng', 'Hộp giấy cứng cao cấp đựng quà tặng lễ tết, sự kiện ý nghĩa.', 18000.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3x9iCFyhKeSdqpqF7mhet5cFXrN67a8KYQa8mGNdkR3PN0aNmpqcvT79iGbD17X_4sWYPu2clOo4juxQQpmDWmacekVPAy2zof0fp4WwS3t-Br60ucuyAmEht2mTxsuXNLMwb_yCzCBwOEKDrC_Wn-Jagn_NW53suGnjfHRca1V-AYFWzIiq0ICJwOMnM0gTzj4loX_MKM_GUCgIHXyY0fljgJyaCqoeo8srwCK_skqQewmFfphtWZA', 1, 3),
(19, 'In hộp giấy Thời trang & Phụ kiện', 'Bao bì hộp giấy đóng gói thời trang, phụ kiện sang trọng.', 12000.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBntwfkA0Ve1FizNbI9ofU8V_HKX1gLVNBygZjqPOOrHKAJaljbz_431MC71xQdQr8mYHBDlbU8_DcWTi-9Q6g3NB6xrj8KaqHIrPu60osDbxXQ-DEvJxEErou8Pb3ol2Ffy2YEr7qgNz_DjoE0pTiNAf2-LTeGHEFgUcBdsaVWYX3u-G4hTU4Sr1_CajUs7LlqGU4U7oX1kYsfsbzzxAYrsNytWzRjc2dgdU1YZQYkEhlBXI0lF6uX7w', 1, 3),
(20, 'In hộp giấy Thực phẩm', 'Vỏ hộp giấy tiêu chuẩn an toàn thực phẩm, mẫu mã đẹp mắt.', 9000.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp0rhsWTMSVcKKX-bvArOsIBHgrlTKFNutJ5i5OG6SSA-6Bm3VRVT7AGI5aqe_Ez1VWvzgy-9ycF_N7DAKBAEwrdhYxYAlfEVwO-WluyNCYfo8_SPxGq06vFVp5bRuuj002ES7Qw6_DEw93ecr3YK8hFycBE5Eft9mZi7nAPFwqkH9MGuJgA4xohdoP0QrmWUg3jxci348OGgbNiaczYxBS5T_enQ3QqV-NPPAlFH1QDe_mFBE3hIjYA', 1, 3),
(21, 'In name card theo từng ngành nghề', 'Danh thiếp thiết kế riêng biệt tối ưu cho từng lĩnh vực hoạt động.', 120000.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdVnu92AocddshUSfoWECqXEWq-p2Vrkb9vLIhMhbPbZ7doilRGI3ku5JLlc5GsfvCvbE1zANctJr37ZkRVUwRxRXKtvti_uMudswtbLq9R_M74w8XmwuNYAShfVpJJn69HqagwguksXFuxICVSn18XtqsZGgayQ828p485GoiQtGiXIJfiT96uy2e8ImAsv2urqvq6uNmgrx22BiykCzbpBZhJmnxL1dPNIkgjvxY5BOFF7yinA7ILw', 1, 7),
(22, 'In Phiếu Quà Tặng', 'Gift Voucher, coupon giảm giá in offset màu sắc rực rỡ.', 1500.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpMy_sLOhzqAhGrEQr0ohpoF6JJ4D7GaWoHWcgCbHjbNqy8w2ROF3YRe06HnUFcQLrL-wQO2mK_x3FBSwj_gjqjBrHfAcLIN_tK5RrNJPSH3PtifUF_njiCbtKdnX5yhJWVUdRuVsD8_3-JsG8Or7IZUJF3a5312k5JapDWVeAYcfpQBi7rx8hebELEE8a1Bq_8ET8eFemIG9cr_k1zNENbuIwMxpkFGG_bphl-nngO6jOfFya8x_Uzg', 1, 10),
(23, 'In phiếu thu', 'Phiếu thu kế toán 2 liên, 3 liên giấy Carbonless chuẩn chỉ.', 850.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvYKITKqPGef61gRniNdNJL2milcgkKqSZ3sTeD3JgBEfBnypXe_mlqNWTwHvDLy-O7cMLy8PvFLcy2VyaIrqj6hJSZTEiUdtQ01FghoLnfUDKuIYEbZ2Nwul24CCNRCeriy8V82hPpknAWmtb0EKdP4mL_D2jlsC-szrvR50no3osnOKESBXNO7cCVRuPWVFXvcRt00sAJRukqsQBVJ42nPpxnxIfKJnPc3ZYYGFoD7SgIYlxqTpamQ', 1, 2),
(24, 'In phiếu xuất kho', 'Biểu mẫu phiếu xuất kho 2 liên chuyên nghiệp dễ dàng quản lý hàng hóa.', 900.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbL9NWGtKmdZo9fddM_3_hM0IbViVAUINp3MjtfNMkXajAdEcLw54ZRumad1xtrurz3pPAcz4cM9N33enE9_Km49ABvhlR32QdOzj1tTrru_9kYO6fy4HhIanSF0oawOY3UlXQgV4IgmHNu_I9WpusuAbNP3KoCktUYQ-JlWbsoNpMheque2XBgW-KOlYyoucbCgm-81pzfMyqxmbEs5gC5fmlRdjvie4w5KdlyGxuTQlYF_84fKrZlQ', 1, 2),
(25, 'In Ruy Băng', 'Ruy băng satin in logo sắc nét làm nơ buộc hộp quà sang trọng.', 5000.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHhS5htN6o_TIsK2onvyfnw21ge8NnbQMuQQ0nAErrvrRPpiXST_Hx6LnTUogltwQIU1XBof6wMNEQ6pXtPdCLnpl-lOyIcJIC1ypDzi4OsxhxvnvtscugG8PRGgWiv3RNXvfQEgTXJggjPK-vQnrB-RQUSMiE6PbIbGIycmLNyMDP7rHpY1HXC7zoDFDKb2LNgj9wG8FTiyh8jD4C9H6Hixofn2nsQurKT_-a83-jG-WlttdKVGLhqQ', 1, 5),
(26, 'In thiệp chúc mừng', 'Thiệp mừng sinh nhật, thiệp chúc Tết, thiệp chúc mừng ngày lễ đẹp mắt.', 10000.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQXOjdXjW9Sj0vHMMxqmZkDWnB6ryhWsDMos4kNFGhoV8iF5WVumGgfXyyhntpyIIixeFarFhAgZJxXwHcX7rDh7auBCYKtjawK4FIiCMKrm8vXFoDfD3-cVY-c29e0yKgmRud2aZjNnowAu6BIhEfKlSq15V6do-MXvKydUniW_5FOqg1IMcoL2hAAkCKOXNherSN0cjJYn0om1TV0V-POAxg8OcIvBaiExz8jwZ_9fMZ9b5T2p0VNA', 1, 6),
(27, 'In thiệp cưới', 'Thiệp cưới tinh tế kết hợp kỹ thuật ép kim, bế nổi độc đáo.', 12000.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEFDN9m_Ex7Gz7KWAYgVM-HKVRHSQBnvn0kmyZIT_s2BzxFazyPyuP8HpHmUnRrgKa_VpyNFYxqbJIuW2KEbZJ6X7Hp5CLkI-EIpVX0rtMVmiWXu_q2D6s22-4Wb-T2JEoqZgrHpFovZsJ-ag3Eo6bhtOte9xHkBOIkgl0nMnB3pNHoEvBdG0bvw9mjXLywjbV2L5HZmmIM7Cq_BDHm7fDCVl9L3I2Pn6m_f8m3uzAS9mLhIG8UsOHYA', 1, 6),
(28, 'In thiệp mời sự kiện', 'Thiệp mời tham dự hội nghị, khai trương, event thiết kế tinh xảo.', 11000.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDknTEZVWCpj655SHMsnh8PLoKmWAikZtZE5DsfiS5zaQIp9ltdgFuhLhPiy38NWGf1YPL8jZCLiyr2FTF82-gQCvJpBzssjg6G2B3AZhTUfo4e4eF-EBipxcqghQvvcpXzdTBsu_U9dnFk0M8_z6Zj9h7nwZK5v4xnQlLw5aBLYaaQS9_B8XTKMAGMsD0WmIk78bTKnR3t1LGqsDtsD7okoo68Dkk41ufkahUnC6w7MaWfsJuThriPWg', 1, 6),
(29, 'In tờ gấp', 'Tờ rơi gấp 2, gấp 3 tiện lợi cung cấp đầy đủ thông tin dịch vụ.', 4500.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoXTOHZLa4z-_HEri5MHkW2c1Gez2RRoLUoLJ45U94tg6JV6cePXI0-OvDXdb3ntctzfJZofM3wZtrxTyKCfo9zvv8Mym00tDhnIJZlYLQuL-dpF3C85Amtp29VaoI2K7aRzvQ_89dqcUqPh6BryXI-MWc4feJ1EJPaoxrv663xA2PwwUlkUa7D0jYKhyBWVjFX5R4wGX6FJuYznFSRdCcq7YoMvudz2Y6EkgmkENWMOZ12n7zr4Jngw', 1, 8),
(30, 'In túi giấy mỹ phẩm dược phẩm', 'Túi xách giấy đựng mỹ phẩm, thuốc cao cấp tăng độ nhận diện thương hiệu.', 12000.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZO6wPhJR7Oc9QoI0PF_NZOS6gd8Ku8AABJWMhMumFh_IdYI-aU3CNGbMLKJtMczRL9Ih8p27pB5L9IDlZ0PyYszlwKw22hHvT-IUCjY3-qMK2pGr6-S_ugGS5QbzblWcSwL-UmQZGCLfU-4NF54L3G0mykm9D3qKF7jk_qaFaXfKea1DUqYQl_ltujoNPTou8QeLLgeu20bLIMHC96NQSXahh3MKvQkxuxR_kZsqB6WFca_mMUoBOBg', 1, 4);
