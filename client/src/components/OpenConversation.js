import React, {useState, useCallback} from "react";
import {Form, InputGroup, Button} from "react-bootstrap";
import {useConversations} from "../contexts/ConversationsProvider";
import {bgImage} from "../images/Soothe_logo.jpeg";
import {ListGroup} from "react-bootstrap";
import {useContacts} from "../contexts/ContactsProvider";
import Navbar from "react-bootstrap/Navbar";
export default function OpenConversation() {
  const [text, setText] = useState("");
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({smooth: true});
    }
  }, []);
  const {conversations, sendMessage, selectedConversation} = useConversations();

  function handleSubmit(e) {
    e.preventDefault();

    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText("");
  }
  // style={{
  //   backgroundImage:
  //     "url(" +
  //     "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" +
  //     ")",
  //   backgroundSize: "cover",
  // }}

  // {
  /* <img src="bgImage"></img> */
  // }
  return (
    <div className="d-flex flex-column flex-grow-1">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Soothe</Navbar.Brand>
      </Navbar>

      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {/* <div
            
          > */}
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${
                  message.fromMe
                    ? "align-self-end align-items-end"
                    : "align-items-start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.fromMe ? "bg-primary text-white" : "border"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    message.fromMe ? "text-right" : ""
                  }`}
                >
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{height: "75px", resize: "none"}}
            />
            <InputGroup.Append>
              <Button style={{backgroundColor: "#"}} type="submit">
                Send
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
      {/* </div> */}
    </div>
  );
}
