import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Paper,
  TextField,
  List,
  ListItem,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import LoopIcon from "@mui/icons-material/Loop";
import axios from "axios";

const ChatApp = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setMessages((prev) => [...prev, { type: "user", content: input }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post("/api/chat", { message: input });
      setMessages((prev) => [
        ...prev,
        { type: "ai", content: response.data.response },
      ]);
    } catch (error) {
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      setMessages((prev) => [
        ...prev,
        { type: "error", content: `Error: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const adjustInputHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    adjustInputHeight();
  };
  return (
    <Container
      maxWidth="md"
      sx={{ height: "100vh", display: "flex", flexDirection: "column", py: 2 }}
    >
      <h2>Chat with OpenAI</h2>
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
          <List>
            {messages.map((msg, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.type === "user" ? "flex-end" : "flex-start",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: msg.type === "user" ? "row-reverse" : "row",
                    alignItems: "flex-end",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor:
                        msg.type === "user" ? "primary.main" : "secondary.main",
                      ml: msg.type === "user" ? 2 : 0,
                      mr: msg.type === "user" ? 0 : 2,
                    }}
                  >
                    {msg.type === "user" ? <PersonIcon /> : <SmartToyIcon />}
                  </Avatar>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      maxWidth: "70%",
                      bgcolor:
                        msg.type === "user"
                          ? "primary.light"
                          : "secondary.light",
                      borderRadius:
                        msg.type === "user"
                          ? "20px 20px 0 20px"
                          : "20px 20px 20px 0",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color:
                          msg.type === "user"
                            ? "primary.contrastText"
                            : "secondary.contrastText",
                      }}
                    >
                      {msg.content}
                    </Typography>
                  </Paper>
                </Box>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ p: 2, bgcolor: "background.paper" }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              multiline
              rows={1}
              variant="outlined"
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Type your message here..."
              sx={{ 
                mr: 1,
                '& .MuiInputBase-root': {
                  minHeight: '56px',
                  alignItems: 'center',
                  padding: '8px 14px',
                },
                '& .MuiInputBase-input': {
                  maxHeight: '120px',  
                  overflowY: 'auto',
                },
              }}
              inputRef={inputRef}
              InputProps={{
                sx: {
                  alignItems: 'center',
                },
              }}
            />
            <IconButton
              type="submit"
              color="primary"
              disabled={isLoading}
              sx={{ height: "fit-content" }}
            >
              {isLoading ? (
                <LoopIcon
                  sx={{
                    animation: "spin 2s linear infinite",
                    "@keyframes spin": {
                      "0%": {
                        transform: "rotate(360deg)",
                      },
                      "100%": {
                        transform: "rotate(0deg)",
                      },
                    },
                  }}
                />
              ) : (
                <SendIcon />
              )}
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChatApp;
