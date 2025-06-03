const main = document.querySelector('main');

const btnOpen = document.getElementById('btnOpen');
const btnClose = document.getElementById('btnClose');
const btnCart = document.getElementById('btnCart');
const linkProfile = document.getElementById('link-profile');

const navMenu = document.querySelector('.header__navigation');
const navOverlay = document.querySelector('.header__navigation-overlay');

const media = window.matchMedia('(width < 90em)');

const setUpNav = (e) => {
    if(e.matches) {
        console.log(true);
        btnClose.setAttribute('inert', '');
        navOverlay.setAttribute('inert', '');
        navMenu.setAttribute('inert', '');
        navMenu.style.transition='none';
    } else {
        closeMenu();
        navMenu.removeAttribute('inert');
    }
}

setUpNav(media);

function openMenu() {
    btnOpen.setAttribute('aria-expanded', 'true');
    btnOpen.setAttribute('inert', '');
    btnCart.setAttribute('inert', '');
    linkProfile.setAttribute('inert', '');

    main.setAttribute('inert', '');

    btnClose.removeAttribute('inert');
    navMenu.removeAttribute('inert');
    navMenu.removeAttribute('style');   
}

function closeMenu() {
    btnOpen.setAttribute('aria-expanded', 'false');
    btnOpen.removeAttribute('inert');
    btnCart.removeAttribute('inert');
    linkProfile.removeAttribute('inert');

    btnClose.setAttribute('inert', '');
    navMenu.setAttribute('inert', '');

    main.removeAttribute('inert');

    setTimeout(() => {
        navMenu.style.transition='none';
    }, 500)
}

btnOpen.addEventListener('click', openMenu);
btnClose.addEventListener('click', closeMenu);

media.addEventListener('change', (e) => {
    setUpNav(e);
});