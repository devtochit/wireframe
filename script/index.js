const inputTitle = document.getElementById('title');
const inputName = document.getElementById('name');
const body = document.querySelector('body');
const newBook = document.querySelector('.new_book');

const bookAwesome = {
  title: '',
  author: '',
  bookList: [],
};

class Awesome {
  constructor() {
    this.books = [];
  }

  add(tit, aut) {
    this.books.push({ title: tit, author: aut });
  }

  remove(tit, aut) {
    this.books = this.books.filter((book) => {
      if (book.title !== tit && book.author !== aut) {
        return true;
      }
      return false;
    });
  }
}

const awesomeBooks = new Awesome();
awesomeBooks.add('ABC Murders', 'Agatha Christie');
awesomeBooks.add('Origin', 'Dan Brown');

function populateStorage() {
  bookAwesome.title = inputTitle.value;
  bookAwesome.author = inputName.value;
  bookAwesome.bookList = awesomeBooks.books;
  const storeData = JSON.stringify(bookAwesome);
  localStorage.setItem('data', storeData);
}

function dynamicLoad() {
  const h1 = document.querySelector('h1');

  if (document.querySelector('.book_wrapper')) {
    body.removeChild(document.querySelector('.book_wrapper'));
  }

  const bookWrapper = document.createElement('div');
  bookWrapper.className = 'book_wrapper';

  for (let i = 0; i < awesomeBooks.books.length; i += 1) {
    const div = document.createElement('div');
    div.className = 'outputcard';
    const p0 = document.createElement('p');
    p0.className = 'list-books';
    p0.innerText = `"${awesomeBooks.books[i].title}" by ${awesomeBooks.books[i].author}`;
    div.appendChild(p0);
    const p1 = document.createElement('p');
    p1.className = `book-title_${i}`;
    p1.innerText = awesomeBooks.books[i].title;
    div.appendChild(p1);
    const p2 = document.createElement('p');
    p2.className = `author-name_${i}`;
    p2.innerText = awesomeBooks.books[i].author;
    div.appendChild(p2);
    const button = document.createElement('button');
    button.className = `remove_btn_${i} remove_btn`;
    button.type = 'button';
    button.innerText = 'Remove';
    div.appendChild(button);
    bookWrapper.appendChild(div);
  }
  h1.insertAdjacentElement('afterend', bookWrapper);
  const removeButton = document.querySelectorAll('.remove_btn');
  removeButton.forEach((btn) => btn.addEventListener('click', (e) => {
    const title = document.querySelector(`.book-title_${e.target.classList[0].substr(11)}`);
    const author = document.querySelector(`.author-name_${e.target.classList[0].substr(11)}`);
    awesomeBooks.remove(title.innerText, author.innerText);
    populateStorage();
    dynamicLoad();
  }));
}

newBook.addEventListener('click', () => {
  awesomeBooks.add(inputTitle.value, inputName.value);
  populateStorage();
  dynamicLoad();
});

function populateBookForm() {
  const currentBook = JSON.parse(localStorage.getItem('data'));
  inputTitle.value = currentBook.title;
  inputName.value = currentBook.author;
  awesomeBooks.books = currentBook.bookList;
}

inputTitle.addEventListener('input', () => {
  populateStorage();
});

inputName.addEventListener('input', () => {
  populateStorage();
});

if (!localStorage.getItem('data')) {
  populateStorage();
} else {
  populateBookForm();
}

dynamicLoad();
