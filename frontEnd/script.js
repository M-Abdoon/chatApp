const appServerURL =
  "https://m-abdoon-chatapp-backend.hosting.codeyourfuture.io/";

const currentUser = prompt("Enter your name:") || "Unknown";
async function setup() {
  renderMessages();

  const messageText = document.getElementById("messageText");
  const submitMessage = document.getElementById("submitMessage");

  submitMessage.addEventListener("click", async (e) => {
    e.preventDefault();
    const message = messageText.value.trim();
    if (message) {
      const success = await sendMessage(message);
      if (success) {
        messageText.value = "";
        document.querySelector(".chat-messages").innerHTML = "";
        renderMessages();
      } else {
        alert("Failed to send message. Please try again.");
      }
    }
  });
}

async function renderMessages() {
  const messagesContainer = document.querySelector(".chat-messages");
  let messages = await fetchMessages();

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
}
async function fetchMessages() {
  try {
    const response = await fetch(`${appServerURL}getMessages`);
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
}

async function sendMessage(message) {
  try {
    const response = await fetch(`${appServerURL}sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        sender: currentUser,
      }),
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    return false;
  }
}

window.onload = setup();
