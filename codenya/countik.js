const { run } = require('shannz-playwright');

async function tiktokStalk(username) {
    const code = `const { chromium, devices } = require('playwright');
    async function stalk() { 
    const iPhone = devices['iPhone 13'];

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        ...iPhone,
    });
    const page = await context.newPage();

    try {
        await page.goto(\`https://countik.com/tiktok-analytics/user/@${username}\`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(3000);
        
        const userData = await page.evaluate(() => {
            const username = document.querySelector('.username h2')?.innerText;
            const nickname = document.querySelector('.nickname')?.innerText;
            const country = document.querySelector('.acc-country')?.innerText;
            const profilePicture = document.querySelector('.pic img')?.src;
            const profileUrl = document.querySelector('.visit-btn a')?.href;
            const totalFollowers = document.querySelector('.user-stats .block:nth-child(1) p')?.innerText;
            const totalLikes = document.querySelector('.user-stats .block:nth-child(2) p')?.innerText;
            const totalVideos = document.querySelector('.user-stats .block:nth-child(3) p')?.innerText;
            const following = document.querySelector('.user-stats .block:nth-child(4) p')?.innerText;
            const overallEngagement = document.querySelector('.total-engagement-rates .block:nth-child(1) p')?.innerText;
            const likesRate = document.querySelector('.total-engagement-rates .block:nth-child(2) p')?.innerText;
            const commentsRate = document.querySelector('.total-engagement-rates .block:nth-child(4) p')?.innerText;
            const sharesRate = document.querySelector('.total-engagement-rates .block:nth-child(3) p')?.innerText;
            const avgViews = document.querySelector('.average-video-performance .block:nth-child(1) p')?.innerText;
            const avgLikes = document.querySelector('.average-video-performance .block:nth-child(2) p')?.innerText;
            const avgComments = document.querySelector('.average-video-performance .block:nth-child(3) p')?.innerText;
            const avgShares = document.querySelector('.average-video-performance .block:nth-child(4) p')?.innerText;
            const hashtags = Array.from(document.querySelectorAll('.hashtags .item:nth-child(1) .mem')).map(tag => tag.innerText);
            const mostUsedHashtags = Array.from(document.querySelectorAll('.hashtags .item:nth-child(2) .span-tag')).map(tag => ({
                hashtag: tag.querySelector('.chosen')?.innerText,
                count: tag.querySelector('.count')?.innerText
            }));
            const recentPosts = Array.from(document.querySelectorAll('.recent-posts .item')).map(post => ({
                image: post.querySelector('.post-img img')?.src,
                views: post.querySelector('.post-data .data:nth-child(1) .value')?.innerText,
                likes: post.querySelector('.post-data .data:nth-child(2) .value')?.innerText,
                comments: post.querySelector('.post-data .data:nth-child(3) .value')?.innerText,
                shares: post.querySelector('.post-data .data:nth-child(4) .value')?.innerText,
                hashtagsCount: post.querySelector('.post-data .data:nth-child(5) .value')?.innerText,
                mentions: post.querySelector('.post-data .data:nth-child(6) .value')?.innerText,
                saves: post.querySelector('.post-data .data:nth-child(7) .value')?.innerText,
                engagementRate: post.querySelector('.post-data .medium-engagement .value')?.innerText,
                description: post.querySelector('.post-data .desc')?.innerText,
                music: {
                    title: post.querySelector('.music-details a')?.innerText,
                    audioUrl: post.querySelector('.music-info audio source')?.src
                },
                createdTime: post.querySelector('.extra-data .create-time p')?.innerText
            }));

            return {
                username,
                nickname,
                country,
                profilePicture,
                profileUrl,
                stats: {
                    totalFollowers,
                    totalLikes,
                    totalVideos,
                    following
                },
                engagementRates: {
                    overallEngagement,
                    likesRate,
                    commentsRate,
                    sharesRate
                },
                averageVideoPerformance: {
                    avgViews,
                    avgLikes,
                    avgComments,
                    avgShares
                },
                hashtags,
                mostUsedHashtags,
                recentPosts
            };
        });

        console.log(JSON.stringify(userData, null, 2));
    } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data:', error);
    } finally {
        await browser.close();
    }
    }
    stalk();`;
const start = await run('javascript', code);
    const result = start.result.output;
    
    return JSON.parse(result);
}

module.exports = { tiktokStalk };
