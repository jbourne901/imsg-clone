import { IUser } from "../types/user";
import { IChat } from "../types/chat";

export interface IState {
    user?: IUser;
    chat?: IChat;
};

export const initialState: IState = {
};

export enum IActionType {
    LOGIN="LOGIN",
    LOGOUT="LOGOUT",
    SET_CHAT="SET_CHAT"
};

export interface IAction {
    type: IActionType;
    user?: IUser;
    chat?: IChat;
}

export const loginAction = (user: IUser) => {
    const a: IAction = {
        type: IActionType.LOGIN,
        user
    };
    return a;
}

export const logoutAction = () => {
    const a: IAction = {
        type: IActionType.LOGOUT
    };
    return a;
}

export const setChatAction = (chat: IChat) => {
    const a: IAction = {
        type: IActionType.SET_CHAT,
        chat
    };
    return a;
}

export type IReducer = (state: IState, action: IAction) => IState;

export interface IReducerDispatch {
    state: IState;
    dispatch: React.Dispatch<IAction>;
};
