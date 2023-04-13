function categoryMenu() {
    const btn = document.querySelector('.books__arrow');
    const categoryList = document.querySelector('.books__list');
    const categoryArray = Array.from(document.querySelectorAll('.books__category'));

    const closeList = () => {
        categoryList.classList.remove('books__list-active');
        categoryList.style.paddingRight = '0px';
        btn.style.left = '5px';
    };

    btn.addEventListener('click', () => {
        categoryList.style.display = 'flex';
        btn.classList.toggle('left');
        if (!categoryList.classList.contains('books__list-active')) {
            categoryList.classList.add('books__list-active');
            categoryList.style.position = 'fixed';
            categoryList.style.paddingRight = '20px';
            btn.style.left = '130px';
            btn.style.top = '45%';
        } else {
            closeList();
            btn.style.top = '50%';
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > '600') {
            categoryList.style.position = 'absolute';
            categoryList.style.display = 'flex';
        } else if (window.innerWidth < '600') {
            categoryArray.forEach(category => {
                category.addEventListener('click', () => {
                    closeList();
                });
            });
            //categoryList.style.backgroundColor = 'red'
            categoryList.style.display = 'none';
            closeList();
            btn.classList.remove('left');
        }
    });
}

export { categoryMenu };