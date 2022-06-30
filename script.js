const table = document.querySelector('table');
const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const formRead = document.querySelector('#read');
const addBookBtn = document.querySelector('.add-book');

let myLibrary = [
    {
        title: 'Book one',
        author: 'Someone',
        pages: '220',
        read: false,
        isDisplayed: false
    }
];

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
    arr.forEach(book => {
        if (book.isDisplayed === false) {
            const row = document.createElement('tr');
            const title = document.createElement('td');
            const author = document.createElement('td');
            const pages = document.createElement('td');
            const status = document.createElement('td');
            const remove = document.createElement('td');
    
            const statusBtn = document.createElement('button');
            if (book.read === true) {
                statusBtn.textContent = 'Read';
            } else {
                statusBtn.textContent = 'Not read';
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

            // removeBtn.addEventListener('click', (e) => {
            //     book.removable = true;
            //     myLibrary.filter(bk => !(book.removable));
            //     display(myLibrary);
            // });
        }
    });
}

addBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary(formTitle.value, formAuthor.value, formPages.value, formRead.checked);
    display(myLibrary);
});

display(myLibrary);

console.log(myLibrary);
