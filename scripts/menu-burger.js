function menuBuger() {
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.hidden__nav');



    burger.addEventListener('click', () => {
        let menuHeight = menu.style.height;
        if (menuHeight == '0px' || !menuHeight) {
            menu.style.height = '120px';
        } else {
            menu.style.height = '0';
        }

        burger.classList.toggle('header__burger-active');
    });
}

export { menuBuger };