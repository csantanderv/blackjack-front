export type CarType = {
  card: string;
  hidden: boolean;
};

export type PlayerType = {
  id: string;
  name: string;
  profile: string;
  totalAmountLost: number;
  hiting: boolean;
  standing: boolean;
  betAmount: number;
  currentResult: 'LOSER' | 'WINNER' | 'PLAYING' | undefined | null | string;
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
  connectedUser: PlayerType | null;
  socket: SocketIOClient.Socket | null;
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
  Logout = 'LOGOUT',
  ConnectSocket = 'CONNECT_SOCKET',
  SetPlayers = 'SET_PLAYERS',
  SetBank = 'SET_BANK',
  SetCurrentPlayer = 'SET_CURRENT_PLAYER',
  SetConnectedUser = 'SET_CONNECTED_USER',
}

export type GamePayload = {
  [ActionTypes.Login]: {
    token: string;
  };
  [ActionTypes.Logout]: {
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
  [ActionTypes.ConnectSocket]: {
    socket: SocketIOClient.Socket;
  };
  [ActionTypes.SetPlayers]: {
    players: PlayerType[];
  };
  [ActionTypes.SetCurrentPlayer]: {
    currentPlayer: PlayerType;
  };
  [ActionTypes.SetBank]: {
    bank: PlayerType;
  };
  [ActionTypes.SetConnectedUser]: {
    connectedUser: PlayerType;
  };
};

export type GameActions = ActionMap<GamePayload>[keyof ActionMap<GamePayload>];
