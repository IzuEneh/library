const submitButton = document.querySelector("#add-button");
const bookList = document.querySelector("#books");

//form inputs
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const isReadInput = document.querySelector("#is_read");
const form = document.querySelector("#form");

let mylibrary = [
	// new Book("the hobbit", "J.R.R Tolkien", 295, false),
	// new Book("the hobbit 2", "J.R.R Tolkien", 295, false),
	// new Book("Head first design patterns", "Freeman", 500, true),
];

function Book(title, author, pages, isRead) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.isRead = isRead;
}

Book.prototype.toggleRead = function () {
	this.isRead = !this.isRead;
};

Book.prototype.info = function () {
	const bookCard = document.createElement("div");
	bookCard.classList.add("book-card");

	const title = document.createElement("h2");
	title.classList.add("book-tile");
	title.textContent = this.title;
	bookCard.appendChild(title);

	const author = createSpanElement(`author: ${this.author}`, ["author"]);
	bookCard.appendChild(author);

	const pages = createSpanElement(`${this.pages} pages`, ["page-number"]);
	bookCard.appendChild(pages);

	const isReadSpan = createSpanElement(this.isRead ? "read" : "not read", [
		"is-read-field",
		this.isRead ? "read" : "not-read",
	]);
	bookCard.appendChild(isReadSpan);

	bookCard.appendChild(createButtonBar(this));

	return bookCard;
};

mylibrary.forEach(addBookListElement);

submitButton.addEventListener("click", addBookToLibrary);

function createButtonBar(book) {
	const buttonBar = document.createElement("div");
	buttonBar.classList.add("button-bar");

	const deleteButton = document.createElement("button");
	deleteButton.textContent = "remove";
	deleteButton.classList.add("delete-button", "button");
	deleteButton.addEventListener("click", deleteBook);
	buttonBar.appendChild(deleteButton);

	const readButton = document.createElement("button");
	readButton.textContent = book.isRead ? "forget" : "read";
	readButton.classList.add("read-button", "button");
	readButton.addEventListener("click", toggleReadStatus);
	buttonBar.appendChild(readButton);

	return buttonBar;
}

function createSpanElement(textContent, classes) {
	const span = document.createElement("span");
	span.classList.add(...classes);
	span.textContent = textContent;
	return span;
}

function deleteBook(e) {
	const button = e.srcElement;
	const index = button.parentNode.dataset.index;
	mylibrary.splice(+index, 1);
	bookList.textContent = "";
	mylibrary.forEach(addBookListElement);
}

function toggleReadStatus(e) {
	// console.log(e);
	const index = +e.srcElement.parentNode.parentNode.dataset.index;
	const book = mylibrary[index];
	book.toggleRead();
	mylibrary.splice(index, 1, book);
	bookList.textContent = "";
	mylibrary.forEach(addBookListElement);
}

function addBookToLibrary(e) {
	if (isFormInvalid()) {
		return;
	}
	e.preventDefault(e);
	const book = new Book(
		titleInput.value,
		authorInput.value,
		+pagesInput.value,
		isReadInput.checked
	);
	addBookListElement(book, mylibrary.length);
	mylibrary.push(book);
	form.reset();
}

function addBookListElement(book, index) {
	let listItem = document.createElement("li");
	const bookCard = book.info();
	bookCard.setAttribute("data-index", index);

	listItem.appendChild(bookCard);
	bookList.appendChild(listItem);
}

function isFormInvalid() {
	if (titleInput.value == "") return true;
	if (authorInput.value == "") return true;
	if (pagesInput.value == "") return true;
	return false;
}
