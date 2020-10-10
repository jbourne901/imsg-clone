import React, {useState, useEffect} from 'react';
import './chat.css';
import IconButton from '@material-ui/core/IconButton';
import MicNone from "@material-ui/icons/MicNone";
import Message from "../message";
import {IMessage, testMessages} from "../../types/message";
import {db, IDocs, serverTs} from "../../firebase";
import {useStateValue} from "../state-provider";
import FlipMove from "react-flip-move";


const Chat = () => {

  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>(testMessages);
  const {state} = useStateValue();
  const chatName = state.chat?.chatName;
  const chatId = state.chat?.id;

  const setChatInfo = (snapshot: IDocs) => {
    const msgs: IMessage[] = 
      snapshot.map(doc => {
                            const data = doc.data();
                            return { id: doc.id,
                                     text: data.text,
                                     timestamp: data.timestamp,
                                     userId: data.userId,
                                     userName: data.userName,
                                     userPhoto: data.userPhoto,
                                     userEmail: data.userEmail
                                   };
                          }                  
      );
      setMessages(msgs);
  };

  useEffect( () => {
    if(chatId) {
      db.collection("chats").doc(chatId)
                            .collection("messages")
                            .orderBy("timestamp", "desc")
                            .onSnapshot( (snapshot) => setChatInfo(snapshot.docs))
    } else {
      setMessages([]);
    }
  }, [chatId])

  const sendMessage = (e: React.MouseEvent) => {
    console.log(`send msg ${input} ${chatId}`)
    e.preventDefault();
    if(input && chatId && state.user?.uid && state.user?.email) {
      const ts = new Date().getTime();
      console.log(ts);
      const msg: IMessage = {
        id: ""+((messages?.length||0)+1),
        text: input,
        timestamp: ts,
        userId: state.user.uid,
        userEmail: state.user.email,
        userPhoto: state.user.photo||undefined,
        userName: state.user.displayName||state.user.uid
      };      
      db.collection("chats").doc(chatId).collection("messages").add(msg);
      setInput("");
    }
  };

  
  return (
    <div className="chat">
      <div className="chat-header">
        <h4 className="chat-to"> To:   
            <span className="chat-name">
                {chatName}
            </span>
        </h4>
        <strong>Details</strong>
      </div>

      <div className="chat-messages">
        <FlipMove>
          {messages.map( (m) => ( <Message key={m.id} message={m} /> ) )}
        </FlipMove>        
      </div>

      <div className="chat-input-container">
        <form className="chat-form">
          <input
            className="chat-input"
            type="text"
            placeholder="Type message"
            onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            value={input}
          />
          <button
            className="chat-button"
            onClick = {(e: React.MouseEvent) => sendMessage(e)}
          >
            Send Message
          </button>
        </form>     

        <IconButton>
          <MicNone className="chat-mic" />
        </IconButton>   
      </div>      
    </div>
  );
}

export default Chat;
