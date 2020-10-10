import React, { useEffect, useState } from 'react';
import './sidebar-chat.css';
import Avatar from "@material-ui/core/Avatar";
import { IChat } from '../../types/chat';
import {useStateValue} from "../state-provider";
import { setChatAction } from '../../state/types';
import { db, IDocs } from '../../firebase';
import { IMessage } from '../../types/message';
import * as timeago from "timeago.js";

interface IProps {
  chat: IChat;
}

const SidebarChat = (props: IProps) => {
  console.log(`sidebarchat props.chat.id=${props.chat.id}`)
  const {state, dispatch} = useStateValue();
  const [chatInfo, setChatInfo] = useState<IMessage|undefined>();

  const setLastMsg = (docs: IDocs) => {
    let msg: IMessage|undefined=undefined;
    console.log(`setLastMsg = `)
    console.dir(docs)
    if(docs && docs.length>0) {
      const d = docs[0].data();      
      msg = {
        id: docs[0].id,
        text: d.text,
        timestamp: d.timestamp,
        userId: d.userId,
        userName: d.userName,
        userPhoto: d.userPhoto,
        userEmail: d.userEmail
      };
      console.log(`msg=`)
      console.dir(msg)

    }    
    setChatInfo(msg);
  };

  useEffect( () => {
    db.collection("chats")
      .doc(props.chat.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot( (snapshot) => setLastMsg(snapshot.docs));
  }, [props.chat]);

  const chatClick = () => {
    dispatch(setChatAction(props.chat));
  }

  let ts;
  if(chatInfo && chatInfo.timestamp) {
    ts = timeago.format( new Date(chatInfo.timestamp) );
  }

  return (
    <div 
      className="sidebar-chat"
      onClick={ () => chatClick() }
    >
      <Avatar />
      <div className="sidebar-chat-info">
        <h3>{props.chat.chatName}</h3>
        <p>{chatInfo?.text}</p>
        <small className="sidebar-timestamp">
          { ts }
        </small>
      </div>
    </div>
  );
}

export default SidebarChat;
