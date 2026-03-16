



const worksData = [

    {
        id: 'youtube',
        titleKey: 'work_youtube_title',
        descriptionKey: 'work_youtube_desc',
        tools: 'PENUP App',
        imageUrl: 'images/exhibit/work_1.webp',
        link: 'https://www.penup.com/artwork/1759028799148272?collectionEnabled=false'
    },

    {
        id: 'digital_art',
        titleKey: 'work_digital_art_title',
        descriptionKey: 'work_digital_art_desc',
        tools: 'PENUP App',
        imageUrl: 'images/exhibit/work_2.webp',
        link: 'https://www.penup.com/artwork/1759029266151522?collectionEnabled=false'
    },

    {
        id: 'other_works',
        titleKey: 'work_other_works_title',
        descriptionKey: 'work_other_works_desc',
        tools: 'PENUP App',
        imageUrl: 'images/exhibit/work_3.webp',
        link: 'https://www.penup.com/artwork/1762044722308932?collectionEnabled=false'
    },

    {
        id: 'stickers',
        titleKey: 'work_4_title',
        descriptionKey: 'work_4_desc',
        tools: 'PENUP App, Photoshop',
        imageUrl: 'images/exhibit/work_4.webp',
        link: 'https://store.line.me/stickershop/product/32440569/zh-Hant'
    },

    {
        id: 'work_5',
        titleKey: 'work_5_title',
        descriptionKey: 'work_5_desc',
        tools: 'PENUP App',
        imageUrl: 'images/exhibit/work_5.webp',
        link: 'https://www.penup.com/artwork/1766814201794042?collectionEnabled=false'
    },

    {
        id: 'work_6',
        titleKey: 'work_6_title',
        descriptionKey: 'work_6_desc',
        tools: 'PENUP App',
        imageUrl: 'images/exhibit/work_6.webp',
        link: 'https://www.penup.com/artwork/1769162825237302?collectionEnabled=false'
    },
    {
        id: 'work_7',
        titleKey: 'work_7_title',
        descriptionKey: 'work_7_desc',
        tools: 'PENUP App',
        imageUrl: 'images/exhibit/work_7.webp',
        link: 'https://www.penup.com/artwork/1769357171008862?ref=app'
    },
    {
        id: 'work_8',
        titleKey: 'work_8_title',
        descriptionKey: 'work_8_desc',
        tools: 'PENUP App',
        imageUrl: 'images/exhibit/work_8.webp',
        link: 'https://m.penup.com/artwork/1770724816859292?ref=app'
    },
    {
        id: 'work_9',
        titleKey: 'work_9_title',
        descriptionKey: 'work_9_desc',
        tools: 'PENUP App',
        imageUrl: 'images/exhibit/work_9.webp',
        link: 'https://www.penup.com/artwork/1771006817244852?ref=app'
    }
];


