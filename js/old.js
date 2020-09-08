// Aim:-  if users add a note then it should be added in the local storage.
console.log("Welcome to notes app");
showNotes();


let addBtn = document.getElementById("addBtn"); // 1. we created a event listeners for the Add note button
addBtn.addEventListener('click', function (e) {

    let addTxt = document.getElementById("addTxt"); // we created a addtxt to get the element access of textarea were we are writing the note so that we can get the value what we wrote there.
    let notes = localStorage.getItem("notes") // this help to take the prevoius note if there is any then take that note.
    if (notes == null) {
        notesobj = []; // if there is nothing then create a balnk array
    } else {
        notesobj = JSON.parse(notes); // it will going to parse it in  array form.
    }
    notesobj.push(addTxt.value); // as it array so we are using array function push the value of add.txt in it.
    localStorage.setItem("notes", JSON.stringify(notesobj)); // now to convert the array in Json String object.
    addTxt.value = ""; // to make it balnk the aftering adding the node
    showNotes();
})





// the show notes function is craeted for the showing the notes
function showNotes() {
    let notes = localStorage.getItem("notes");
    // here we are taking the value of notes in the notes
    if (notes == null) {
        notesobj = []; // if there is nothing then create a balnk array
    } else {
        notesobj = JSON.parse(notes); // if there is string then parse it in the array
    }

    let html = ""; // we have created a balnk elemnt name html
    // iterating the element one by one by using forEach function
    notesobj.forEach(function (element, index) {

        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title"> Note ${index + 1} </h5>
                <p class="card-text">${element}</p>
                <button id = "${index} " onclick ="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>`
    });

    let notesElm = document.getElementById("notes");

    if (notesobj.length != 0) {
        notesElm.innerHTML = html;

    } else {
        notesElm.innerHTML = " <h1> Nothing To show! Use Add note function to add a note </h1>"
    }
}



// This function is only for deleting the note
function deleteNote(index) {
    // console.log("I am deleting a node", index)

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }

    notesobj.splice(index, 1); // this will remove always one note as we click on that note it will get remive
    localStorage.setItem("notes", JSON.stringify(notesobj)); // this will help nus to update our locla storage

    showNotes();
}

search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inptval = search.value; //.toLowerCase();
    // console.log("input even fired! ", inptval);
    let notecards = document.getElementsByClassName('noteCard');
    Array.from(notecards).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("p")[0].innerText;
        if (cardtxt.includes(inptval)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";

        }
    })
})