const socket = io();

const form = document.getElementById("messageForm");
form.addEventListener("submit", function(event) {
  event.preventDefault();
  const messageBox = document.getElementById("messageBox");
  if (messageBox.value) {
    socket.send(messageBox.value);
  } 
})

socket.on("message", function(data) {
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = `<p><b>${data.userName}: </b>${data.text}<p>` + chatBox.innerHTML;
})

