const myLibrary = [];

const addBookBtn = document.querySelector("#add-book-btn");
const sideBar = document.querySelector("#side-bar");
const toggleSideBar = document.querySelectorAll("#show-sidebar-btn, #close-btn");
const tableBody = document.querySelector("tbody");

//Show/Hide sidebar when pressing either the add book or X button
toggleSideBar.forEach(button => {
    button.addEventListener("click", () => {
        sideBar.classList.toggle("hidden");
    })
});

//Add new book to table body and add it to array
sideBar.addEventListener("click", (event) => {
    if(event.target.id === 'add-book-btn') addBookToLibrary();
});

//Book constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => `${this.title} by ${this.author}, ${this.pages} pages, ${this.read? "read": "not read yet"}`; 
}

function addBookToLibrary(){
    //Extract input from the user
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector('#read').checked;

    //Initialize a new book object using the constructor and push it to the myLibrary array
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    console.table(myLibrary);

    //Clear input fields
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
    document.querySelector('#read').checked = false;

    //Generate new table
    generateTable();

}

function generateTable() {
    tableBody.innerHTML = ""; // Clear the table body
    myLibrary.forEach((book, index) => {
      //Create new table row and cells to contain all the book information
      const row = document.createElement("tr");
      const titleCell = document.createElement("td");
      const authorCell = document.createElement("td");
      const pagesCell = document.createElement("td");
      const readCell = document.createElement("td");
      const deleteCell = document.createElement("td");
        
      //Extract the book information from the book object and add it to the table cells
      titleCell.textContent = book.title;
      authorCell.textContent = book.author;
      pagesCell.textContent = book.pages;
      readCell.textContent = book.read ? "Yes" : "No";
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-btn");
      deleteButton.addEventListener("click", () => {
        myLibrary.splice(index, 1);
        console.table(myLibrary);
        generateTable(); // Regenerate the table after deletion
      });
      
      //Append the table cells to the table row, and table row to table body
      deleteCell.appendChild(deleteButton);
  
      row.appendChild(titleCell);
      row.appendChild(authorCell);
      row.appendChild(pagesCell);
      row.appendChild(readCell);
      row.appendChild(deleteCell);
  
      tableBody.appendChild(row);
    });
  }

  function generateTable() {
    tableBody.innerHTML = ""; // Clear the table body
    myLibrary.forEach((book, index) => {
      const row = document.createElement("tr");
      const titleCell = document.createElement("td");
      const authorCell = document.createElement("td");
      const pagesCell = document.createElement("td");
      const readCell = document.createElement("td");
      const deleteCell = document.createElement("td");
  
      titleCell.textContent = book.title;
      authorCell.textContent = book.author;
      pagesCell.textContent = book.pages;
      readCell.textContent = book.read ? "Yes" : "No";
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", () => {
        myLibrary.splice(index, 1);
        generateTable(); // Regenerate the table after deletion
        console.table(myLibrary);
      });
  
      deleteCell.appendChild(deleteBtn);
  
      row.appendChild(titleCell);
      row.appendChild(authorCell);
      row.appendChild(pagesCell);
      row.appendChild(readCell);
      row.appendChild(deleteCell);
  
      tableBody.appendChild(row);
    });
  }