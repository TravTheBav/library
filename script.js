// stores all books
let myLibrary = [];

// form and form fields
let form = document.getElementById('book-form');
let titleField = document.getElementById('title');
let authorField = document.getElementById('author');
let pagesField = document.getElementById('pages');
let readCheckBox = document.getElementById('read');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    addBookToLibrary();
    wipeForm();
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {    
    const book = new Book(
        titleField.value,
        authorField.value,
        pagesField.value,
        readCheckBox.checked
    );
    myLibrary.push(book);
    updateTable(book);
}

function wipeForm() {
    titleField.value = "";
    authorField.value = "";
    pagesField.value = "";
    readCheckBox.checked = false;
}

function updateTable(book) {
    let table = document.getElementById('books-table');
    let row = table.insertRow();
    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let readCell = row.insertCell(3);
    titleCell.innerHTML = book.title;
    authorCell.innerHTML = book.author;
    pagesCell.innerHTML = book.pages;
    if (book.read) {
        readCell.innerHTML = 'Yes';
    }  else  {
        readCell.innerHTML = 'No';
    }    
}