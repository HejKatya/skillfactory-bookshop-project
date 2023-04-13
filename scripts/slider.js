function slider() {

    const imgs = [
        {
            id: 1,
            url: 'imgs/slider-imgs/slider1.png',
            alt: `illustration with people holding books. it reads 'black friday sale up to 60%'`
        },
        {
            id: 2,
            url: 'imgs/slider-imgs/slider2.png',
            alt: `illustration with people climbing a mountain made of blocks. it reads 'top 10 books for entrepreneurs'`
        },
        {
            id: 3,
            url: 'imgs/slider-imgs/slider3.png',
            alt: `illustration with bright pink leaves on baby pink background. it reads 'check out our cozy books selection'`
        }
    ];

    const img = document.querySelector('.slider__img');
    const dots = Array.from(document.querySelectorAll('.slider-dot'));

    let currentItem = 0;

    const showPicture = picNum => {
        const item = imgs[picNum];
        img.src = item.url;
        img.alt = item.alt;

        dots.forEach(dot => {
            if (dots.indexOf(dot) == picNum) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    const change = () => {
        currentItem++;
        if (currentItem > (imgs.length - 1)) {
            currentItem = 0;
        }
        showPicture(currentItem);
    };

    window.addEventListener('DOMContentLoaded', () => {
        showPicture(currentItem);
        setInterval(change, 5000);

    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const num = dots.indexOf(dot);
            currentItem = num;
            showPicture(num);
        });
    });
}

export { slider };