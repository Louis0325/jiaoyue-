/**
 * 動態生成雪花效果
 */
document.addEventListener('DOMContentLoaded', () => {
    const snowContainer = document.querySelector('.snow-container');
    if (!snowContainer) return;

    const numberOfSnowflakes = 20; // 雪花數量，對應 css/snow.css 中的 :nth-child 選擇器
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.textContent = '❄️';
        fragment.appendChild(snowflake);
    }

    snowContainer.appendChild(fragment);
});