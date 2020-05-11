import { string } from 'prop-types';

export type InitialStateType = {
  name: string;
  token: string;
  email: string;
  profile: string;
  isAuth: boolean;
  isError: boolean;
  msgError: string;
};

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum ActionTypes {
  Login = 'LOGIN',
  GameBoard = 'SHOW_GAME_BOARD',
  Error = 'ERROR',
  UserLoaded = 'USER_LOADED',
}

export type GamePayload = {
  [ActionTypes.Login]: {
    token: string;
  };
  [ActionTypes.Error]: {
    isError: boolean;
    msgError: string;
  };
  [ActionTypes.UserLoaded]: {
    profile: string;
    name: string;
  };
};

export type GameActions = ActionMap<GamePayload>[keyof ActionMap<GamePayload>];
