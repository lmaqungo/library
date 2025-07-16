
// array of book objects
let myLibrary = [];

const bookGrid = document.querySelector(".book-grid");
const addBookBtn = document.querySelector("#add-btn");

const closeDialogBtn = document.querySelector("#close-btn");
const clearLibraryBtn = document.querySelector("#clear-btn");
const submitFormButton = document.querySelector("#submit-btn");

const dialog = document.querySelector("dialog");
const form = dialog.querySelector("form");
const fields = form.querySelectorAll("input");


function Book(title, author, date){
    if (!new.target){
        throw Error("You must use the 'new' operator to call the constructor")
    }
    this.title = title;
    this.author = author;
    this.read_book = false;
    this.date = date;
    this.id = crypto.randomUUID();
}

function addCard(library, bookObj){
    // create main card 
    const bookCard = document.createElement("div");
    bookCard.setAttribute("data-id", bookObj.id);
    bookCard.setAttribute("class", "book-card");
    // create card text content container 
    const bookCardContent = document.createElement("div");
    bookCardContent.classList.add("content");
    // book title header 
    const titleHeader = document.createElement("h2");
    titleHeader.classList.add("title-header");
    titleHeader.textContent = bookObj.title;
    bookCardContent.appendChild(titleHeader);
    // middle content container 
    const bookCardContentMiddle = document.createElement("div");
    bookCardContentMiddle.classList.add("middle");
    // author text 
    const authorText = document.createElement("p");
    authorText.textContent = bookObj.author;
    bookCardContentMiddle.appendChild(authorText);
    // date text 
    const dateText = document.createElement("p");
    dateText.textContent = bookObj.date;
    bookCardContentMiddle.appendChild(dateText);
    // append middle content to card content 
    bookCardContent.appendChild(bookCardContentMiddle);
    // create actions container 
    const bookCardActions = document.createElement("div");
    bookCardActions.classList.add("actions");
    // create read indicator container 
    const readIndicator = document.createElement("div");
    readIndicator.classList.add("read");
    // read label 
    const readIndicatorLabel = document.createElement("label");
    readIndicatorLabel.textContent = "Read";
    readIndicatorLabel.setAttribute("for", "read-checkbox");
    readIndicator.appendChild(readIndicatorLabel);
    // read checkbox 
    const readIndicatorInput = document.createElement("input");
    readIndicatorInput.setAttribute("type", "checkbox");
    readIndicatorInput.setAttribute("id", "read-checkbox");
    readIndicator.appendChild(readIndicatorInput);
    bookCardActions.appendChild(readIndicator);
    // delete btn 
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("id", "delete-btn")
    deleteBtn.textContent = "Delete";
    bookCardActions.appendChild(deleteBtn);
    bookCard.appendChild(bookCardContent);
    bookCard.appendChild(bookCardActions);

    library.appendChild(bookCard);

    deleteBtn.addEventListener("click", (e) => {
        let cardId = e.target.parentElement.parentElement.dataset.id;
        let index = myLibrary.findIndex((bookObj) =>{
            return bookObj.id === cardId;
        })
        myLibrary.splice(index, 1);
        let cardToRemove = bookGrid.querySelector(`[data-id= "${cardId}"]`);
        bookGrid.removeChild(cardToRemove);
        counter--;

    });

    readIndicatorInput.addEventListener("change", (e) =>{
        let cardId = e.target.parentElement.parentElement.parentElement.dataset.id;
        let card = myLibrary.find((bookObj) =>{
            return bookObj.id === cardId
        })
        if(readIndicatorInput.checked){
            card.read_book = true;
            titleHeader.classList.add("line-through");
            authorText.classList.add("line-through");
            dateText.classList.add("line-through");
        } else{
            card.read_book = false;
            titleHeader.classList.remove("line-through");
            authorText.classList.remove("line-through");
            dateText.classList.remove("line-through");
        }
    });
}

addBookBtn.addEventListener("click", () => {
    dialog.show();
});

closeDialogBtn.addEventListener("click", () =>{
    dialog.close();
}); 

let counter = 0;
submitFormButton.addEventListener("click", (event) => {
    event.preventDefault();
    const formInputs = {};
    if(form.checkValidity()){
        fields.forEach((field) =>{
            formInputs[field.name] = field.value;
            field.value = "";
        });
    } else{
        form.reportValidity();
    }
    addBookToLibrary(formInputs);
    loadLibrary(myLibrary.slice(counter));
    counter++;
});

clearLibraryBtn.addEventListener("click", () =>{
    // remove all child nodes from bookgrid
    // set the counter variable to 0
    // empty the mylibrary array
    const cards = document.querySelectorAll(".book-card");
    counter = 0;
    myLibrary = [];
    cards.forEach((card) => {
        bookGrid.removeChild(card);
    });
})


function addBookToLibrary(formInputs){
    let bookObj = new Book(formInputs.title, formInputs.author, formInputs.date);
    myLibrary.push(bookObj);
}

function loadLibrary(bookObjArray){
    bookObjArray.forEach((bookObj) =>{
        addCard(bookGrid, bookObj);
    });
}

function initializer(){
    let values = ["Matilda", "Roald Dahl", "1988"];
    let firstObj = {"title": values[0], 
                    "author": values[1], 
                    "date": values[2],
    };
    addBookToLibrary(firstObj);
    loadLibrary(myLibrary.slice(counter));
    counter++;
}
initializer();
