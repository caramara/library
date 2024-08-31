//Book class
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

}
//Library module to manage books array
const library = (function (){
  const books = [];

  const addBook = (book) => {
    books.push(book);
  };

  const removeBook = (index) => {
    books.splice(index, 1);
  };

  const getBooks = () => books;

  return {addBook, removeBook, getBooks};
})();

//BookForm module to handle input
const bookForm = ( function(){
  const createBook = () => {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;

    const book = new Book(title, author, pages, read);
    library.addBook(book);
    return book;
  };
  const clearInput = () => {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
    document.querySelector('#read').checked = false;
  };
  const validateText = () => {
    //To-Do: validate text
  };
  const validateNumber = () =>{
    //To-Do: validate numbers
  };
  return {createBook, clearInput}
})();

//bookTable module to render the library in a table format
const bookTable = ( function(){
  const renderBooks = (books)=>{
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = "";
    books.forEach((book, index) => {
      const row = document.createElement("tr");
      const titleCell = document.createElement("td");
      const authorCell = document.createElement("td");
      const pagesCell = document.createElement("td");
      const readCell = document.createElement("td");
      const ActionCell = document.createElement("td");

      titleCell.textContent = book.title;
      authorCell.textContent = book.author;
      pagesCell.textContent = book.pages;
      readCell.textContent = book.read ? "Yes" : "No";

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", () => {
        // Remove book from library and re-render table
        library.removeBook(index);
        renderBooks(library.getBooks());
      });

      const readButton = document.createElement("button");
      readButton.textContent = (book.read) ? "To-Read" : "Read";
      readButton.classList.add("read-btn");
      readButton.addEventListener("click", () => {
        // Change read status and re-render table
        book.read = !book.read;
        renderBooks(library.getBooks());
      });

      ActionCell.appendChild(readButton);
      ActionCell.appendChild(deleteBtn);

      row.appendChild(titleCell);
      row.appendChild(authorCell);
      row.appendChild(pagesCell);
      row.appendChild(readCell);
      row.appendChild(ActionCell);

      tableBody.appendChild(row);
    });
    
  };
  return {renderBooks};

})();

//Render the webpage elements
const renderWebpage = ( function (){
  const sideBar = document.querySelector("#side-bar");
  const toggleSideBar = document.querySelectorAll("#show-sidebar-btn, #close-btn");
  
  toggleSideBar.forEach(button => {
    button.addEventListener("click", () => {
        sideBar.classList.toggle("hidden");
    })
  });

   //Add new book to table body and add it to array
  sideBar.addEventListener("click", (event) => {
  if(event.target.id === 'add-book-btn') {
    bookForm.createBook();
    bookTable.renderBooks(library.getBooks());
    bookForm.clearInput();
  }
  });
})();