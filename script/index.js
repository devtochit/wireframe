const inputTitle = document.getElementById('title');
const inputName = document.getElementById('name');
const body = document.querySelector('body');
const newBook = document.querySelector('.new_book');
const menuList = document.querySelector('.menu_list');
const menuAddNew = document.querySelector('.menu_add_new');
const menuContact = document.querySelector('.menu_contact');
const contact = document.querySelector('.contact');
const addNew = document.querySelector('.add_new');

const d = new Date();
document.querySelector('.currentdate').innerHTML = d;

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

  size() {
    return this.books.length;
  }

  nthTitle(num) {
    return this.books[num].title;
  }

  nthAuthor(num) {
    return this.books[num].author;
  }
}

const awesomeBooks = new Awesome();

function populateStorage() {
  bookAwesome.title = inputTitle.value;
  bookAwesome.author = inputName.value;
  bookAwesome.bookList = awesomeBooks.books;
  const storeData = JSON.stringify(bookAwesome);
  localStorage.setItem('data', storeData);
}

function dynamicLoad() {
  const currentdate = document.querySelector('.currentdate');

  if (document.querySelector('.book_wrapper')) {
    body.removeChild(document.querySelector('.book_wrapper'));
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'book_wrapper';
  wrapper.id = 'list';
  const h1 = document.createElement('h1');
  h1.innerText = 'All awesome books';
  wrapper.appendChild(h1);

  for (let i = 0; i < awesomeBooks.size(); i += 1) {
    const div = document.createElement('div');
    div.className = 'outputcard';
    const p0 = document.createElement('p');
    p0.className = 'list-books';
    p0.innerText = `"${awesomeBooks.nthTitle(i)}" by ${awesomeBooks.nthAuthor(i)}`;
    div.appendChild(p0);
    const p1 = document.createElement('p');
    p1.className = `book-title_${i}`;
    p1.innerText = awesomeBooks.nthTitle(i);
    div.appendChild(p1);
    const p2 = document.createElement('p');
    p2.className = `author-name_${i}`;
    p2.innerText = awesomeBooks.nthAuthor(i);
    div.appendChild(p2);
    const button = document.createElement('button');
    button.className = `remove_btn_${i} remove_btn`;
    button.type = 'button';
    button.innerText = 'Remove';
    div.appendChild(button);
    wrapper.appendChild(div);
  }
  currentdate.insertAdjacentElement('afterend', wrapper);
  const removeButton = document.querySelectorAll('.remove_btn');

  removeButton.forEach((btn) => btn.addEventListener('click', (e) => {
    const title = document.querySelector(`.book-title_${e.target.classList[0].substr(11)}`);
    const author = document.querySelector(`.author-name_${e.target.classList[0].substr(11)}`);
    awesomeBooks.remove(title.innerText, author.innerText);
    populateStorage();
    dynamicLoad();
  }));

  menuList.addEventListener('click', () => {
    dynamicLoad();
    if (!addNew.classList.contains('inactive')) {
      addNew.classList.add('inactive');
    }
    if (!contact.classList.contains('inactive')) {
      contact.classList.add('inactive');
    }
  });
}

newBook.addEventListener('click', () => {
  awesomeBooks.add(inputTitle.value, inputName.value);
  populateStorage();
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

menuAddNew.addEventListener('click', () => {
  const bookWrapper = document.querySelector('.book_wrapper');
  addNew.classList.remove('inactive');

  if (!contact.classList.contains('inactive')) {
    contact.classList.add('inactive');
  }
  if (!bookWrapper.classList.contains('inactive')) {
    bookWrapper.classList.add('inactive');
  }
});

menuContact.addEventListener('click', () => {
  const bookWrapper = document.querySelector('.book_wrapper');
  contact.classList.remove('inactive');
  if (!addNew.classList.contains('inactive')) {
    addNew.classList.add('inactive');
  }
  if (!bookWrapper.classList.contains('inactive')) {
    bookWrapper.classList.add('inactive');
  }
});

if (!localStorage.getItem('data')) {
  populateStorage();
} else {
  populateBookForm();
}

dynamicLoad();
