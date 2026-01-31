// --- 設定區域 ---
const robotsData = [
    {
        name: "機器人 1 號",
        image: "images/bot-1.png",
        inviteLink: "https://discord.com/oauth2/authorize?client_id=1466704954520633444", // 邀請連結
        tosText: "這是機器人 1 號的服務條款。\n\n1. 請勿濫用機器人。\n2. 請遵守 Discord 社群守則。\n3. 如有問題請聯繫開發者。",
        isPublic: false // true = 公開版, false = 測試版
    },
    {
        name: "機器人 2 號",
        image: "https://via.placeholder.com/100",
        inviteLink: "#",
        tosText: "這是機器人 2 號的服務條款內容...",
        isPublic: true
    },
    {
        name: "機器人 3 號",
        image: "https://via.placeholder.com/100",
        inviteLink: "#",
        tosText: "這是機器人 3 號的服務條款內容...",
        isPublic: true
    },
    {
        name: "機器人 4 號",
        image: "https://via.placeholder.com/100",
        inviteLink: "#",
        tosText: "這是機器人 4 號的服務條款內容...",
        isPublic: true
    },
    {
        name: "機器人 5 號 (測試版)",
        image: "https://via.placeholder.com/100",
        inviteLink: "#",
        tosText: "這是機器人 5 號 (測試版) 的服務條款內容...",
        isPublic: true
    },
    {
        name: "機器人 6 號 (測試版)",
        image: "https://via.placeholder.com/100",
        inviteLink: "#",
        tosText: "這是機器人 6 號 (測試版) 的服務條款內容...",
        isPublic: true
    },
    {
        name: "機器人 7 號 (測試版)",
        image: "https://via.placeholder.com/100",
        inviteLink: "#",
        tosText: "這是機器人 7 號 (測試版) 的服務條款內容...",
        isPublic: true
    }
];
// ----------------

const gridContainer = document.querySelector('.robot-grid');
const navLinks = document.querySelectorAll('.nav-link');

// 彈窗相關元素
const modal = document.getElementById('tosModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close-btn');

// 開啟彈窗函式
window.openTosModal = function (robotName) {
    const robot = robotsData.find(r => r.name === robotName);
    if (robot) {
        modalTitle.innerText = `${robot.name} - 服務條款`;
        modalBody.innerText = robot.tosText || "暫無條款內容。";
        modal.style.display = "flex";
    }
};

// 關閉彈窗事件
closeBtn.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function renderRobots(showPublic) {
    let cardsHtml = '';

    // 根據 isPublic 屬性過濾 (true 為公開, false 為測試)
    const filteredRobots = robotsData.filter(robot => robot.isPublic === showPublic);

    filteredRobots.forEach(robot => {
        cardsHtml += `
        <div class="robot-card">
            <img src="${robot.image}" alt="${robot.name}" class="avatar">
            <h3 class="name">${robot.name}</h3>
            <div class="spacer"></div>
            <div class="actions">
                <button class="btn btn-invite" onclick="window.open('${robot.inviteLink}', '_blank')">邀請到伺服器</button>
                <button class="btn btn-tos" onclick="openTosModal('${robot.name}')">查看服務條款</button>
            </div>
        </div>
        `;
    });

    gridContainer.innerHTML = cardsHtml;
}

// 綁定導覽列點擊事件
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // 切換 active 樣式
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // 判斷點擊的是哪一個按鈕
        if (link.textContent.includes('公開中')) {
            renderRobots(true);
        } else {
            renderRobots(false);
        }
    });
});

// 預設顯示公開版
renderRobots(true);