-- Database Schema untuk NALDENOM EKSPOR IMPOR
CREATE DATABASE naldenom_ekspor_impor;
USE naldenom_ekspor_impor;

-- Tabel Admin
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Company Profile
CREATE TABLE company_profile (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(100),
  address TEXT,
  description TEXT,
  established_year INT,
  director VARCHAR(100),
  location VARCHAR(100),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Categories
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Products
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(15,2),
  category_id INT,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Tabel Product Images
CREATE TABLE product_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  image_name VARCHAR(255),
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Tabel Articles
CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_path VARCHAR(255),
  status ENUM('published', 'draft') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel FAQs
CREATE TABLE faqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INT DEFAULT 0,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert data awal
INSERT INTO admins (username, password, email) VALUES 
('admin', '$2b$10$GRLswJB6bJ2qTBqUJm/FGOjVGv8RhvOZDjjgMQVOVm2lPxBNUuNkW', 'admin@naldenom.com'); -- password: admin123

INSERT INTO company_profile (company_name, phone, email, address, description, established_year, director, location) VALUES (
  'NALDENOM EKSPOR IMPOR',
  '082180297185',
  'info@naldenom.com',
  'Simpang Ampek, Abai, Sangir Batang Hari, Kabupaten Solok Selatan, Sumatera Barat',
  'NALDENOM EKSPOR IMPOR adalah perusahaan swasta nasional yang bergerak di bidang ekspor impor dengan berbagai kegiatan usaha meliputi perdagangan besar suku cadang dan aksesori mobil, perdagangan besar atas dasar balas jasa, hasil kehutanan dan perburuan, serta berbagai produk lainnya.',
  2025,
  'WARNERI PUTERA SH.M.Kn.',
  'Kabupaten Solok Selatan, Sumatera Barat'
);

INSERT INTO categories (name, description) VALUES 
('Suku Cadang Mobil', 'Perdagangan besar suku cadang dan aksesori mobil'),
('Hasil Kehutanan', 'Perdagangan besar hasil kehutanan dan perburuan'),
('Bahan Makanan', 'Perdagangan besar bahan makanan dan minuman'),
('Pakaian & Aksesoris', 'Perdagangan eceran pakaian dan aksesoris'),
('Umum', 'Perdagangan besar berbagai macam barang');

INSERT INTO faqs (question, answer, order_index) VALUES 
('Apa saja produk yang diperdagangkan oleh NALDENOM EKSPOR IMPOR?', 'Kami memperdagangkan berbagai produk meliputi suku cadang mobil, hasil kehutanan, bahan makanan, pakaian dan aksesoris, serta berbagai macam barang lainnya.', 1),
('Bagaimana cara melakukan pemesanan?', 'Anda dapat menghubungi kami melalui telepon di 082180297185 atau email di info@naldenom.com untuk melakukan pemesanan.', 2),
('Apakah melayani ekspor ke luar negeri?', 'Ya, kami melayani ekspor ke berbagai negara. Silakan hubungi kami untuk informasi lebih lanjut mengenai produk dan tujuan ekspor.', 3),
('Dimana lokasi kantor pusat?', 'Kantor pusat kami berlokasi di Simpang Ampek, Abai, Sangir Batang Hari, Kabupaten Solok Selatan, Sumatera Barat.', 4);

INSERT INTO articles (title, content, excerpt, status) VALUES 
('Selamat Datang di NALDENOM EKSPOR IMPOR', 'NALDENOM EKSPOR IMPOR adalah perusahaan yang bergerak di bidang ekspor impor dengan komitmen untuk memberikan layanan terbaik kepada pelanggan. Dengan pengalaman dan jaringan yang luas, kami siap membantu kebutuhan bisnis Anda.', 'Mengenal lebih dekat NALDENOM EKSPOR IMPOR dan layanan yang kami tawarkan.', 'published'),
('Peluang Bisnis Ekspor Impor di Indonesia', 'Indonesia memiliki potensi besar dalam perdagangan internasional. Dengan lokasi strategis dan kekayaan sumber daya alam, Indonesia menjadi negara yang menarik untuk kegiatan ekspor impor.', 'Memahami potensi dan peluang bisnis ekspor impor di Indonesia.', 'published'),
('Tips Memulai Bisnis Ekspor Impor', 'Bisnis ekspor impor membutuhkan persiapan yang matang. Artikel ini akan memberikan tips dan panduan untuk memulai bisnis ekspor impor yang sukses.', 'Panduan lengkap untuk memulai bisnis ekspor impor bagi pemula.', 'published');