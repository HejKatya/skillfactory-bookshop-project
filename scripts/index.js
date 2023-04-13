// url template `https://www.googleapis.com/books/v1/volumes?q="subject:${}"&key=${myKey}&printType=books&startIndex=0&maxResults=6&langRestrict=en&filter=paid-ebooks`

import { slider } from './slider.js';
slider();

import { menuBuger } from "./menu-burger.js";
menuBuger();

import { categoryMenu } from './categories.js';
categoryMenu();

import styles from '../styles/base.css'


// global variables 
const myKey = 'AIzaSyBBEk957I5li_IB861bKR-eLQvlO94Kkv4';
const booksList = document.querySelector('.books__cards');
const categories = Array.from(document.querySelectorAll('.books__category'));
const loadBtn = document.querySelector('.books__load-btn');

// display books func
function displayBooks(booksArray) {

    // displaying each book
    booksArray.forEach(book => {
        let author;
        if (!book.authors) {
            author = 'Unknown author';
        } else if (book.authors.length == 1) {
            author = book.authors[0];
        } else if (book.authors.length > 1) {
            author = book.authors.join(', ');
        }
        let reviews;
        if (book.reviews) {
            reviews = book.reviews;
        } else {
            reviews = 0;
        }
        const bookCard = `
        <li class="books__card">
            <img src="${book.coverUrl}" alt="${book.title} book cover" class="books__card-img">
            <div class="books__info-box">
            <h6 class="heading books__author">${author}</h6>
            <h4 class="heading books__title">${book.title}</h4>
            <h6 class="heading books__reviews">
            <div class="review-stars">
            <img src="./imgs/books-imgs/Star-gray.svg" class="review-star">
            <img src="./imgs/books-imgs/Star-gray.svg" class="review-star">
            <img src="./imgs/books-imgs/Star-gray.svg" class="review-star">
            <img src="./imgs/books-imgs/Star-gray.svg" class="review-star">
            <img src="./imgs/books-imgs/Star-gray.svg" class="review-star">
            </div>
            ${reviews} reviews</h6>
            <p class="books__about">${book.description}</p>
            <h5 class="heading books__price">${book.currency} ${book.price}</h5>
            <button id="${book.id}" class="books__btn btn">buy now</button>
            </div>
        </li>`;
        booksList.insertAdjacentHTML('beforeend', bookCard);

        const currentBook = document.getElementById(book.id);
        let stars = Array.from(currentBook.querySelectorAll('.review-star'));

        if (book.rating && book.reviews) {

            if (!Number.isInteger(book.rating)) {
                book.rating = Math.floor(book.rating);
            }
            switch (book.rating) {
                case 1:
                    stars[0].src = './imgs/books-imgs/Star-gold.svg';
                    break;
                case 2:
                    stars[0].src = './imgs/books-imgs/Star-gold.svg';
                    stars[1].src = './imgs/books-imgs/Star-gold.svg';
                    break;
                case 3:
                    stars[0].src = './imgs/books-imgs/Star-gold.svg';
                    stars[1].src = './imgs/books-imgs/Star-gold.svg';
                    stars[2].src = './imgs/books-imgs/Star-gold.svg';
                    break;
                case 4:
                    stars[0].src = './imgs/books-imgs/Star-gold.svg';
                    stars[1].src = './imgs/books-imgs/Star-gold.svg';
                    stars[2].src = './imgs/books-imgs/Star-gold.svg';
                    stars[3].src = './imgs/books-imgs/Star-gold.svg';
                    break;
                case 5:
                    stars[0].src = './imgs/books-imgs/Star-gold.svg';
                    stars[1].src = './imgs/books-imgs/Star-gold.svg';
                    stars[2].src = './imgs/books-imgs/Star-gold.svg';
                    stars[3].src = './imgs/books-imgs/Star-gold.svg';
                    stars[4].src = './imgs/books-imgs/Star-gold.svg';
                    break;
                default:
                    console.log('default');
            }
        }
        stars = [];
    });

    // shopping buttons
    const btns = Array.from(document.querySelectorAll('.books__btn'));
    const container = document.querySelector('.bag');



    // btns functions
    btns.forEach(btn => {
        // buttons are pressed when page is loaded
        if (Object.prototype.hasOwnProperty.call(localStorage, btn.id)) {
            btn.classList.add('pressed');
            btn.innerHTML = 'in the cart';
        }

        // bag has items when page is loaded
        let bagItems = `<div class="items-number">${Object.keys(localStorage).length}</div>`;
        if (Object.keys(localStorage).length > 0) {
            container.innerHTML = bagItems;
        }

        // button click event
        btn.addEventListener('click', () => {
            const idName = btn.id;
            if (!btn.classList.contains('pressed')) {
                btn.innerHTML = 'in the cart';
                btn.classList.add('pressed');
                localStorage.setItem(idName, btn.id);
            } else if (btn.classList.contains('pressed')) {
                btn.innerHTML = 'buy now';
                btn.classList.remove('pressed');
                localStorage.removeItem(idName, btn.id);
            }
            // bag items count updates when buttons are clicked
            bagItems = `<div class="items-number">${Object.keys(localStorage).length}</div>`;
            container.innerHTML = bagItems;
            if (Object.keys(localStorage).length == 0) {
                container.innerHTML = ' ';
            }
        });
    });
}

