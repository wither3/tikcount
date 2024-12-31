const axios = require('axios');
const cheerio = require('cheerio');

const ttsave = {
  download: async (url) => {
    const apiUrl = 'https://ttsave.app/download';
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
        'Referer': 'https://ttsave.app/id'
    };

    const data = {
        query: url,
        language_id: "2"
    };

    try {
        const response = await axios.post(apiUrl, data, { headers });
        const html = response.data;
        const result = ttsave.extract(html);
        return result;
    } catch (error) {
        console.error('Error downloading video:', error);
        throw error;
    }
 },
 extract: async (html) => {
    const $ = cheerio.load(html);
    const result = {};
    
    result.uniqueId = $('#unique-id').val();
    result.username = $('h2.font-extrabold').text().trim();
    result.userHandle = $('a[title]').text().trim();
    result.userProfileImage = $('img').attr('src');
    result.description = $('p.oneliner').text().trim();
    result.views = $('span:contains("K")').first().text().trim(); // Mengambil views

    result.downloadLinks = {
        noWatermark: $('a[type="no-watermark"]').attr('href'),
        withWatermark: $('a[type="watermark"]').attr('href'),
        audio: $('a[type="audio"]').attr('href'),
        profileImage: $('a[type="profile"]').attr('href'),
        coverImage: $('a[type="cover"]').attr('href')
    };

    return result;
  }
}

module.exports = { ttsave };
