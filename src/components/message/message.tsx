import React, {forwardRef, MutableRefObject} from 'react';
import './message.css';
import {IMessage} from "../../types/message";
import Avatar from "@material-ui/core/Avatar";
import { useStateValue } from '../state-provider';
import * as timeago from "timeago.js";

//type IRef<T> = ((instance: T | null) => void) | MutableRefObject<T | null> | null;
interface IProps {
  message: IMessage;
  ref?: any;
}

const MessageInternal = (props: IProps) => {
  const {state} = useStateValue();
  let style1="";
  let style2="message-photo";
  let style3="";
  if(props.message.userEmail === state.user?.email) {
    style1="message-sender";
    style2="message-sender-photo";
    style3="message-sender-text";
  }

  console.log(`MessageInternal ref=${typeof props.ref}`)
  console.dir(props.ref)

  return (

    <div  className={`message ${style1}`}
          ref={props.ref}
    >
      <Avatar 
        src={props.message.userPhoto}
        className={style2}
      />
      <p className={`message-text ${style3}`}>{props.message.text}</p>
      <small className="message-ts">
          {timeago.format( new Date(props.message.timestamp), "en-US") }
      </small>
    </div>
  );
}


const Message = forwardRef((props: IProps, ref) => MessageInternal({...props, ref}));
export default Message;
