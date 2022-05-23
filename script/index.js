const inputTitle = document.getElementById("title")
const inputName = document.getElementById("name")
const body = document.querySelector("body");

let books = [{
    title: "ABC Murders",
    author: "Agatha Christie",
}, {
    title: "Origin",
    author: "Dan Brown",
}];

function book(title, author) {
    this.title = title;
    this.author = author;
}

function add_book(title, author) {
    const book1 = new book(title, author);
    books.push(book1);

}
function addNew() {
    add_book(inputTitle.value, inputName.value)
    dynamic_load();

}

function removebook(title, author) {
    books = books.filter(book => {
        if (book.title != title && book.author != author)
            return true
    });
}

dynamic_load();

function dynamic_load() {
    const h1 = document.querySelector("h1");

    if (document.querySelector(".book_wrapper")) {
        body.removeChild(document.querySelector(".book_wrapper"))
    }

    const bookWrapper = document.createElement('div');
    bookWrapper.className = "book_wrapper";

    for (let i = 0; i < books.length; i += 1) {
        const div = document.createElement("div");
        div.className = "outputcard";
        const p1 = document.createElement("p");
        p1.className = "book-title_" + i;
        p1.innerText = books[i].title;
        div.appendChild(p1);
        const p2 = document.createElement("p");
        p2.className = "author-name_" + i;
        p2.innerText = books[i].author;
        div.appendChild(p2);
        const button = document.createElement("button");
        button.className = "remove_btn_" + i + " remove_btn";
        button.type = "button";
        button.innerText = "Remove";
        div.appendChild(button);
        const hr = document.createElement("hr");
        div.appendChild(hr);
        bookWrapper.appendChild(div);

    }
    h1.insertAdjacentElement('afterend', bookWrapper);
    const removeButton = document.querySelectorAll(".remove_btn");
    removeButton.forEach(btn => btn.addEventListener('click', (e) => {
        const title = document.querySelector(".book-title_" + e.target.classList[0].substr(11));
        const author = document.querySelector(".author-name_" + e.target.classList[0].substr(11));
        removebook(title.innerText, author.innerText);
        dynamic_load();
    }));
}

const book_awesome = {
    title: '',
    author: '',
    bookList: []
};

function populateBookForm() {
    const currentBook = JSON.parse(localStorage.getItem('data'));
    inputTitle.value = currentBook.title;
    inputName.value = currentBook.author;
    books = currentBook.bookList

}

function populateStorage() {
    book_awesome.title = inputTitle.value;
    book_awesome.author = inputName.value;
    book_awesome.bookList = books
    const storeData = JSON.stringify(book_awesome);
    localStorage.setItem('data', storeData);


}

if (!localStorage.getItem('data')) {
    populateStorage();
} else {
    populateBookForm();
}

inputTitle.addEventListener('input', () => {
    populateStorage();
});

inputName.addEventListener('input', () => {
    populateStorage();
});
