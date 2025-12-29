// --- 作品資料 ---
// 為了避免本地端檔案讀取問題，我們將作品資料直接放在這裡。
// 作品的標題與說明使用「翻譯鍵」(例如 'work_youtube_title')，
// 對應的文字內容則定義在 lang-zh.js, lang-en.js, lang-ja.js 檔案中。
const worksData = [
    //作品1
    {
        id: 'youtube',
        titleKey: 'work_youtube_title',
        descriptionKey: 'work_youtube_desc',
        tools: 'PENUP App',
        imageUrl: 'images/exhibit/work_1.jpg',
        link: 'https://www.penup.com/artwork/1759028799148272?collectionEnabled=false'
    },
    //作品2
    {
        id: 'digital_art',
        titleKey: 'work_digital_art_title',
        descriptionKey: 'work_digital_art_desc',
        tools: 'PENUP App',
        imageUrl: 'images/exhibit/work_2.jpg',
        link: 'https://www.penup.com/artwork/1759029266151522?collectionEnabled=false'
    },
    //作品3
    {
        id: 'other_works',
        titleKey: 'work_other_works_title',
        descriptionKey: 'work_other_works_desc',
        tools: 'PENUP App',
        imageUrl: 'images/exhibit/work_3.jpg',
        link: 'https://www.penup.com/artwork/1762044722308932?collectionEnabled=false'
    },
    //作品4
    {
        id: 'stickers',
        titleKey: 'work_4_title',
        descriptionKey: 'work_4_desc',
        tools: 'PENUP App, Photoshop',
        imageUrl: 'images/exhibit/work_4.jpg',
        link: 'https://store.line.me/stickershop/product/32440569/zh-Hant'
    },
    //作品5
    {
        id: 'work_5',
        titleKey: 'work_5_title',
        descriptionKey: 'work_5_desc',
        tools: 'PENUP App',
        imageUrl: 'images/exhibit/work_5.jpg',
        link: 'https://www.penup.com/artwork/1766814201794042?collectionEnabled=false'
    }
];

// --- Modal HTML 結構 ---
const worksModalHTML = `
<div id="works-modal" class="fixed inset-0 z-[80] hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <!-- 背景遮罩 -->
    <div class="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity opacity-0" id="works-modal-backdrop" onclick="toggleWorksModal(false)"></div>

    <!-- Modal 內容 -->
    <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-2xl bg-white dark:bg-darkCard text-left shadow-2xl transition duration-300 sm:my-8 sm:w-full sm:max-w-4xl opacity-0 scale-95" id="works-modal-panel">

                <!-- Header -->
                <div class="bg-slate-50 dark:bg-darkBg/50 px-6 py-4 border-b border-lightBorder dark:border-darkBorder flex justify-between items-center">
                    <h3 class="text-xl font-bold text-slate-900 dark:text-[#f0f6fc]" id="modal-title">
                        <i class="fas fa-folder-open text-accentBlue mr-2"></i> <span data-t="modal_works_title">所有作品集</span>
                    </h3>
                    <button onclick="toggleWorksModal(false)" class="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 focus:outline-none">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>

                <!-- Body (可切換內容) -->
                <div id="modal-body-content" class="px-6 py-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    
                    <!-- 1. 作品網格視圖 (預設顯示) -->
                    <div id="works-grid-container">
                        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <!-- 由 JavaScript 動態生成 -->
                        </div>
                    </div>

                    <!-- 2. 作品詳細資訊視圖 (預設隱藏) -->
                    <div id="work-detail-container" class="hidden">
                        <button onclick="showWorksGrid()" class="mb-6 text-sm text-accentBlue hover:underline focus:outline-none flex items-center">
                            <i class="fas fa-arrow-left mr-2"></i><span data-t="modal_work_back">返回作品列表</span>
                        </button>
                        
                        <div class="grid lg:grid-cols-2 gap-8 items-start">
                            <!-- 左側: 圖片 -->
                            <div class="w-full aspect-video lg:aspect-auto rounded-lg overflow-hidden border border-lightBorder dark:border-darkBorder">
                                <img id="detail-image" src="" alt="作品詳細圖片" class="w-full h-full object-cover">
                            </div>
                            <!-- 右側: 資訊 -->
                            <div class="flex flex-col h-full">
                                <h3 id="detail-title" class="text-2xl font-bold text-slate-900 dark:text-[#f0f6fc] mb-4" data-t=""></h3>
                                
                                <p class="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1" data-t="modal_work_details">簡介 / 說明:</p>
                                <p id="detail-description" class="text-slate-600 dark:text-slate-300 mb-6 text-base leading-relaxed" data-t=""></p>
                                
                                <p class="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1" data-t="modal_work_tools">使用工具:</p>
                                <p id="detail-tools" class="text-slate-600 dark:text-slate-300 mb-auto"></p>
                                
                                <a id="detail-link" href="#" target="_blank" class="mt-6 inline-block text-center w-full px-6 py-3 bg-accentBlue hover:bg-blue-400 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105">
                                    <i class="fas fa-external-link-alt mr-2"></i><span data-t="modal_work_view">【前往觀看】</span>
                                </a>
                                <span id="detail-link-disabled" class="hidden mt-6 text-center w-full px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 font-bold rounded-lg cursor-not-allowed flex items-center justify-center gap-2">
                                    <i class="fas fa-hourglass-start"></i> <span data-t="advertiser1_btn">暫時尚未開賣</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
`;

