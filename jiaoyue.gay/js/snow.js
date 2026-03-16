/**
 * 雪花特效
 */
document.addEventListener('DOMContentLoaded', () => {
    const snowContainer = document.querySelector('.snow-container');
    if (!snowContainer) return;

    const numberOfSnowflakes = 20;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.textContent = '❄';
        fragment.appendChild(snowflake);
    }

    snowContainer.appendChild(fragment);
});