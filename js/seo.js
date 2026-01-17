(function () {
    const seoData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "name": "焦月 Jiao Yue 官方網站",
                "url": "https://jiaoyue.gay/",
                "description": "焦月 (Jiao Yue) 的個人作品集與官方網站"
            },
            {
                "@type": "Person",
                "name": "焦月 Jiao Yue",
                "url": "https://jiaoyue.gay",
                "image": "https://jiaoyue.gay/images/jiao_yue_profile.jpg",
                "sameAs": [
                    "https://www.youtube.com/channel/UCfn_S3F7gIG9-komcsLMPLA",
                    "https://x.com/xingxing1443469",
                    "https://www.instagram.com/louis1234433",
                    "https://space.bilibili.com/1352630702"
                ],
                "jobTitle": "Digital Artist",
                "description": "一位熱愛創作的柴犬獸人，展示電繪作品、YouTube 影片以及更多創意內容。"
            }
        ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(seoData);
    document.head.appendChild(script);

    // 動態讀取 keywords.txt 並更新 Meta Keywords
    fetch('keywords.txt?v=' + Date.now()) // 加入時間戳記避免快取
        .then(response => response.text())
        .then(text => {
            // 去除換行符號與前後空白
            const keywords = text.replace(/[\r\n]+/g, '').trim();
            let meta = document.querySelector('meta[name="keywords"]');
            if (!meta) {
                meta = document.createElement('meta');
                meta.name = 'keywords';
                document.head.appendChild(meta);
            }
            meta.content = keywords;
        })
        .catch(err => console.error('無法讀取 keywords.txt:', err));
})();