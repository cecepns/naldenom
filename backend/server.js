const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads-naldenom', express.static(path.join(__dirname, 'uploads-naldenom')));

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'naldenom_ekspor_impor'
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads-nawara');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads-nawara'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Helper function to delete image file
const deleteImageFile = (imagePath) => {
  if (imagePath) {
    const fullPath = path.join(__dirname, 'uploads-nawara', imagePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
};


// Helper function to delete product images
const deleteProductImages = (productId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT image_path FROM product_images WHERE product_id = ?';
    db.query(query, [productId], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      
      // Delete image files
      results.forEach(result => {
        deleteImageFile(result.image_path);
      });
      
      // Delete from database
      const deleteQuery = 'DELETE FROM product_images WHERE product_id = ?';
      db.query(deleteQuery, [productId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
};

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  const query = 'SELECT * FROM admins WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = results[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  });
});

// Company profile routes
app.get('/company', (req, res) => {
  const query = 'SELECT * FROM company_profile LIMIT 1';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results[0] || {});
  });
});

app.put('/company', authenticateToken, (req, res) => {
  const { company_name, phone, email, address, description, established_year, director, location } = req.body;
  
  const query = `
    UPDATE company_profile SET 
    company_name = ?, phone = ?, email = ?, address = ?, 
    description = ?, established_year = ?, director = ?, location = ?
    WHERE id = 1
  `;
  
  db.query(query, [company_name, phone, email, address, description, established_year, director, location], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json({ message: 'Company profile updated successfully' });
  });
});

// Product routes
app.get('/products', (req, res) => {
  const query = `
    SELECT p.*, c.name as category_name,
    GROUP_CONCAT(DISTINCT pi.image_path) as images
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN product_images pi ON p.id = pi.product_id
    WHERE p.status = 'active'
    GROUP BY p.id
    ORDER BY p.created_at DESC
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    
    const products = results.map(product => ({
      ...product,
      images: product.images ? product.images.split(',') : []
    }));
    
    res.json(products);
  });
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  
  const query = `
    SELECT p.*, c.name as category_name,
    GROUP_CONCAT(DISTINCT pi.image_path) as images
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN product_images pi ON p.id = pi.product_id
    WHERE p.id = ? AND p.status = 'active'
    GROUP BY p.id
  `;
  
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const product = {
      ...results[0],
      images: results[0].images ? results[0].images.split(',') : []
    };
    
    res.json(product);
  });
});

app.get('/admin/products', authenticateToken, (req, res) => {
  const query = `
    SELECT p.*, c.name as category_name,
    GROUP_CONCAT(DISTINCT pi.image_path) as images
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN product_images pi ON p.id = pi.product_id
    GROUP BY p.id
    ORDER BY p.created_at DESC
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    
    const products = results.map(product => ({
      ...product,
      images: product.images ? product.images.split(',') : []
    }));
    
    res.json(products);
  });
});

app.post('/admin/products', authenticateToken, upload.array('images', 5), (req, res) => {
  const { product_code, name, description, price, category_id, status } = req.body;
  
  const query = 'INSERT INTO products (product_code, name, description, price, category_id, status) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(query, [product_code, name, description, price, category_id, status], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    
    const productId = results.insertId;
    
    // Insert images if any
    if (req.files && req.files.length > 0) {
      const imageQueries = req.files.map((file, index) => {
        return new Promise((resolve, reject) => {
          const imageQuery = 'INSERT INTO product_images (product_id, image_path, image_name, is_primary) VALUES (?, ?, ?, ?)';
          db.query(imageQuery, [productId, file.filename, file.originalname, index === 0], (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      });
      
      Promise.all(imageQueries)
        .then(() => {
          res.json({ message: 'Product created successfully', id: productId });
        })
        .catch(() => {
          res.status(500).json({ message: 'Error uploading images' });
        });
    } else {
      res.json({ message: 'Product created successfully', id: productId });
    }
  });
});

app.put('/admin/products/:id', authenticateToken, upload.array('images', 5), (req, res) => {
  const { id } = req.params;
  const { product_code, name, description, price, category_id, status } = req.body;
  
  const query = 'UPDATE products SET product_code = ?, name = ?, description = ?, price = ?, category_id = ?, status = ? WHERE id = ?';
  
  db.query(query, [product_code, name, description, price, category_id, status, id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    
    // If new images are uploaded, delete old images and insert new ones
    if (req.files && req.files.length > 0) {
      // Delete old images first
      deleteProductImages(id)
        .then(() => {
          // Insert new images
          const imageQueries = req.files.map((file, index) => {
            return new Promise((resolve, reject) => {
              const imageQuery = 'INSERT INTO product_images (product_id, image_path, image_name, is_primary) VALUES (?, ?, ?, ?)';
              db.query(imageQuery, [id, file.filename, file.originalname, index === 0], (err) => {
                if (err) reject(err);
                else resolve();
              });
            });
          });
          
          Promise.all(imageQueries)
            .then(() => {
              res.json({ message: 'Product updated successfully' });
            })
            .catch(() => {
              res.status(500).json({ message: 'Error uploading images' });
            });
        })
        .catch(() => {
          res.status(500).json({ message: 'Error deleting old images' });
        });
    } else {
      res.json({ message: 'Product updated successfully' });
    }
  });
});

app.delete('/admin/products/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  
  // Delete product images first (files and database records)
  deleteProductImages(id)
    .then(() => {
      // Delete the product
      const query = 'DELETE FROM products WHERE id = ?';
      db.query(query, [id], (err) => {
        if (err) {
          return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: 'Product deleted successfully' });
      });
    })
    .catch(() => {
      res.status(500).json({ message: 'Error deleting product images' });
    });
});

