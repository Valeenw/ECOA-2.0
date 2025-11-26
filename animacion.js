

function animateTitle(selector) {
    const title = document.querySelector(selector);
    if (title) {
        title.classList.add('animated-active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        let titleSelector = 'h2.animated-title';
        if (document.querySelector('h1.animated-title')) {
             titleSelector = 'h1.animated-title';
        }

        animateTitle(titleSelector);
    }
});