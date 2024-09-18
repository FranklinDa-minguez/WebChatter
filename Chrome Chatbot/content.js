document.addEventListener('DOMContentLoaded', () => {
  const sendButton = document.getElementById('send-btn');
  const chatContent = document.getElementById('chat-content');
  const chatInput = document.getElementById('chat-input');

  function addMessage(message, isUser = true) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = isUser ? 'user-message' : 'bot-message';
    chatContent.appendChild(messageElement);
    chatContent.scrollTop = chatContent.scrollHeight;
  }

  function handleSend() {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
      addMessage(userMessage);
      chatInput.value = '';
      // Simulate a response from the chatbot
      setTimeout(() => {
        addMessage('This is a response from the chatbot', false);
      }, 1000);
    }
  }

  sendButton.addEventListener('click', handleSend);
  chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  });

  sendButton.addEventListener('click', () => {
    handleSend();
  });
});

const pageTitle = document.title;
const pageText = document.body.innerText
.replace(/\n/g, ' ')
.replace(/\t/g, ' ')
.trim();
const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.innerText);
const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
const links = Array.from(document.querySelectorAll('a')).map(a => a.href);

// Send the extracted data to the background script or popup
chrome.runtime.sendMessage({
  pageTitle: pageTitle,
  pageText: pageText,
  headings: headings,
  metaDescription: metaDescription,
  links: links
});

