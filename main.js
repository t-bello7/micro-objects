/* eslint max-classes-per-file: ["error", 2] */

const addBookForm = document.querySelector('.add-book-form');
const bookContainer = document.querySelector('.books');
const bookForminputs = [...addBookForm.elements];
const mainSection = document.querySelector('.main-section');
const links = document.querySelectorAll('.link');

const linkarr = [...links];
const sections = [...mainSection.children];
linkarr.forEach((element, index) => {
  const index1 = index;
  element.addEventListener('click', () => {
    sections.forEach((element, index) => {
      if (index1 == index) {
        element.classList.remove('not-visible');
      } else {
        element.classList.add('not-visible');
      }
    });
  });
});

let title;
let author;

const renderElements = (arr, container) => {
  container.innerHTML = '';
  arr.forEach((element, index) => {
    container.innerHTML += `
          <div class="book-element">
            <h2>${element.title}</h2>
            <p>${element.author}</p>
            <button type="button" data-id=${index} class="btn-rm"> Remove </button>
          </div>`;
  });
};

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookList {
  static getBooks = () => {
    let bookList = [];
    if (localStorage.getItem('bookList') != null) {
      bookList = JSON.parse(localStorage.getItem('bookList'));
    }
    return bookList;
  }

  static addBook = (book) => {
    const bookList = BookList.getBooks();
    bookList.push(book);
    localStorage.setItem('bookList', JSON.stringify(bookList));
  }

  static removeBook = (index) => {
    let bookList = BookList.getBooks();
    bookList = bookList.filter((element) => element !== bookList[index]);
    renderElements(bookList, bookContainer);
    localStorage.setItem('bookList', JSON.stringify(bookList));
  };
}

bookForminputs.forEach((element) => {
  if (element.name === 'title') {
    element.addEventListener('change', (e) => {
      title = e.target.value;
    });
  }
  if (element.name === 'author') {
    element.addEventListener('change', (e) => {
      author = e.target.value;
    });
  }
});

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const book = new Book(title, author);
  BookList.addBook(book);
  addBookForm.submit();
});

const bookList = BookList.getBooks();
renderElements(bookList, bookContainer);

bookContainer.addEventListener('click', (e) => {
  const removeBtn = e.target.closest('.btn-rm');
  BookList.removeBook(removeBtn.getAttribute('data-id'));
});