const worksModalHTML = `
<div id="works-modal" class="fixed inset-0 z-[80] hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    
    <div class="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity opacity-0" id="works-modal-backdrop" onclick="toggleWorksModal(false)"></div>

    
    <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-2xl bg-white dark:bg-darkCard text-left shadow-2xl transition duration-300 sm:my-8 sm:w-full sm:max-w-4xl opacity-0 scale-95" id="works-modal-panel">

                
                <div class="bg-slate-50 dark:bg-darkCard/50 px-6 py-4 border-b border-light-border dark:border-dark-border flex justify-between items-center">
                    <h3 class="text-xl font-bold text-slate-900 dark:text-[#f0f6fc]" id="modal-title">
                        <i class="fas fa-folder-open text-accentBlue mr-2"></i> <span data-t="modal_works_title">查看所有作品</span>
                    </h3>
                    <button onclick="toggleWorksModal(false)" class="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 focus:outline-none" aria-label="Close modal">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>

                
                <div id="modal-body-content" class="px-6 py-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    
                    
                    <div id="works-grid-container">
                        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            
                        </div>
                    </div>

                    
                    <div id="work-detail-container" class="hidden">
                        <button onclick="showWorksGrid()" class="mb-6 text-sm text-accentBlue hover:underline focus:outline-none flex items-center">
                            <i class="fas fa-arrow-left mr-2"></i><span data-t="modal_work_back">返回作品列表</span>
                        </button>
                        
                        <div class="grid lg:grid-cols-2 gap-8 items-start">
                            
                            <div class="w-full aspect-video lg:aspect-auto rounded-lg overflow-hidden border border-light-border dark:border-dark-border">
                                <img id="detail-image" src="" width="1280" height="720" alt="" data-alt="" loading="lazy" decoding="async" class="w-full h-full object-cover">
                            </div>
                            
                            <div class="flex flex-col h-full">
                                <h3 id="detail-title" class="text-2xl font-bold text-slate-900 dark:text-[#f0f6fc] mb-4" data-t=""></h3>
                                
                                <p class="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1" data-t="modal_work_details">簡介 / 說明：</p>
                                <p id="detail-description" class="text-slate-600 dark:text-slate-300 mb-6 text-base leading-relaxed" data-t=""></p>
                                
                                <p class="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1" data-t="modal_work_tools">使用工具:</p>
                                <p id="detail-tools" class="text-slate-600 dark:text-slate-300 mb-auto"></p>
                                
                                <a id="detail-link" href="#" target="_blank" rel="noopener noreferrer" class="mt-6 inline-block text-center w-full px-6 py-3 bg-accentBlue hover:bg-blue-400 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105">
                                    <i class="fas fa-external-link-alt mr-2"></i><span data-t="modal_work_view">前往觀看</span>
                                </a>
                                <span id="detail-link-disabled" class="hidden mt-6 text-center w-full px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 font-bold rounded-lg cursor-not-allowed flex items-center justify-center gap-2">
                                    <i class="fas fa-hourglass-start"></i> <span data-t="advertiser1_btn">作品尚未販售</span>
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
 * 渲染作品網格
 */
function renderWorksGrid(data) {
    const grid = document.querySelector('#works-grid-container .grid');
    if (!grid) return;

    let gridHTML = '';
    data.forEach(work => {
        gridHTML += `
            <button onclick="showWorkDetail('${work.id}')" class="text-left block group relative rounded-xl overflow-hidden border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-accentBlue transition-shadow duration-300 shadow-md hover:shadow-xl">
                <div class="aspect-video bg-slate-200 dark:bg-darkCard">
                    <img src="${work.imageUrl}" width="640" height="360" alt="" data-alt="${work.titleKey}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onerror="this.src='https://placehold.co/400x250/33333A/FFFFFF?text=Image'">
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h4 class="text-white font-bold" data-t="${work.titleKey}"></h4>
                    <p class="text-xs text-slate-300 line-clamp-2" data-t="${work.descriptionKey}_short"></p>
                </div>
            </button>
        `;
    });


    gridHTML += `
        <div class="flex items-center justify-center aspect-video rounded-xl border-2 border-dashed border-light-border dark:border-dark-border text-slate-400 dark:text-slate-600">
            <span class="text-sm" data-t="modal_work_coming_soon">更多作品準備中...</span>
        </div>
    `;

    grid.innerHTML = gridHTML;
}

/**
 * 顯示作品詳細資料
 * @param {string} workId - 作品 ID
 * @param {boolean} updateHistory - 是否更新瀏覽歷史
 */
function showWorkDetail(workId, updateHistory = true) {

    const work = worksData.find(w => w.id === workId);
    if (!work) return;


    if (updateHistory) {
        history.pushState({ worksModal: true, workId: workId }, '', `#works/${workId}`);
    }

    const linkButton = document.getElementById('detail-link');
    const disabledSpan = document.getElementById('detail-link-disabled');


    if (work.link) {
        linkButton.href = work.link;
        linkButton.classList.remove('hidden');
        disabledSpan.classList.add('hidden');
    } else {
        linkButton.classList.add('hidden');
        disabledSpan.classList.remove('hidden');
    }


    document.getElementById('detail-title').setAttribute('data-t', work.titleKey);
    document.getElementById('detail-description').setAttribute('data-t', work.descriptionKey);


    document.getElementById('detail-image').src = work.imageUrl;
    document.getElementById('detail-tools').textContent = work.tools;

    // set detail image alt translation key for accessibility
    const detailImg = document.getElementById('detail-image');
    if (detailImg) detailImg.setAttribute('data-alt', work.titleKey);

    document.getElementById('works-grid-container').classList.add('hidden');
    document.getElementById('work-detail-container').classList.remove('hidden');


    const currentLang = localStorage.getItem('lang') || 'zh';
    if (typeof window.changeLang === 'function') {
        window.changeLang(currentLang);
    }


    document.getElementById('modal-body-content').scrollTop = 0;
}

/**
 * 返回作品網格
 * @param {boolean} updateHistory - 是否更新瀏覽歷史
 */
function showWorksGrid(updateHistory = true) {

    if (updateHistory && history.state && history.state.workId) {
        history.back();
        return;
    }

    const gridContainer = document.getElementById('works-grid-container');
    const detailContainer = document.getElementById('work-detail-container');

    if (gridContainer && detailContainer) {
        detailContainer.classList.add('hidden');
        gridContainer.classList.remove('hidden');
    }
}



document.body.insertAdjacentHTML('beforeend', worksModalHTML);


setTimeout(() => {
    renderWorksGrid(worksData);

    const currentLang = localStorage.getItem('lang') || 'zh';
    if (typeof window.changeLang === 'function') {
        window.changeLang(currentLang);
    }
}, 0);


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('works-modal');
        const detailContainer = document.getElementById('work-detail-container');


        if (modal && !modal.classList.contains('hidden')) {

            if (detailContainer && !detailContainer.classList.contains('hidden')) {
                showWorksGrid();
            }

            else if (typeof toggleWorksModal === 'function') {
                toggleWorksModal(false);
            }
        }
    }
});


window.addEventListener('popstate', (e) => {
    const modal = document.getElementById('works-modal');
    const state = e.state;

    if (state && state.worksModal) {

        if (modal && modal.classList.contains('hidden')) {
            toggleWorksModal(true);
        }

        if (state.workId) {
            showWorkDetail(state.workId, false);
        } else {
            showWorksGrid(false);
        }
    } else {

        if (modal && !modal.classList.contains('hidden')) {
            toggleWorksModal(false);
        }
    }
});