/**
 * 動態生成作品網格
 */
function renderWorksGrid(data) {
    const grid = document.querySelector('#works-grid-container .grid');
    if (!grid) return;

    let gridHTML = '';
    data.forEach(work => {
        gridHTML += `
            <button onclick="showWorkDetail('${work.id}')" class="text-left block group relative rounded-xl overflow-hidden border border-lightBorder dark:border-darkBorder focus:outline-none focus:ring-2 focus:ring-accentBlue transition-shadow duration-300 shadow-md hover:shadow-xl">
                <div class="aspect-video bg-slate-200 dark:bg-black">
                    <img src="${work.imageUrl}" alt="" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onerror="this.src='https://placehold.co/400x250/33333A/FFFFFF?text=Image'">
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h4 class="text-white font-bold" data-t="${work.titleKey}"></h4>
                    <p class="text-xs text-slate-300 line-clamp-2" data-t="${work.descriptionKey}_short"></p>
                </div>
            </button>
        `;
    });

    // 新增一個佔位符
    gridHTML += `
        <div class="flex items-center justify-center aspect-video rounded-xl border-2 border-dashed border-lightBorder dark:border-darkBorder text-slate-400 dark:text-slate-600">
            <span class="text-sm" data-t="modal_work_coming_soon">更多作品準備中...</span>
        </div>
    `;

    grid.innerHTML = gridHTML;
}

/**
 * 顯示指定作品的詳細資訊
 * @param {string} workId - 作品的 ID
 */
function showWorkDetail(workId) {
    // This function now uses the global worksData constant
    const work = worksData.find(w => w.id === workId);
    if (!work) return;

    const linkButton = document.getElementById('detail-link');
    const disabledSpan = document.getElementById('detail-link-disabled');

    // 根據 work.link 是否存在來決定顯示按鈕或提示
    if (work.link) {
        linkButton.href = work.link;
        linkButton.classList.remove('hidden');
        disabledSpan.classList.add('hidden');
    } else {
        linkButton.classList.add('hidden');
        disabledSpan.classList.remove('hidden');
    }

    // 設定翻譯鍵
    document.getElementById('detail-title').setAttribute('data-t', work.titleKey);
    document.getElementById('detail-description').setAttribute('data-t', work.descriptionKey);

    // 填充其他不會被翻譯的資訊
    document.getElementById('detail-image').src = work.imageUrl;
    document.getElementById('detail-tools').textContent = work.tools;

    // 切換視圖
    document.getElementById('works-grid-container').classList.add('hidden');
    document.getElementById('work-detail-container').classList.remove('hidden');

    // 手動觸發一次翻譯來更新剛剛設定好的內容
    const currentLang = localStorage.getItem('lang') || 'zh';
    if (typeof window.changeLang === 'function') {
        window.changeLang(currentLang);
    }

    // 將捲軸滾動到頂部
    document.getElementById('modal-body-content').scrollTop = 0;
}

/**
 * 返回到作品網格視圖
 */
function showWorksGrid() {
    const gridContainer = document.getElementById('works-grid-container');
    const detailContainer = document.getElementById('work-detail-container');

    if (gridContainer && detailContainer) {
        detailContainer.classList.add('hidden');
        gridContainer.classList.remove('hidden');
    }
}

// --- 初始化 ---
// 1. 將 Modal HTML 注入到 body
document.body.insertAdjacentHTML('beforeend', worksModalHTML);

// 2. 等待 DOM 更新後，使用內建的 worksData 生成作品網格並套用翻譯
setTimeout(() => {
    renderWorksGrid(worksData);
    // 套用當前語言到新生成的 Modal 內容上
    const currentLang = localStorage.getItem('lang') || 'zh';
    if (typeof window.changeLang === 'function') {
        window.changeLang(currentLang);
    }
}, 0);