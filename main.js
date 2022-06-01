const addBookForm = document.querySelector('.add-book-form');
const bookContainer = document.querySelector('.books');
const bookForminputs = [...addBookForm.elements];
let title;
let author;

class Book{  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookList{
  static getBooks = () =>{
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
  
  static removeElement = (item) => {    // eslint-disable-line
    const bookList = BookList.getBooks();
    bookList = bookList.filter((element) => element !== bookList[item.getAttribute('data-id')]);
    renderElements(bookList, bookContainer);
    localStorage.setItem('bookList', JSON.stringify(bookList));
  };
}
// let bookList = BookList.getBooks();
// renderElements(bookList, bookContainer);

const renderElements = (arr, container) => {
  container.innerHTML = '';
  arr.forEach((element, index) => {
    container.innerHTML += `
          <div>
            <h2>${element.title}</h2>
            <p>${element.author}</p>
            <button type="button" data-id=${index} onclick='removeElement(this)'> Remove </button>
          </div>`;
  });
};

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
// remove functionality
// add eventlister on the remove button
// BookList.removeBook(item)