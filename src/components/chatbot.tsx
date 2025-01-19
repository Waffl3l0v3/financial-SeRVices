import React, { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import "../index.css"; // Import the CSS file for styling

// Define the shape of the API response for better TypeScript support
interface ChatResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

const Chatbot: React.FC = () => {
  // State for handling the user's input
  const [prompt, setPrompt] = useState<string>("");
  // State to manage loading indicator
  const [loading, setLoading] = useState<boolean>(false);
  // State to store chat messages with sender info (user or bot)
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);

  // Handles the form submission for sending the prompt to the bot
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) return; // Prevent empty messages

    // Add the user's message to the message history
    setMessages((prev) => [...prev, { sender: "user", text: prompt }]);
    setLoading(true); // Set loading state to true while waiting for the bot's response
    setPrompt(""); // Clear the input field after submission

    try {
      // Make a POST request to the OpenAI API for generating a response
      const response = await axios.post<ChatResponse>(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo", // Specify the OpenAI model
          messages: [
            {
              role: "user", // User's message
              content: prompt,
            },
          ],
          temperature: 0.5, // Control randomness in the response
          max_tokens: 4000, // Max number of tokens in the response
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Get the API key from environment variables for security
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      // Extract the bot's response from the API's result
      const botResponse = response.data.choices[0].message.content;
      // Add the bot's response to the message history
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch (error) {
      // Handle errors during the API request
      console.error("OpenAI API Error:", error);
      // Display a default error message if something goes wrong
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false); // Set loading state to false after the response
    }
  };

  // Handles the change in the prompt input field
  const handlePromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value); // Update the prompt state with the current input
  };

  return (
    <div className="chat-container" style={{ fontFamily: 'Montserrat' }}>
      <div className="chat-box">
        {/* Loop through and display messages */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "user" ? "user" : "bot"}`}
          >
            {message.text} {/* Display message text */}
          </div>
        ))}
        {/* Display a loading message when the bot is typing */}
        {loading && <div className="loading">Typing...</div>}
      </div>

      {/* Form to submit the user's message */}
      <form className="input-container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt} // Bind the input field to the prompt state
          onChange={handlePromptChange} // Update prompt state on input change
          placeholder="Ask something..."
          disabled={loading} // Disable input while loading
        />
        <button type="submit" disabled={loading || !prompt.trim()}>
          Send {/* Disable the button if input is empty or loading */}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
