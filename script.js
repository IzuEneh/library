const addButton = document.querySelector("#add-button");
const bookList = document.querySelector("#books");

let mylibrary = [
	new Book("the hobbit", "J.R.R Tolkien", 295, false),
	new Book("the hobbit 2", "J.R.R Tolkien", 295, false),
	new Book("Head first design patterns", "Freeman", 500, true),
];

function Book(title, author, pages, isRead) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.isRead = isRead;
}

Book.prototype.info = function () {
	return `${this.title} by ${this.author}, ${this.pages} pages, ${
		this.isRead ? "has been read" : "not read yet"
	}`;
};

function addBookToLibrary() {
	// take form controls
	// create book object
	// add to my library
	// mylibrary.push(new Book(book.title, book.author, book.pages, book.isRead));
}

mylibrary.forEach((element) => {
	let listItem = document.createElement("li");
	listItem.textContent = element.info();
	bookList.appendChild(listItem);
});
