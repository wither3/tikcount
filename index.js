const express = require('express');
const cors = require('cors');
const { tiktokStalk } = require('./codenya/countik'); // Import fungsi tiktokStalk
const LoveTik = require("./lovetik");
const { ttsave } = require("./ttsave");



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


app.get("/ttsave", async (req, res) => {
    const url = req.query.url; // Ambil URL dari query parameter
    if (!url) {
        return res.status(400).json({
            status: false,
            message: "URL TikTok diperlukan!"
        });
    }

    try {
        const result = await ttsave.download(url);
        res.status(200).json({
            status: true,
            result
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Terjadi kesalahan!",
            error: error.message
        });
    }
});
app.get("/lovetik", async (req, res) => {
    const url = req.query.url; // Ambil URL dari query parameter
    if (!url) {
        return res.status(400).json({
            status: false,
            message: "URL TikTok diperlukan!"
        });
    }

    try {
        const result = await LoveTik(url);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Terjadi kesalahan!",
            error: error.message
        });
    }
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

