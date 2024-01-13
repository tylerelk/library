const library = [];

function Book(title, author, numPages, haveRead, bookID) {
  this.title = `"${title}"`;
  this.author = `by ${author}`;
  this.numPages = `${numPages} pages`;
  this.haveRead = haveRead;
  this.bookID = bookID;
}

function displayBooks(arr) {
  libraryArea.innerHTML = "";
  arr.forEach((book) => {
    libraryArea.innerHTML += `<div class="book ${checkClassHandler(
      book.haveRead
    )}" data-bookID="${book.bookID}">
      <h2 class="book-title">${book.title}</h2>
      <h3 class="book-author">${book.author}</h3>
      <h3 class="book-pages">${book.numPages}</h3>
      <label for="have-read-check">Read: </label>
      <input type="checkbox" ${checkHandler(
        book.haveRead
      )} class="have-read-check">
      <button class="delete" data-bookID="${book.bookID}">Delete</button>
    </div>`;
  });
  if (libraryArea.children.length) {
    libraryArea.style.border = "1rem solid var(--dark)";
  } else {
    libraryArea.style.border = "0";
  }
}

function checkClassHandler(boolean) {
  if (boolean) {
    return "box-checked";
  }
}

function checkHandler(boolean) {
  if (boolean) {
    return "checked";
  }
}

const submit = document.querySelector("#submit");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const numPages = document.querySelector("#pages");

const libraryArea = document.querySelector(".library-area");
displayBooks(library);

submit.addEventListener("click", () => {
  let haveReadBoolean =
    document.querySelector("#have-read").value === "true" ? true : false;
  library.push(
    new Book(
      title.value,
      author.value,
      Number(numPages.value),
      haveReadBoolean,
      Number(library.length)
    )
  );
  title.value = "";
  author.value = "";
  numPages.value = "";
  displayBooks(library);
});

function deleteHandler(e) {
  let target = e.target;
  if (target.classList.contains("delete")) {
    library.splice(Number(target.dataset.bookid), 1);
  } else {
    return;
  }
  library.forEach((book) => {
    book.bookID = library.indexOf(book);
  });
  displayBooks(library);
}

function checkToggle(e) {
  let target = e.target;
  if (target.checked && target.classList.contains("have-read-check")) {
    library[target.parentNode.dataset.bookid].haveRead = true;
  } else if (!target.checked && target.classList.contains("have-read-check")) {
    library[target.parentNode.dataset.bookid].haveRead = false;
  }
  if (library[target.parentNode.dataset.bookid].haveRead) {
    target.parentNode.classList.add("box-checked");
  } else {
    target.parentNode.classList.remove("box-checked");
  }
}

document.addEventListener("click", deleteHandler);
document.addEventListener("click", checkToggle);

const navBar = document.querySelector("nav");
const bookAdd = document.querySelector(".book-add-menu");
const menuButton = document.querySelector(".book-add-expand");

menuButton.addEventListener("click", () => {
  if (menuButton.dataset.open == "open") {
    bookAdd.style.transform = "translateX(55vw)";
    menuButton.dataset.open = "closed";
  } else if (menuButton.dataset.open == "closed") {
    bookAdd.style.transform = "translateX(0vw)";
    menuButton.dataset.open = "open";
  }
});
