function sendMessage() {
    var userInput = document.getElementById('userMessage').value;
    if (userInput.trim() === '') return;

    var messagesContainer = document.getElementById('messages');

    // Display user message
    var userMessageContainer = document.createElement('div');
    userMessageContainer.className = 'message-container';
    var userMessage = document.createElement('div');
    userMessage.className = 'message userMessage';
    userMessage.textContent = userInput;
    userMessageContainer.appendChild(userMessage);
    messagesContainer.appendChild(userMessageContainer);

    // Simulate chatbot response (replace this with actual chatbot integration)
    var botMessageContainer = document.createElement('div');
    botMessageContainer.className = 'message-container';
    var botMessage = document.createElement('div');
    botMessage.className = 'message botMessage';
    botMessage.textContent = 'I received: ' + userInput;
    botMessageContainer.appendChild(botMessage);
    messagesContainer.appendChild(botMessageContainer);

    // Clear user input
    document.getElementById('userMessage').value = '';

    // Scroll to the bottom of the messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}