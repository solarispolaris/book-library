
function Book(bookTitle, bookAuthor, bookGenre, bookLength, bookRead){
    this.title = bookTitle;
    this.author = bookAuthor;
    this.genre = bookGenre;
    this.pageLength = bookLength;
    this.hasRead = bookRead;
}

let bookLibrary = [];

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



//creates an element inside the bookshelf grid
function createBookElement(book){
    const bookShelf = document.querySelector(".bookshelf");
    
    //create the main container
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    //use last index of bookLibrary array to get number position and add it to data-position
    bookCard.setAttribute("data-position", `${bookLibrary.length - 1}`);

    //create the main details container
    let mainDetails = document.createElement("div");
    mainDetails.classList.add("main-details");
    //book title information
    let mdTitle = document.createElement("p");
    mdTitle.classList.add("book-title");
    mdTitle.textContent = book.title;
    //book author information
    let mdAuthor = document.createElement("p");
    mdAuthor.classList.add("book-author");
    mdAuthor.textContent = book.author;

    //add title and author p elements to main details div container
    mainDetails.appendChild(mdTitle);
    mainDetails.appendChild(mdAuthor);

    //add the main details container to the main container
    bookCard.appendChild(mainDetails);
    
    //add the main container to the bookshelf
    bookShelf.appendChild(bookCard);
}

function reDisplayBooks(){
    bookLibrary.forEach(index => createBookElement(index));
}



const resetBtn = document.querySelector(".book-reset");
//resetBtn.addEventListener("click", createBookElement, 0);

createBookElement(new Book("Hello World", "Solaire Ghost", "Adventure", 100, true));