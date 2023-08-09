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

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    if (this.read) {
        this.read = false;
    }   else  {
        this.read = true;
    }
}

// Adds book to the library array and table
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

function updateTable(book) {
    let table = document.getElementById('books-table');
    let row = addTableRow(book, table);
    addBookDeleteButton(row);
    addBookReadToggle(row);
}

function addTableRow(book, table) {
    let row = table.insertRow();
    row.dataset.bookIndex = myLibrary.findIndex((ele) => ele == book);
    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let readCell = row.insertCell(3);
    readCell.classList.add('read');
    titleCell.innerHTML = book.title;
    authorCell.innerHTML = book.author;
    pagesCell.innerHTML = book.pages;
    if (book.read) {
        readCell.innerHTML = 'Yes';
    }  else  {
        readCell.innerHTML = 'No';
    }
    return row;
}

function addBookDeleteButton(row) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener('click', function (e) {
        const index = this.parentNode.dataset.bookIndex;
        myLibrary[index] = undefined;
        row.remove();
    });
    row.appendChild(deleteButton);
}

function addBookReadToggle(row) {
    const readToggle = document.createElement("button");
    readToggle.textContent = 'toggle read';
    readToggle.addEventListener('click', function (e) {
        const index = this.parentNode.dataset.bookIndex;
        myLibrary[index].toggleRead();
        readCell = row.querySelector('.read');
        updateReadCell(readCell);
    });
    row.appendChild(readToggle);
}

// updates the read cell for a book in the books table whenever a books read status is toggled
function updateReadCell(cell) {
    if (cell.innerHTML == 'Yes') {
        cell.innerHTML = 'No'
    }   else  {
        cell.innerHTML = 'Yes'
    }
}

// Clears book form
function wipeForm() {
    titleField.value = "";
    authorField.value = "";
    pagesField.value = "";
    readCheckBox.checked = false;
}