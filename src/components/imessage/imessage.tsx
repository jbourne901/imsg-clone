import React from 'react';
import './imessage.css';
import Sidebar from "../sidebar";
import Chat from "../chat";

const IMessage = () => {
  return (
    <div className="imessage">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default IMessage;
