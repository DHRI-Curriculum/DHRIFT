import * as webllm from "@mlc-ai/web-llm";
import { useEffect, useState, useRef } from "react";
import Markdown from 'markdown-to-jsx';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; // Import syntax highlighting theme
import { LinearProgress, Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material'; // Import MUI components

// Define a custom Markdown component with code highlighting
const MarkdownWithHighlight = ({ children }) => {
  return (
    <Markdown
      options={{
        overrides: {
          code: {
            component: ({ className, children }) => {
              const language = className?.replace('lang-', '').replace('language-', '') || 'plaintext';
              const codeString = Array.isArray(children) ? children.join('') : children;
              const highlightedCode = hljs.highlight(codeString, { language }).value;

              return (
                <pre>
                  <code
                    className={`hljs language-${language}`}
                    dangerouslySetInnerHTML={{ __html: highlightedCode }}
                  />
                </pre>
              );
            },
          },
        },
      }}
    >
      {children}
    </Markdown>
  );
};

const ChatBot = () => {
  const [messages, setMessages] = useState([]); // Holds the entire conversation
  const [input, setInput] = useState(""); // User input
  const [model, setModel] = useState(null); // LLM model instance
  const [isModelLoading, setIsModelLoading] = useState(true); // Loading the model
  const [progressInfo, setProgressInfo] = useState({ progress: 0, text: '', timeElapsed: 0 }); // Progress state
  const [isResponding, setIsResponding] = useState(false); // Bot is generating response
  const [selectedModel, setSelectedModel] = useState(""); // Selected model ID
  const [modelList, setModelList] = useState([]); // List of available models
  const chatboxRef = useRef(null); // Reference to the chatbox

  useEffect(() => {
    // Load the model list from prebuiltAppConfig.model_list
    const fetchModelList = () => {
      setIsModelLoading(true); // Set loading state to true
      const { model_list } = webllm.prebuiltAppConfig;

      // Debugging: log the model_list to verify it's loaded
      console.log("Model list loaded from prebuiltAppConfig:", model_list);

      if (Array.isArray(model_list) && model_list.length > 0) {
        setModelList(model_list); // Set the model list state
        // setSelectedModel(model_list[0]?.model_id || ""); // Set the first model ID as the default
        setSelectedModel("Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC");
      } else {
        console.error("Model list is empty or invalid:", model_list);
      }
      setIsModelLoading(false); // Stop loading after the list is fetched
    };

    fetchModelList();
  }, []);

  const loadModel = async (modelId) => {
    setIsModelLoading(true); // Set loading state to true
    try {
      const initProgressCallback = (progressObject) => {
        setProgressInfo({
          progress: Math.round(progressObject.progress * 100), // Convert to percentage
          text: progressObject.text,
          timeElapsed: progressObject.timeElapsed,
        });
      };

      // Load the model using modelId
      const engine = await webllm.CreateMLCEngine(modelId, { initProgressCallback });
      setModel(engine);
      setIsModelLoading(false); // Model loaded
    } catch (error) {
      console.error("Error initializing model:", error);
      setIsModelLoading(false); // Stop loading if there's an error
    }
  };

  // Load the initial model on component mount
  useEffect(() => {
    if (selectedModel) {
      setIsModelLoading(true); // Set loading state
      loadModel(selectedModel); // Load the selected model using model_id
    }
  }, [selectedModel]); // Reload model when the selected model changes

  // Scroll to the bottom of the chatbox whenever a new message is added
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prevMessages) => [...prevMessages, { text: input, sender: "user" }]);

    const userMessage = input;
    setInput(""); // Clear the input field

    if (model) {
      setIsResponding(true); // Start loading for response
      try {
        const conversationHistory = messages.map((message) => ({
          role: message.sender === "user" ? "user" : "assistant",
          content: message.text,
        }));

        conversationHistory.push({ role: "user", content: userMessage });

        const responseStream = await model.chat.completions.create({
          messages: conversationHistory,
          stream: true,
        });

        if (responseStream && responseStream[Symbol.asyncIterator]) {
          let botResponse = "";
          for await (const chunk of responseStream) {
            if (chunk.choices && chunk.choices[0].delta && chunk.choices[0].delta.content) {
              const newContent = chunk.choices[0].delta.content;
              botResponse += newContent;
              setMessages((prevMessages) => {
                const lastMessage = prevMessages[prevMessages.length - 1];
                if (lastMessage && lastMessage.sender === "bot") {
                  return [
                    ...prevMessages.slice(0, -1),
                    { ...lastMessage, text: lastMessage.text + newContent },
                  ];
                } else {
                  return [...prevMessages, { text: newContent, sender: "bot" }];
                }
              });
            }
          }
          setIsResponding(false);
        }
      } catch (error) {
        console.error("Error generating response:", error);
        setIsResponding(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value); // Update selected model (model_id)
  };

  return (
    <div className="chatbot-container">
      {isModelLoading ? (
        <Box 
        sx={{ width: '100%',
          backgroundColor: 'white'
         }}>
          <Typography variant="h6" color="textSecondary">
            {progressInfo.text} ({progressInfo.progress}% completed, {progressInfo.timeElapsed} secs elapsed)
          </Typography>
          <LinearProgress variant="determinate" value={progressInfo.progress} />
        </Box>
      ) : (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel id="model-select-label">Select Model</InputLabel>
            <Select
              labelId="model-select-label"
              value={selectedModel}
              onChange={handleModelChange}
              fullWidth
              sx={{ width: '100%',
                backgroundColor: 'white'
               }}
            >
              {modelList.length > 0 ? (
                modelList.map((model) => (
                  <MenuItem key={model.model_id} value={model.model_id}>
                    {model.model_id}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No models available</MenuItem>
              )}
            </Select>
          </FormControl>

          <div className="chatbox" ref={chatboxRef}>
            {messages.map((message, index) => (
              <div key={`${message.sender}-${index}-${message.text.slice(0, 20)}`} className={`message ${message.sender}`}>
                <MarkdownWithHighlight>{message.sender === "user" ? `>> ${message.text}` : `Bot: ${message.text}`}</MarkdownWithHighlight>
              </div>
            ))}
            {isResponding && <div className="loading-message">Bot is typing...</div>}
          </div>
        </>
      )}

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="input-field"
          onKeyDown={handleKeyDown}
          disabled={isModelLoading || isResponding}
        />
        <button
          onClick={handleSendMessage}
          className="send-button"
          disabled={isModelLoading || isResponding}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
