showNotes();

notesobj = []; // make an array.
let addBtn = document.getElementById("addBtn"); // 1. we created a event listeners for the Add note button
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt"); // we created a addtxt to get the element access of textarea were we are writing the note so that we can get the value what we wrote there.
  let addTitle = document.getElementById("addTitle");
  myobj = {
    title: addTitle.value,
    text: addTxt.value,
  };
  notesobj.push(myobj); // as it array so we are using array function push the value of add.txt in it.
  localStorage.setItem("notes", JSON.stringify(notesobj)); // now to convert the array in Json String object.
  addTxt.value = ""; // to make it balnk the aftering adding the node
  addTitle.value = ""; // to make it balnk the aftering adding the node
  showNotes();
});

function showNotes() {
  let notes = JSON.parse(localStorage.getItem("notes"));

  let notesElm = document.getElementById("notes"); // this notesElm will replace the div class notes.

  if (notes.length >= 1) {
    document.getElementById("yournotesdisplay").style.display = "block";
    let html = "";
    notes.forEach(function (element, index) {
      html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title"> ${element.title} </h5>
            <p class="card-text">${element.text}</p>
            <button id = "${index}" onclick ="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>  
            </div>
            </div>`;
    });
    notesElm.innerHTML = html;
  } else {
    document.getElementById("yournotesdisplay").style.display = "none";
    notesElm.innerHTML = `<h1> Nothing To show! Use Add note function to add a note </h1>`;
  }
}

// Note for as we are givving every button an unique id of array index which help us to delete the Node.
// we have us the Onclick = function() .

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  notesobj = JSON.parse(notes); // We pares it into array and store in notesobj which will be array.
  notesobj.splice(index, 1); // splice
  localStorage.setItem("notes", JSON.stringify(notesobj));
  showNotes();
}

search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inptval = search.value; //.toLowerCase();
  let notecards = document.getElementsByClassName("noteCard");
  Array.from(notecards).forEach(function (element) {
    let cardtxt = element.getElementsByTagName("p")[0].innerText; // as only one p tag thats wgy [0]
    if (cardtxt.includes(inptval)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
