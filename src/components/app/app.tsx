import React, {useEffect} from 'react';
import './app.css';
import IMessage from "../imessage";
import Login from "../login";
import { auth } from "../../firebase";
import {IUser} from "../../types/user";
import { useStateValue } from '../state-provider';
import {loginAction, logoutAction} from "../../state/types";

const App = () => {
  const {state, dispatch} = useStateValue();
  const user = state.user;

  useEffect( () => {
    auth.onAuthStateChanged(authUser => {
      if(authUser) {
        const usr: IUser = {
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }
        dispatch(loginAction(usr))
      } else {
        dispatch(logoutAction());
      }
    })
  }, [dispatch]);

  console.dir(user)

  return (
    <div className="app">
      {user? <IMessage /> : <Login />}
    </div>
  );
}

export default App;
