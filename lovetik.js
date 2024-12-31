const axios = require("axios");

const LoveTik = (url) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios("https://lovetik.com/api/ajax/search", {
                method: "POST", data: new URLSearchParams(Object.entries({
                  query: url
                }))
              })
              let result = []
              if (data.cover == '') {
                result.push({
                    status: false,
                    message: "No support TikTok slide."
                })
              } else if (data.p == "convert") {
                result.push({
                    status: true,
                    result: {
                    thumbnail: data.cover,
                    description:  data.desc,
                    username: data.author,
                    username_url: "https://tiktok.com/@" + data.author,
                    fullname: data.author_name,
                    profile_pict: data.author_a,
                    with_watermark: data.links[1].a,
                    without_watermark: data.links[0].a,
                    audio: data.links[2].a
                    }
                })
              } else if (data.mess == "Invalid TikTok video url. Please try again.") {
                result.push({
                    status: false,
                    message: data.mess
                })
              } else {
                result.push({
                    status: false,
                    message: data.mess
                })
              }
              resolve(result[0])
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = LoveTik