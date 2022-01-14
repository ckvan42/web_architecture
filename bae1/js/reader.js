/**
 * Initial loading of the window.
 * 
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
    textContainer = document.createElement("div");
    textContainer.id = key;
    textContainer.className = "card notes"
    textContainer.innerHTML = "<p class='note_center'>" + localStorage.getItem(key) + "</p>";
    document.getElementById("note_container").appendChild(textContainer);
}

function goWriterPage() {
  location.href = "./writer.html";
}

setInterval(function() {
  let bigContainer = document.getElementById("note_container");
  bigContainer.replaceChildren();
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