let myLibrary = [{
    title: 'Book one',
    author: 'Someone',
    pages: '220',
    read: false
},
{
    title: 'Book 2',
    author: 'Someone',
    pages: '190',
    read: true
},
{
    title: 'Book 3',
    author: 'Someone',
    pages: '400',
    read: false
},
{
    title: 'Book 4',
    author: 'Someone',
    pages: '370',
    read: true
},
{
    title: 'Book 5',
    author: 'Someone',
    pages: '195',
    read: true
}];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
};

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

console.log(myLibrary);
