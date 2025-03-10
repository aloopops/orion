document.getElementById("user-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

document.getElementById("send-btn").addEventListener("click", function () {
    sendMessage();
});

function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    let chatBox = document.getElementById("chat-box");

    // User Message Bubble
    let userBubble = document.createElement("div");
    userBubble.classList.add("chat-bubble", "user");
    userBubble.innerText = userInput;
    chatBox.appendChild(userBubble);

    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Fetch AI Response
    fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        let aiBubble = document.createElement("div");
        aiBubble.classList.add("chat-bubble", "ai");
        chatBox.appendChild(aiBubble);

        let text = data.reply.split(""); // Convert response into array of characters
        let i = 0;
        let tempText = "";

        function typeWriter() {
            if (i < text.length) {
                tempText += text[i]; // Append the character
                aiBubble.innerHTML = tempText.replace(/ /g, "&nbsp;").replace(/\n/g, "<br>"); // Preserve spaces & line breaks
                i++;
                setTimeout(typeWriter, 30);
            }
        }
        typeWriter();

        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => console.error("Error:", error));
}
