/**
 * Initial loading of the window.
 * 
 * It reads from the current localStorage and populate them as Notes.
 */

window.onload = function() {
  //need to populate the array from the localStorage
  for (let i = 0; i < localStorage.length; i++) {
    updateOrCreateTextViewBox(localStorage.key(i));
  }
}; 

function updateOrCreateTextViewBox(key)
{
  let textContainer = document.getElementById(key);
  if (textContainer == null)
  {
    //create a div with textbox and button.
    textContainer = document.createElement("div");
    textContainer.id = key;
    textContainer.className = "card notes"
    textContainer.innerHTML = "<p class='note_center'>" + localStorage.getItem(key) + "</p>";
    document.getElementById("note_container").appendChild(textContainer);
  } else{
    //update
    textContainer.innerHTML = "<p class='note_center'>" + localStorage.getItem(key) + "</p>";
  }
}


function goWriterPage() {
  location.href = "./writer.html";
}

/**
 * saves to localStorage every 2 seconds
 */
 setInterval(function() {
  for (let i = 0; i < localStorage.length; i++) {
    updateOrCreateTextViewBox(localStorage.key(i));
  }
  updateTime();
}, 2000);

/**
 * Updates time
 * 
 * Original src: https://stackoverflow.com/questions/5091888/how-to-update-time-regularly
 */
function updateTime(){
  const date = new Date();
  const twoDigitMinutes = date.toLocaleString("en-us", {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: "2-digit"});

  document.getElementById('time').innerHTML = "Last retrieved: " + twoDigitMinutes; 
}
updateTime();

function goBackHome(){
  location.href="./index.html";
}