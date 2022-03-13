// Calling showNotes function to load all notes at starting.
showNotes();

// If user adds a notes, add it to a local storage.

// Targetting button from ID.
let addBtn = document.getElementById("addBtn");
// Using event listener to run a function.
addBtn.addEventListener("click", function() {
    // Targetting textarea from ID.
    let addTxt = document.getElementById("addTxt");
    // Taking all local storage in this notes variable.
    let notes = localStorage.getItem("notes");
    // Checking for if localstorage is null.
    if (notes == null) {
        notesObj = [];

    } // if localstorage has value it will parse all the value in notesObj.
    else {
        notesObj = JSON.parse(notes);
    }
    // Pushing text value to the notesObj.
    notesObj.push(addTxt.value);
    // Send value of notesObj to local storage with a notes parameter.
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // Empty the text area to add other notes.
    addTxt.value = "";
    showNotes();
});
// To show all notes downsite of the page.
function showNotes() {

    // Taking all local storage in this notes variable.
    let notes = localStorage.getItem("notes");
    // Checking for if localstorage is null.
    if (notes == null) {
        notesObj = [];

    } // if localstorage has value it will parse all the value in notesObj.
    else {
        notesObj = JSON.parse(notes);
    }
    // Creating blank variable string.
    let html = "";
    // Created function to loop all notes from object.
    notesObj.forEach(function(element, index) {
        // Added html stringVariable to this new generated html stringVariable.
        html += `
        <div class="card mx-4 my-3" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Note ${index+1}</h5>
                <p class="card-text">${element}</p>
                <button class="btn btn-primary">Delete</button>
            </div>
        </div>
        `;
    });
    // Targetting textarea from ID.
    let notesElm = document.getElementById("notes");
    // Checking for if notes length is 0 we dont will not get any error with this..
    if (notes.length != 0) {
        notesElm.innerHTML = html;
    };
};