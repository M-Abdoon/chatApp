const currentUser = "Ahmed";
let messages = [
  { message: "Hi guys", sender: "Ahmed", timestamp: "45145" },
  { message: "how are you Ahmed", sender: "Mustafa", timestamp: "45146" },
  { message: "u see my message guys?", sender: "Fahed", timestamp: "45148" },
  { message: "I'm good, you?", sender: "Ahmed", timestamp: "45147" },
];

function setup() {
  const messagesContainer = document.querySelector(".chat-messages");

  messages.sort((a, b) => a.timestamp - b.timestamp);

  messages.forEach((message) => {
    let role = "received";
    if (currentUser === message.sender) role = "sent";

    messagesContainer.innerHTML += `
	<div class="message ${role}">
	<span class="sender-name">${message.sender}</span>
	<p>${message.message}</p>
	`;
  });
  console.log(messages);
}

window.onload = setup();
