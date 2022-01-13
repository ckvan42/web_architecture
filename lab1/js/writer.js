
/**
 * Global variable for keeping the id. 
 */
counter = 0; 
let arrayTextBoxes = [];


/*************************************
 *********** INITIAL SET-UP **********
 *************************************/

/**
 * Initial loading of the window.
 * 
 * It reads from the current localStorage and populate them as Notes.
 */
window.onload = function() {
  //need to populate the array from the localStorage
  for (let i = 0; i < localStorage.length; i++) {
    let initialNote = new Note(localStorage.key(i));
    initialNote.setContent = localStorage.getItem(localStorage.key(i));
    arrayTextBoxes.push(initialNote);
    counter++;
  }
  if (localStorage.length == 0)
  {
    arrayTextBoxes.push(new Note(counter++));
  }
}; //first Note when first loaded. 


/*************************************
 *********** EVENT HANDLERS **********
 *************************************/

/**
 * Event handler for clicking ADD.
 * Create a new Note and push to arrayTextBoxes.
 */
function addEachNote() {
  arrayTextBoxes.push(new Note(counter++));
}

function goBackHome() {
  location.href="./index.html";
}


/**
 * TextBox object
 */
class Note
{
  constructor(key)
  {
    this._key = key;
    this._btn = createRemoveBtn(this._key);//remove button
    this._noteBox = createNoteBox(this._key); //noteBox
    this._btn.onclick = this.deleteFromStorage;
    this._noteContainer = createNoteContainer(this._key, this._btn, this._noteBox);
    document.getElementById("note_container").appendChild(this._noteContainer);
  }

  set setContent(content) {
    this._noteBox.innerHTML = content;
  }

  set setKey (key)
  {
    this._key = key;  
  }

  get getContent()
  {
    return this._content;
  }

  //A method to save to localStorage.
  saveToStorage = function() {
    if(typeof(Storage) != "undefined")
    {
      localStorage.setItem(this._key, this._noteBox.value);
    } else 
    {
      alert(msg_notSupported);
    }
  }

  deleteFromStorage = function() {
    localStorage.removeItem(this.id);
    //clearing textbox
    let tb = document.getElementById("container_" + this.id);
    tb.value = "";
    this.parentNode.remove();
    updateStorageArray(this.id);
  } 

  setRemoveButtonHandler = function()
  {
    let button = this._btn;
    
    button.onclick = deleteFromStorage;
  }
  
  setRemoveButtonHandler;
}

function updateStorageArray(id)
{
  //I have to delete from the array too.
  let index = -1;
  for (let i = 0; i < arrayTextBoxes.length; i++) {
    if(arrayTextBoxes[i]._key === id) {
      index = i;
    }
  }
  arrayTextBoxes.splice(index, 1);
}

function createNoteContainer(idCounter, noteBox, btn)
{
  let noteContainer;
  noteContainer = document.createElement("div");
  noteContainer.className = "each_note";
  noteContainer.id = "container_" + idCounter;
  noteContainer.appendChild(btn);
  noteContainer.appendChild(noteBox);

  return noteContainer;
}

/**
 * create textbox.
 */
function createNoteBox(idcounter)
{
   //create a div with textbox and button.
  let textbox = document.createElement("TEXTAREA");
  textbox.classList.add("form-control");
  textbox.rows = "3";
  textbox.placeholder="Please write notes.";
  textbox.id = "each_note_" + idcounter;
  return textbox;
}

function createRemoveBtn(id)
{
  //each remove button should have unique id that corresponds to the textbox.
  let rvBtn = document.createElement("BUTTON");
  rvBtn.className = "btn btn-outline-primary";
  rvBtn.classList.add("remove_btn");
  rvBtn.id = id;
  rvBtn.innerHTML = "REMOVE";
  return rvBtn;
}





/**
 * saves to localStorage every 2 seconds
 */
setInterval(function() {
  arrayTextBoxes.forEach(note => {
    if (note._noteBox.value != "")
    {
      note.saveToStorage();
      updateTime();
    }
  })
}, 2000);

/**
 * Updates time
 * 
 * Original src: https://stackoverflow.com/questions/5091888/how-to-update-time-regularly
 */
function updateTime(){
  const date = new Date();
  const twoDigitMinutes = date.toLocaleString("en-us", {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: "2-digit"});

  document.getElementById('time').innerHTML = "Last updated: " + twoDigitMinutes; 
}
updateTime();