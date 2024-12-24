const url = "";
const socket = io.connect(url);
const chat = [];

document.getElementById("setUsername").addEventListener("click", () => {
  if (document.getElementById("username").value.trim()) {
    socket.emit("username", {
      username: document.getElementById("username").value,
    });

    alert(
      document.getElementById("username").value + " is your current username!"
    );
    document.getElementById("user-info").style.visibility = 'hidden';
    document.getElementById("txt").focus();
  } else {
    alert("Please set your username...");
    
  }
});

document.getElementById("txt").addEventListener("input", (e) => {
  if(e.target.value.trim()) 
    document.getElementById("sendMessage").disabled = false;
  else
  document.getElementById("sendMessage").disabled = true;
  
});


document.getElementById("sendMessage").addEventListener("click", (e) => {
  document.getElementById("user-info").style.visibility = 'hidden';
  document.getElementById("sendMessage").disabled = true;
  e.preventDefault();
  socket.emit("chat", {
    txt: document.getElementById("txt").value,
  });
  document.getElementById("txt").value = "";

  document.getElementById("txt").focus();
});

socket.on("chat response", (res) => {
  document.getElementById("container").innerHTML +=
    "<li><span><b>" +
    res.sender +
    ": </b>" +
    moment(res.createdAt).format("h:mm a") + " </span><br/>" +
     res.response +
    "</li>";
  scrollBottom();
});


function scrollBottom() {
  const messageBlk = document.querySelector("ul.container");
  messageBlk.scrollTo(0, messageBlk.scrollHeight);
}


// Change Theme
function setTheme(theme) {
  document.documentElement.style.setProperty("--primary-color", theme);
  localStorage.setItem("movie-theme", theme);
}
setTheme(localStorage.getItem("movie-theme") || '#1A4B84');
