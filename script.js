const submitButton = document.querySelector("#add-button");
const bookList = document.querySelector("#books");

//form inputs
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const isReadInput = document.querySelector("#is_read");
const form = document.querySelector("#form");

let mylibrary = [
	new Book(0, "the hobbit", "J.R.R Tolkien", 295, false),
	new Book(1, "the hobbit 2", "J.R.R Tolkien", 295, false),
	new Book(2, "Head first design patterns", "Freeman", 500, true),
];

function Book(index, title, author, pages, isRead) {
	this.index = index;
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.isRead = isRead;
}

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

	const deleteButton = document.createElement("button");
	deleteButton.textContent = "remove";
	deleteButton.classList.add("delete-button");
	deleteButton.setAttribute("data-index", this.index);
	deleteButton.addEventListener("click", deleteBook);
	bookCard.appendChild(deleteButton);

	return bookCard;
};

mylibrary.forEach(addBookListElement);

submitButton.addEventListener("click", addBookToLibrary);

function createSpanElement(textContent, classes) {
	const span = document.createElement("span");
	span.classList.add(...classes);
	span.textContent = textContent;
	return span;
}

function deleteBook(e) {
	console.log(e);
	const button = e.srcElement;
	const index = button.parentNode.dataset.index;
	mylibrary.splice(+index, 1);
	bookList.textContent = "";
	mylibrary.forEach(addBookListElement);
}

function addBookToLibrary(e) {
	if (isFormInvalid()) {
		return;
	}
	e.preventDefault(e);
	const book = new Book(
		mylibrary.length,
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
