/*
Name : Vanshul Kesharwani
Date : 14/03/2022
Version : 1.1.2
Email : vkvanshulkesharwani54@gmail.com
Further features : Add title, Mark a note as important, Separate notes by user, Add date and time on notes.
*/

// Calling showNotes function to load all notes at starting from local storage.
showNotes();

// If user adds a notes, add it to a local storage.

// Targetting button from ID.
let addBtn = document.getElementById("addBtn");

// Using event listener to run a function.
addBtn.addEventListener("click", function() {

    // Targetting textarea from ID.
    let addTxt = document.getElementById("addTxt");
    // Targetting title from ID.
    let addTitle = document.getElementById("addTitle");
    // Targetting checkbox from ID to check importance.
    let addImpPrim = document.getElementById("addImpPrim");

    // Checking for selected checkbox.
    if (addImpPrim.checked == true) {
        // Setting color according to their importance.
        addImp = "primary"
    } else { addImp = "danger" };

    // Taking all local storage in this notes variable.
    let notes = localStorage.getItem("notes");

    // Checking for if localstorage is null.
    if (notes == null) {
        notesObj = [];
    } // if localstorage has value it will parse all the value in notesObj.
    else {
        notesObj = JSON.parse(notes);
    };

    // Creating objects for storing multiple values.
    let myObj = {
        title: addTitle.value,
        text: addTxt.value,
        important: addImp // title, desc and color of note with importance will store here.
    }

    // Pushing myobject value to the notesObj.
    notesObj.push(myObj);
    // Send value of notesObj to local storage with a notes parameter.
    localStorage.setItem("notes", JSON.stringify(notesObj));

    // Empty the text area to add other notes.
    addTxt.value = "";
    // Empty the title area to add other notes.
    addTitle.value = "";
    showNotes();
});



// To show all notes downside of the page from local storage.
function showNotes() {

    // Taking all local storage in this notes variable.
    let notes = localStorage.getItem("notes");

    // Checking for if localstorage is null, put empty to the notes obj.
    if (notes == null) {
        notesObj = [];
    } // if localstorage has value it will parse all the value in notesObj.
    else {
        notesObj = JSON.parse(notes);
    };

    // Creating blank variable string.
    let html = "";
    // Created function to loop all notes from object.
    notesObj.forEach(function(element, index) {
        // Added html stringVariable to this new generated html stringVariable. for displaying available notes.
        html += `
        <div class="card noteCard mx-auto my-3" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-subtitle mb-2 ">${index + 1}. ${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-${element.important}">Delete</button>
            </div>
        </div>
        `;
    });

    // Targetting textarea from ID.
    let notesElm = document.getElementById("notes");

    // Checking for if notes length is not 0 we will print all notes..
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } // Else we will show this message.
    else { notesElm.innerHTML = `<b>Nothing to show here. Use "Add Note" section to add a notes.</b>` };
};


// Function to delete a note.
function deleteNote(index) {
    // Taking all local storage in this notes variable.
    let notes = localStorage.getItem("notes");

    // Checking for if localstorage is null, put empty to the notes obj.
    if (notes == null) {
        notesObj = [];
    } // if localstorage has value it will parse all the value in notesObj.
    else {
        notesObj = JSON.parse(notes);
    };

    // Delete object in variable.
    notesObj.splice(index, 1);
    // update value of notesObj to local storage with a notes parameter.
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
};



// Adding Search function in search area. 

// Targetting search area from ID.
let searchTxt = document.getElementById("searchTxt");

// Adding search area to input tag.
searchTxt.addEventListener("input", function() {
    // Input taken in this below variable. Convert it into lower case because we need all caps and small letter in search.
    let inputVal = searchTxt.value.toLowerCase();
    // Targetting all cards area from Classname.
    let noteCards = document.getElementsByClassName("noteCard");

    // make noteCards Array and then looping for all cards.
    Array.from(noteCards).forEach(function(element) {
        // Targetting p tag of each element by their tag name.
        let cardtxt = element.getElementsByTagName("p")[0].innerText;

        // Applying condition and if search text is matching then it will display the card.
        if (cardtxt.includes(inputVal)) {
            // console.log(cardtxt);
            element.style.display = "block";
        } // Else it will delete/remove the card from page.
        else {
            element.style.display = "none";
        };
    });
});