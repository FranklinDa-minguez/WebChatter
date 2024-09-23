import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

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

  const llm = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0 });
  const text_splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunckOverlap: 50,
  });
  const splits = text_splitter.split(pageText);
  const vectorStore = MemoryVectorStore.fromDocuments(
    splits,
    new OpenAIEmbeddings()
  );
  retriever = vectorStore.asRetriever({
    k: 3,
    searchtype: "similarity",
  });

  function handleSend() {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
      addMessage(userMessage);
      chatInput.value = '';
      const template = "You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise. \n\nQuestion: {question}?\n\nContext:{context}";
        const prompt = new PromptTemplate({
          template: template,
          inputVariables: ["question", "context"],
        });

        const ragChain = createStuffDocumentsChain({
          llm: llm,
          prompt: prompt,
          outputParser: new StringOutputParser(),
        });

        const retrievedDocs = retriever.invoke(message.userMessage);

        const botResponse = ragChain.invoke({ question: userMessage, context: retrievedDocs });
        console.log("Bot response:", botResponse);
      const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
      chatHistory.push({ user: userMessage, bot: response.botMessage });
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
      console.log(chatHistory);
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