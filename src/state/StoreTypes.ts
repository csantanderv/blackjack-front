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
  bank: PlayerType | null;
  currentPlayer: PlayerType | null;
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
  GiveCard = 'GIVE_CARD',
  BankHitCard = 'BANK_HIT_CARD',
  BankLoaded = 'BANK_LOADED',
  ChangeBet = 'CHANGE_BET_AMOUNT',
  PlayerHitCard = 'PLAYER_HIT_CARD',
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
    currentPlayer: PlayerType;
  };
  [ActionTypes.NewGame]: {
    players: PlayerType[];
    bank: PlayerType;
  };
  [ActionTypes.GiveCard]: {
    players: PlayerType[];
  };
  [ActionTypes.BankHitCard]: {
    bank: PlayerType;
  };
  [ActionTypes.BankLoaded]: {
    bank: PlayerType | null;
  };
  [ActionTypes.ChangeBet]: {
    currentPlayer: PlayerType;
  };
  [ActionTypes.PlayerHitCard]: {
    currentPlayer: PlayerType;
  };
};

export type GameActions = ActionMap<GamePayload>[keyof ActionMap<GamePayload>];