// request func
function request(url) {
    fetch(url)
        .then(response => response.json())
        .then(result => {
            const items = result.items;
            let books = [];
            items.forEach(item => {
                const volumeInfo = item.volumeInfo;
                const saleInfo = item.saleInfo;
                let bookInfo = {};
                bookInfo.id = item.id;
                bookInfo.title = volumeInfo.title;
                bookInfo.authors = volumeInfo.authors;

                if (!volumeInfo.imageLinks) {
                    bookInfo.coverUrl = 'imgs/books-imgs/download.png';
                } else {
                    bookInfo.coverUrl = volumeInfo.imageLinks.thumbnail;
                }
                bookInfo.description = volumeInfo.description;
                bookInfo.rating = volumeInfo.averageRating;
                bookInfo.reviews = volumeInfo.ratingsCount;
                if (saleInfo.saleability == 'FREE' || (saleInfo.saleability == "FOR_SALE" && saleInfo.listPrice.amount == 0)) {
                    bookInfo.price = 'free';
                    bookInfo.currency = ' ';
                } else if (saleInfo.saleability == "FOR_SALE") {
                    bookInfo.price = saleInfo.listPrice.amount;
                    bookInfo.currency = saleInfo.listPrice.currencyCode;
                } else if (saleInfo.saleability == "NOT_FOR_SALE") {
                    bookInfo.price = 'not for sale';
                    bookInfo.currency = ' ';
                }
                books.push(bookInfo);
            });
            return books;
        })
        .then(books => {
            displayBooks(books);
        });
}

// load more func 
function loadMore(bookCategory) {
    const bookCards = Array.from(document.querySelectorAll('.books__card'));
    const currentBooksAmount = bookCards.length;
    let currentUrl = `https://www.googleapis.com/books/v1/volumes?q="subject:${bookCategory}"&key=${myKey}&printType=books&startIndex=${currentBooksAmount}&maxResults=6&langRestrict=en&filter=paid-ebooks`;

    // takes care of the crafts category(doesn't have any paid e-books)
    if (bookCategory == `\n\t\t\t\t\tCrafts &amp; Hobbies\n\t\t\t\t`) {
        currentUrl = `https://www.googleapis.com/books/v1/volumes?q="subject:${bookCategory}"&key=${myKey}&printType=books&startIndex=${currentBooksAmount}&maxResults=6&langRestrict=en`;
    }
    request(currentUrl);

}

// page load
window.addEventListener('DOMContentLoaded', () => {
    // set the default category and the url template
    let currentCategory = categories[0].innerHTML;
    const defaultUrl = `https://www.googleapis.com/books/v1/volumes?q="subject:${currentCategory}"&key=${myKey}&printType=books&startIndex=0&maxResults=6&langRestrict=en&filter=paid-ebooks`;
    request(defaultUrl);
    // event listeners for categories
    categories.forEach(category => {
        const categoryName = category.innerHTML;
        let currentUrl = `https://www.googleapis.com/books/v1/volumes?q="subject:${categoryName}"&key=${myKey}&printType=books&startIndex=0&maxResults=6&langRestrict=en&filter=paid-ebooks`;
        category.addEventListener('click', () => {
            currentCategory = category.innerHTML;
            categories.forEach(item => {
                item.classList.remove('active');
            });
            category.classList.add('active');
            // reloads the book list
            booksList.innerHTML = ' ';
            // takes care of the crafts category (doesn't have any paid e-books)
            if (currentCategory == `\n\t\t\t\t\tCrafts &amp; Hobbies\n\t\t\t\t`) {
                currentUrl = `https://www.googleapis.com/books/v1/volumes?q="subject:${categoryName}"&key=${myKey}&printType=books&startIndex=0&maxResults=6&langRestrict=en`;
            }
            request(currentUrl);
        });
    });

    // load more btn
    loadBtn.addEventListener('click', () => {
        loadMore(currentCategory);
    });
});








