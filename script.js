const submitButton = document.querySelector("#add-button");
const bookList = document.querySelector("#books");

//form inputs
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const isReadInput = document.querySelector("#is_read");
const form = document.querySelector("#form");

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

mylibrary.forEach(addBookListElement);

submitButton.addEventListener("click", addBookToLibrary);

function addBookToLibrary(e) {
	if (isFormInvalid()) {
		console.log("form invalicd");
		return;
	}
	e.preventDefault(e);
	const book = new Book(
		titleInput.value,
		authorInput.value,
		+pagesInput.value,
		isReadInput.checked
	);
	mylibrary.push(book);
	addBookListElement(book);
	form.reset();
}

function addBookListElement(book) {
	let listItem = document.createElement("li");
	listItem.textContent = book.info();
	bookList.appendChild(listItem);
}

function isFormInvalid() {
	if (titleInput.value == "") return true;
	if (authorInput.value == "") return true;
	if (pagesInput.value == "") return true;
	return false;
}
