const inputTitle = document.getElementById("title")
const inputName = document.getElementById("name")



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
    window.location.reload()
}

function removebook(title, author) {
    books = books.filter(book => {
        if (book.title != title && book.author != author)
            return true

    });
}

// removebook("ABC Murders", "Agatha Christie")

// add_book("Name of the book", "Author of the book");
// add_book("Name of the second book", "Author of the second book");
// console.log(books.length);
//console.log(books[3].title);
// removebook("Name of the book", "Author of the book");

const h1 = document.querySelector("h1");
for (let i = 0; i < books.length; i += 1) {
    const div = document.createElement("div");
    div.className = "outputcard";
    const p1 = document.createElement("p");
    p1.className = "book-title";
    p1.innerText = books[i].title;
    div.appendChild(p1);
    const p2 = document.createElement("p");
    p2.className = "author-name";
    p2.innerText = books[i].author;
    div.appendChild(p2);
    const button = document.createElement("button");
    button.type = "button";
    button.innerText = "Remove";
    div.appendChild(button);
    const hr = document.createElement("hr");
    div.appendChild(hr);
    h1.insertAdjacentElement('afterend', div);
}



