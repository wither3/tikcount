const express = require('express');
const cors = require('cors');
const { tiktokStalk } = require('./codenya/countik'); // Import fungsi tiktokStalk

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    return res.status(204).end(); // Abaikan favicon.ico
  }
  console.log(`Request received: ${req.method} ${req.path}`); // Log semua permintaan
  next();
});

app.get('/tikstalk', async (req, res) => {
    const username = req.query.username; // Ambil username dari query parameter

    if (!username) {
        return res.status(400).json({ error: 'Username TikTok diperlukan!' });
    }

    try {
        const data = await tiktokStalk(username); // Panggil fungsi stalk
        res.status(200).json({ success: true, data }); // Kirim data sebagai respons
    } catch (error) {
        console.error('Gagal mendapatkan data TikTok:', error);
        res.status(500).json({ success: false, error: 'Terjadi kesalahan pada server!' });
    }
});



app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

