(document.addEventListener('DOMContentLoaded', function () {
    // 嘗試從 siteConfig 讀取設定，若無則使用預設值
    const config = window.siteConfig && window.siteConfig.seo ? window.siteConfig.seo : {
        siteName: "🐾 焦月 🐾 自我介紹網站",
        siteUrl: "https://jiaoyue.gay/",
        siteDescription: "🐾 焦月 🐾|自我介紹",
        personName: "焦月 Jiao Yue",
        personImage: "https://jiaoyue.gay/images/jiao_yue_profile.jpg",
        personJobTitle: "Digital Artist",
        personDescription: "焦月是一隻可愛的柴犬日常會發發繪圖作品",
        socialLinks: []
    };

    const seoData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "name": config.siteName,
                "url": config.siteUrl,
                "description": config.siteDescription
            },
            {
                "@type": "Person",
                "name": config.personName,
                "url": config.siteUrl,
                "image": config.personImage,
                "sameAs": config.socialLinks,
                "jobTitle": config.personJobTitle,
                "description": config.personDescription
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
        .then(encodedText => {
            let text = encodedText;
            try {
                // 嘗試 Base64 解碼 (支援 UTF-8 中文)
                text = decodeURIComponent(escape(window.atob(encodedText.trim())));
            } catch (e) {
                console.warn('Keywords decoding failed or text is plain, using original.', e);
            }

            // 將換行符號轉換為逗號，確保關鍵字分開 (即使 txt 檔裡沒寫逗號也能正常運作)
            const keywords = text.trim().split(/[\r\n]+/).join(',');
            let meta = document.querySelector('meta[name="keywords"]');
            if (!meta) {
                meta = document.createElement('meta');
                meta.name = 'keywords';
                document.head.appendChild(meta);
            }
            meta.content = keywords;
        })
        .catch(err => console.error('無法讀取 keywords.txt:', err));
}));