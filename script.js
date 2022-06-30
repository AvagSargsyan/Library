const table = document.querySelector('table');
const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const formRead = document.querySelector('#read');
const addBookBtn = document.querySelector('.add-book');
const removeAllBtn = document.querySelector('.remove-all');
const titleLabel = document.querySelector('[for="title"]');

let myLibrary = [];

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

addBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (formTitle.value !== '') {
        addBookToLibrary(formTitle.value, formAuthor.value, formPages.value, formRead.checked);
        display(myLibrary);
        formTitle.value = '';
        formAuthor.value = '';
        formPages.value = '';
        formRead.checked = false;
        titleLabel.style.color = 'rgb(37, 37, 37)';
    } else {
        titleLabel.style.color = 'red';
    }
});

display(myLibrary);
