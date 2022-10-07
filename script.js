const table = document.querySelector('table');

const form = document.querySelector('.sidebar form')
const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const errorMsg = document.querySelector('.error');

const formRead = document.querySelector('#read');
const removeAllBtn = document.querySelector('.remove-all');
const titleLabel = document.querySelector('[for="title"]');

let myLibrary = [];

// Create a Book using a Book constructor
/*
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.isDisplayed = false;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
};
*/

// Create a Book using ES6 class syntax
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.isDisplayed = false;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`
  }
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function display(arr) {
  arr.forEach((book, i) => {
    if (book.isDisplayed === false) {
      const row = document.createElement('tr');
      const title = document.createElement('td');
      const author = document.createElement('td');
      const pages = document.createElement('td');
      const status = document.createElement('td');
      const remove = document.createElement('td');

      const statusBtn = document.createElement('button');
      if (book.read) {
        statusBtn.textContent = 'Read';
        statusBtn.style.backgroundColor = 'green';
      } else {
        statusBtn.textContent = 'Not read';
        statusBtn.style.backgroundColor = 'red';
      }
      statusBtn.classList.add('status-btn');

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.classList.add('remove-btn');

      remove.appendChild(removeBtn);
      status.appendChild(statusBtn);

      title.innerText = book.title;
      author.innerText = book.author;
      pages.innerText = book.pages;

      table.appendChild(row);
      table.appendChild(title);
      table.appendChild(author);
      table.appendChild(pages);
      table.appendChild(status);
      table.appendChild(remove);

      book.isDisplayed = true;

      removeBtn.addEventListener('click', e => {
        let newLib = myLibrary.filter(b => b !== book);
        title.remove();
        author.remove();
        pages.remove();
        status.remove();
        remove.remove();

        myLibrary = newLib;
        display(myLibrary);
        console.log(myLibrary);
      });

      statusBtn.addEventListener('click', e => {
        book.read = !(book.read);
        if (statusBtn.innerText === 'Read') {
          statusBtn.innerText = 'Not read';
          statusBtn.style.backgroundColor = 'red';
        } else {
          statusBtn.innerText = 'Read';
          statusBtn.style.backgroundColor = 'green';
        }
      });

      removeAllBtn.addEventListener('click', e => {
        myLibrary = [];
        display(myLibrary);
        console.log('hi');

        title.remove();
        author.remove();
        pages.remove();
        status.remove();
        remove.remove();
      });
    }
  });
}

function showError() {
  errorMsg.textContent = 'Please fill out all fields!';
}

function showInvalid(...args) {
  args.forEach(arg => {
    if (!(arg.validity.valid)) {
      arg.classList.add('invalid-input');
    } else {
      arg.classList.remove('invalid-input');
    }
  })
}

function isValid() {
  showInvalid(formTitle, formAuthor, formPages);
  if (formTitle.checkValidity() && formAuthor.checkValidity() && formPages.checkValidity()) {
    errorMsg.textContent = '';
    return true;
  }
  showError();
  return false;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (isValid()) {
    addBookToLibrary(formTitle.value, formAuthor.value, formPages.value, formRead.checked);
    display(myLibrary);
    formTitle.value = '';
    formAuthor.value = '';
    formPages.value = '';
    formRead.checked = false;
    titleLabel.style.color = 'rgb(37, 37, 37)';
  }
});

display(myLibrary);
