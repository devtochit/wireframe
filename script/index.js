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
    dynamic_load();
    // location.reload()

}

function removebook(title, author) {
    books = books.filter(book => {
        if (book.title != title && book.author != author)
            return true

    });
}


// for (let i = 0; i < removeButton.length; i += 1) {
//     removeButton[i].addEventListener("click", function(event) {
//         console.log(event.target);
//         const buttonArray = Array.from(removeButton).indexOf(event.target);
//         const titleArray = Array.from(bookTitle).indexOf(event.target);
//         const authorArray = Array.from(authorName).indexOf(event.target);
//     });
// }



dynamic_load();
// removebook("ABC Murders", "Agatha Christie")

// add_book("Name of the book", "Author of the book");
// add_book("Name of the second book", "Author of the second book");
// console.log(books.length);
//console.log(books[3].title);
// removebook("Name of the book", "Author of the book");

function dynamic_load() {
    const h1 = document.querySelector("h1");
    // if (document.getElementsByClassName("outputcard")) {
    //     bookWrapper.remove();
    // }
    // const bookWrapper = document.createElement('div');
    // h1.insertAdjacentElement('afterend', bookWrapper);

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
        button.className = "remove_btn_" + i;
        button.type = "button";
        button.innerText = "Remove";
        div.appendChild(button);
        const hr = document.createElement("hr");
        div.appendChild(hr);
        // bookWrapper.insertAdjacentElement('afterend', div);
        h1.insertAdjacentElement('afterend', div);
    }

}

const removeButton = document.querySelectorAll("button");
const bookTitle = document.querySelectorAll(".book-title");
const authorName = document.querySelectorAll(".author-name");
removeButton.forEach(btn => btn.addEventListener('click', (e) => {
    const title = document.querySelector(".book-title_" + e.target.classList[0].substr(11));
    const author = document.querySelector(".author-name_" + e.target.classList[0].substr(11));
    removebook(title.innerText, author.innerText);
}));


