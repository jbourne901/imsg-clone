import React, {useState, useEffect} from 'react';
import './sidebar.css';
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";
import RateReviewOutlined from "@material-ui/icons/RateReviewOutlined";
import SidebarChat from "../sidebar-chat";
import {IChat} from "../../types/chat";
import {db, IDocs} from "../../firebase";
import uuid from "../../uuid";
import { useStateValue } from '../state-provider';

const extractChats = (ss: IDocs) => {
  const chs: IChat[] = [];
  ss.forEach((doc) => {
    const data = doc.data();
    chs.push({id: doc.id,
              chatName: data["chatName"]
            });
  });
  return chs;
};

const Sidebar = () => {
  const {state, dispatch} = useStateValue();
  const user = state.user;
  const photo = user?.photo || "";
  const [chats, setChats] = useState<IChat[]>([]);
  
  useEffect(() => {
    db.collection("chats").onSnapshot( (ss) => {
      const chs = extractChats(ss.docs);
      setChats(chs);
    });
  }, []);

  const addChat = () => {
    const chatName = prompt("Please enter a chat name");
    if(chatName) {
      const ch: IChat = {
        id: uuid(),
        chatName
      }
      db.collection("chat").add(ch);
    }  
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar 
          className="sidebar-avatar"
          src={photo}
        />
        <div className="sidebar-input-container">
          <Search />
          <input 
              className="sidebar-input"
              type="text"
              placeholder="Search"
          />
        </div>
        <IconButton className="sidebar-button">
          <RateReviewOutlined />
        </IconButton>      
      </div>      

      <div className="sidebar-chats">
        {chats.map(ch => <SidebarChat key={ch.id} chat={ch} />)}
      </div>
    </div>
  );
}

export default Sidebar;
