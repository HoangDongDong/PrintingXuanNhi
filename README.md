# 🖨️ Printing Service Management (Hệ Thống Quản Lý Dịch Vụ In Ấn Xuân Nhi)

Dự án Web Application quản lý in ấn hoàn chỉnh, được xây dựng theo mô hình Full-stack Monorepo với ExpressJS API kết hợp ReactJS (Vite & Tailwind CSS).

---

## 🛠️ Tech Stack & Kiến Trúc Dự Án

*   **Frontend**: ReactJS (Functional Components, Hooks), Vite, Tailwind CSS v3, Axios, React Router DOM, Lucide Icons.
*   **Backend**: Node.js, Express.js (MVC + Router).
*   **Database & ORM**: MySQL, Sequelize ORM (tự động đồng bộ cấu trúc bảng và hạt giống dữ liệu).

---

## 📂 Cấu trúc thư mục (Monorepo)

```text
/project-root
  ├── backend/               # Ổ cắm API Backend Express
  │    ├── config/           # Cấu hình kết nối MySQL thông qua Sequelize
  │    ├── controllers/      # Bộ điều khiển logic nghiệp vụ (Auth, Product)
  │    ├── models/           # Bản đồ Sequelize Models (User, Product)
  │    ├── routes/           # Định tuyến API RESTful
  │    ├── middlewares/      # Bộ trung gian xử lý lỗi hệ thống & CORS
  │    └── server.js         # Điểm khởi chạy API Server
  └── frontend/              # Giao diện Frontend ReactJS
       ├── src/
       │    ├── components/  # Layout chính, danh sách sản phẩm mẫu
       │    ├── pages/       # Trang chủ, trang quản trị Admin, trang Đăng nhập
       │    └── App.jsx      # Thiết lập định tuyến liên kết trang
       └── index.html
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### Bước 1: Khởi Tạo Cơ Sở Dữ Liệu MySQL

1.  Mở giao diện quản lý cơ sở dữ liệu MySQL của bạn (ví dụ: phpMyAdmin, MySQL Workbench hoặc Command Line).
2.  Tạo một database mới có tên là `inanxuannhi_db`:
    ```sql
    CREATE DATABASE IF NOT EXISTS inanxuannhi_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    ```
3.  Cấu hình tài khoản MySQL trong file cấu hình môi trường `.env` của Backend tại `backend/.env` (Đã được tạo sẵn mặc định kết nối `127.0.0.1:3306`, User `root` và mật khẩu trống).

---

### Bước 2: Khởi Chạy API Backend (Express.js)

Mở một cửa sổ Terminal mới tại thư mục gốc của dự án (`d:/xn`) và thực thi các lệnh sau:

```bash
# 1. Di chuyển vào thư mục backend
cd backend

# 2. Cài đặt các thư viện dependencies cần thiết
npm install

# 3. Chạy server ở chế độ phát triển (Development mode)
npm run dev
```

*Server Backend sẽ chạy tại địa chỉ:* **`http://localhost:5000`**

*Khi server khởi chạy thành công lần đầu tiên, Sequelize sẽ tự động đồng bộ cơ sở dữ liệu (tạo bảng `users`, `products`) và nạp hạt giống dữ liệu mẫu (Seeder).*

---

### Bước 3: Khởi Chạy Giao Diện Frontend (ReactJS + Vite)

Mở một cửa sổ Terminal **khác** tại thư mục gốc của dự án (`d:/xn`) và thực thi các lệnh sau:

```bash
# 1. Di chuyển vào thư mục frontend
cd frontend

# 2. Cài đặt các thư viện cho giao diện
npm install

# 3. Khởi chạy máy chủ phát triển Vite
npm run dev
```

*Ứng dụng Frontend sẽ chạy tại địa chỉ:* **`http://localhost:3000`**

---

## 🔑 Tài Khoản Demo Để Kiểm Thử

Hệ thống đã tự động gieo sẵn hạt giống tài khoản mẫu vào Database để bạn đăng nhập thử nghiệm:

1.  **Quản trị viên (Admin)**:
    *   **Email**: `inanxuannhi@gmail.com`
    *   **Mật khẩu**: `admin123`
2.  **Khách hàng (Customer)**:
    *   **Email**: `nguyenvana@gmail.com`
    *   **Mật khẩu**: `customer123`

---

## 📌 Các API Endpoints Chính Đã Được Cài Đặt

*   `POST /api/auth/login` - Đăng nhập tài khoản & nhận JWT Token.
*   `GET /api/products` - Lấy danh sách sản phẩm.
*   `POST /api/products` - Tạo mới sản phẩm (Dành cho trang Admin).
*   `GET /api/health` - Kiểm tra trạng thái hoạt động của Server.
