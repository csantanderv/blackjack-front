export type CarType = {
  card: string;
  hidden: boolean;
};

export type PlayerType = {
  id: string;
  name: string;
  profile: string;
  playing: boolean;
  totalAmountLost: number;
  betAmount: number;
  currentResult: 'LOSER' | 'WINNER' | 'PLAYING' | undefined | string;
  cards: CarType[];
};

export type InitialStateType = {
  name: string;
  token: string;
  email: string;
  profile: string;
  isAuth: boolean;
  isError: boolean;
  msgError: string;
  newGame: boolean;
  players: PlayerType[];
  currentPlayer: PlayerType | undefined;
  currentBank: PlayerType | undefined;
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
  NewGame = 'NEW_GAME',
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
  [ActionTypes.NewGame]: {
    newGame: boolean;
    players: PlayerType[];
  };
};

export type GameActions = ActionMap<GamePayload>[keyof ActionMap<GamePayload>];