// Categories routes
app.get('/categories', (req, res) => {
  const query = 'SELECT * FROM categories ORDER BY name';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
});

// Articles routes
app.get('/articles', (req, res) => {
  const query = 'SELECT * FROM articles WHERE status = "published" ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
});

app.get('/articles/:id', (req, res) => {
  const { id } = req.params;
  
  const query = 'SELECT * FROM articles WHERE id = ? AND status = "published"';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    res.json(results[0]);
  });
});

app.get('/admin/articles', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM articles ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
});

app.post('/admin/articles', authenticateToken, upload.single('image'), (req, res) => {
  const { title, content, excerpt, status } = req.body;
  const image_path = req.file ? req.file.filename : null;
  
  const query = 'INSERT INTO articles (title, content, excerpt, image_path, status) VALUES (?, ?, ?, ?, ?)';
  
  db.query(query, [title, content, excerpt, image_path, status], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json({ message: 'Article created successfully', id: results.insertId });
  });
});

app.put('/admin/articles/:id', authenticateToken, upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { title, content, excerpt, status } = req.body;
  
  // First, get the current article to check if it has an image
  const getQuery = 'SELECT image_path FROM articles WHERE id = ?';
  db.query(getQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    const currentImagePath = results[0].image_path;
    
    let query = 'UPDATE articles SET title = ?, content = ?, excerpt = ?, status = ? WHERE id = ?';
    let params = [title, content, excerpt, status, id];
    
    if (req.file) {
      // Delete old image if exists
      if (currentImagePath) {
        deleteImageFile(currentImagePath);
      }
      
      query = 'UPDATE articles SET title = ?, content = ?, excerpt = ?, image_path = ?, status = ? WHERE id = ?';
      params = [title, content, excerpt, req.file.filename, status, id];
    }
    
    db.query(query, params, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      res.json({ message: 'Article updated successfully' });
    });
  });
});

app.delete('/admin/articles/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  
  // First, get the article to check if it has an image
  const getQuery = 'SELECT image_path FROM articles WHERE id = ?';
  db.query(getQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    const imagePath = results[0].image_path;
    
    // Delete the article
    const deleteQuery = 'DELETE FROM articles WHERE id = ?';
    db.query(deleteQuery, [id], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      
      // Delete image file if exists
      if (imagePath) {
        deleteImageFile(imagePath);
      }
      
      res.json({ message: 'Article deleted successfully' });
    });
  });
});

// FAQ routes
app.get('/faqs', (req, res) => {
  const query = 'SELECT * FROM faqs WHERE status = "active" ORDER BY order_index';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
});

app.get('/admin/faqs', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM faqs ORDER BY order_index';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
});

app.post('/admin/faqs', authenticateToken, (req, res) => {
  const { question, answer, order_index, status } = req.body;
  
  const query = 'INSERT INTO faqs (question, answer, order_index, status) VALUES (?, ?, ?, ?)';
  
  db.query(query, [question, answer, order_index, status], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json({ message: 'FAQ created successfully', id: results.insertId });
  });
});

app.put('/admin/faqs/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { question, answer, order_index, status } = req.body;
  
  const query = 'UPDATE faqs SET question = ?, answer = ?, order_index = ?, status = ? WHERE id = ?';
  
  db.query(query, [question, answer, order_index, status, id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json({ message: 'FAQ updated successfully' });
  });
});

app.delete('/admin/faqs/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  
  const query = 'DELETE FROM faqs WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json({ message: 'FAQ deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});