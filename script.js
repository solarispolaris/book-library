
function Book(bookTitle, bookAuthor, bookGenre, bookLength, bookRead){
    this.title = bookTitle;
    this.author = bookAuthor;
    this.genre = bookGenre;
    this.pageLength = bookLength;
    this.hasRead = bookRead;
}

let bookLibrary = [];






//open/close sidebar functions
function closeSidebar(){
    const wrapper = document.querySelector(".sidebar");
    wrapper.style.width = "0";
}

function openSidebar(){
    const wrapper = document.querySelector(".sidebar");
    const bookForm = document.querySelector("form");
    bookForm.reset();
    wrapper.style.width = "20vw";
}

//adding/removing book objects from array functions
function addBookToLibrary(book){
    book.index = bookLibrary.length;
    bookLibrary.push(book);
}

function removeBookFromLibrary(index){
    if(index < 0) return;
    if(bookLibrary.length > 1 && index < bookLibrary.length)
        bookLibrary.splice(index, 1);
}

function createMainDetails(book){
    //create the main details container
    let mainDetails = document.createElement("div");
    mainDetails.classList.add("main-details");
    //book title information
    let mdTitle = document.createElement("p");
    mdTitle.classList.add("book-title");
    mdTitle.textContent = book.title;
    mdTitle.style.textTransform = "capitalize";
    //book author information
    let mdAuthor = document.createElement("p");
    mdAuthor.classList.add("book-author");
    mdAuthor.textContent = book.author;
    mdAuthor.style.textTransform = "capitalize";

    //add title and author p elements to main details div container
    mainDetails.appendChild(mdTitle);
    mainDetails.appendChild(mdAuthor);

    return mainDetails;
}


function createBookButtons(book){
    //create button container
    let btnContainer = document.createElement("div");
    btnContainer.classList.add("card-btn-list");

    //create checkbox input 
    let checkboxInput = document.createElement("input");
    checkboxInput.setAttribute("type", "checkbox");
    checkboxInput.setAttribute("name", "read-book");
    checkboxInput.setAttribute("value", `${book.hasRead}`);
    checkboxInput.checked = book.hasRead;

    //create trashcan button
    let trashcanBtn = document.createElement("button");
    trashcanBtn.classList.add("book-delete-btn")
    let tcImage = document.createElement("input");
    tcImage.setAttribute("type", "image");
    tcImage.setAttribute("src", "images/trash-can-outline.png");

    //put elements in the correct containers
    trashcanBtn.appendChild(tcImage);
    btnContainer.appendChild(checkboxInput);
    btnContainer.appendChild(trashcanBtn);

    return btnContainer;


}


//creates an element inside the bookshelf grid
function createBookElement(book){
    const bookShelf = document.querySelector(".bookshelf");
    
    //create the main container
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    //use last index of bookLibrary array to get number position and add it to data-position
    bookCard.setAttribute("data-position", `${book.index}`);

    //create main details element
    const mainDetails = createMainDetails(book);
    //create btn-container element
    const btnContainer = createBookButtons(book);


    //add the main details container to the main container
    bookCard.appendChild(mainDetails);
    //add the btn-container container to the main container
    bookCard.appendChild(btnContainer);
    //add the main container to the bookshelf
    bookShelf.appendChild(bookCard).focus();
}

//display library array container of books
function reDisplayBooks(){
    let bookList = document.querySelector(".bookshelf");
    while(bookList.firstChild){
        bookList.removeChild(bookList.firstChild);
    }

    bookLibrary.forEach(index => createBookElement(index));
}

//error check form
function errorCheck(){
    const bookForm = document.querySelector("form");

    //Make Sure Title and Author values are include in form
    if(bookForm.querySelector("[name = 'bookTitle']").value === "") return "Book Title is Required";
    if(bookForm.querySelector("[name = 'bookAuthor']").value === "") return "Author Name is Required";

    //Make sure page length is greater than 0
    if(parseInt(bookForm.querySelector("[name = 'bookPages']").value) < 1) return "Page Length can not be less than 1";

    //if all checks suceed return message
    return "Suceed";

}

function addBook(){

    //error check
    const errorMsg = errorCheck();
    if (errorMsg !== "Suceed"){
        alert(errorMsg);
        return;
    }

    const bookForm = document.querySelector("form");
    //book title
    let title = bookForm.querySelector("[name = 'bookTitle']");
    //author
    let author = bookForm.querySelector("[name = 'bookAuthor']");
    //book genre
    let genre = bookForm.querySelector("[name = 'bookGenre']");
    //max number of pages in book
    let pageLength = bookForm.querySelector("[name = 'bookPages']");
    //read book or not
    let hasRead = bookForm.querySelector("[name = 'bookRead']");

    //add book to library list
    let book = new Book(title.value, author.value, genre.value, parseInt(pageLength.value), hasRead.checked);
    addBookToLibrary(book);
    createBookElement(book);

    //close sidebar
    closeSidebar();
}












//close button on sidebar
const exitBtn = document.querySelector(".close-btn");
exitBtn.addEventListener("click", closeSidebar, 0);
//open sidebar button
const newBtn = document.querySelector(".book-new");
newBtn.addEventListener("click", openSidebar, 0);
//reset button
const resetBtn = document.querySelector(".book-reset");
resetBtn.addEventListener("click", reDisplayBooks, 0);

//add new book from form
const addFormBookBtn = document.querySelector(".form-add-btn");
addFormBookBtn.addEventListener("click", addBook, 0);



//default book creation
let book1 = new Book("Sample Title", "John Smith", "Adventure", 100, true);
let book2 = new Book("Another Rhyme", "Joe Hime", "Action", 10, false);
let book3 = new Book("Hello World", "Solaire Ghost", "Sci-Fi", 250, true);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

createBookElement(book1);
createBookElement(book2);
createBookElement(book3);