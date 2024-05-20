const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://saas-frontend-eight.vercel.app', // 替换为 Vercel 部署的实际 URL
}));

// MongoDB Atlas 连接字符串
const uri = 'mongodb://atlas-sql-664ad7549b984d610c917ae5-wvzx2.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin';

// 连接 MongoDB Atlas
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  user: 'sample_mflix', // 替换为你的 MongoDB Atlas 用户名
  pass: 'mongodb://atlas-sql-664ad7549b984d610c917ae5-wvzx2.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin', // 替换为你的 MongoDB Atlas 密码
})
.then(() => {
  console.log('MongoDB Atlas connected successfully');
})
.catch((error) => {
  console.error('MongoDB Atlas connection error:', error);
});

// MongoDB 连接错误事件监听
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// MongoDB 连接断开事件监听
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
