import {IState, IAction, IActionType} from "./types";

export const reducer = (prevState: IState, action: IAction) => {
  let nextState = prevState;
  switch(action.type) {
    case IActionType.LOGIN: 
      if(action.user) {
        nextState = {...prevState, user: action.user}
      }     
      break;
    case IActionType.LOGOUT:
      nextState = {...prevState};
      nextState.user=undefined;
      break;
    case IActionType.SET_CHAT:
      if(action.chat) {
        nextState = {...prevState, chat: action.chat};
      }      
      break;
  }
  return nextState;
};

