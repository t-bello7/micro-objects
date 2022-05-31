const addBookForm = document.querySelector('.add-book-form');
const bookContainer = document.querySelector('.books');

let bookCollection = [];
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

if (JSON.parse(localStorage.getItem('bookCollection')) != null) {
  bookCollection = JSON.parse(localStorage.getItem('bookCollection'));
}

renderElements(bookCollection, bookContainer);

const book = {};
const bookForminputs = [...addBookForm.elements];
bookForminputs.forEach((element) => {
  if (element.name === 'title') {
    element.addEventListener('change', (e) => {
      book.title = e.target.value;
    });
  }
  if (element.name === 'author') {
    element.addEventListener('change', (e) => {
      book.author = e.target.value;
    });
  }
});

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  bookCollection.push(book);
  localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
  addBookForm.submit();
});
// remove functionality

const removeElement = (item) => {    // eslint-disable-line
  bookCollection = bookCollection.filter((element) => element !== bookCollection[item.getAttribute('data-id')]);
  renderElements(bookCollection, bookContainer);
  localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
};
