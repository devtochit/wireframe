const books = [{
    title : "ABC Murders",
    author : "Agatha Christie",
}, {
    title : "Origin",
    author : "Dan Brown",
}];

function book(title, author) {
    this.title = title;
    this.author = author;
}

function add_book(title, author) {
    const book1 = new book(title, author);
    books.push(book1);
}

add_book("Name of the book", "Author of the book");
add_book("Name of the second book", "Author of the second book");
console.log(books.length);
console.log(books[3].title);
