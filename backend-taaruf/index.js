const express = require('express');
const cors = require('cors');
const taarufRoutes = require('./routes/taarufRoutes');
const authRoutes = require('./routes/authRoutes'); // ✅ Tambahkan auth route
const authenticateToken = require('./middleware/authMiddleware'); // ✅ Middleware JWT

const app = express();

app.use(cors({
  origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://192.168.65.1:3000'], // tambahkan ini
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

// Cek server
app.get('/', (req, res) => {
  res.send('API Taaruf berjalan...');
});

// ✅ Rute untuk login & register (tidak butuh token)
app.use('/api/auth', authRoutes);

// ✅ Lindungi rute taaruf dengan autentikasi token
app.use('/api/taaruf', authenticateToken, taarufRoutes);

app.listen(5000, () => {
  console.log('Server berjalan di http://127.0.0.1:5000');
});
