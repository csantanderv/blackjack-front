import { ActionTypes, InitialStateType, GameActions } from './StoreTypes';

export const gameReducer = (state: InitialStateType, action: GameActions) => {
  switch (action.type) {
    case ActionTypes.Login:
      return {
        ...state,
        token: action.payload.token,
      };
    case ActionTypes.Logout:
      return {
        ...state,
        token: action.payload.token,
      };
    case ActionTypes.UserLoaded:
      return {
        ...state,
        currentPlayer: action.payload.currentPlayer,
      };
    case ActionTypes.Error:
      return {
        ...state,
        isError: action.payload.isError,
        msgError: action.payload.msgError,
      };
    case ActionTypes.NewGame:
      return {
        ...state,
        bank: action.payload.bank,
        players: action.payload.players,
      };
    case ActionTypes.GiveCard:
      return {
        ...state,
        players: action.payload.players,
      };
    case ActionTypes.BankHitCard:
      return {
        ...state,
        bank: action.payload.bank,
      };
    case ActionTypes.BankLoaded:
      return {
        ...state,
        bank: action.payload.bank,
      };
    case ActionTypes.ChangeBet:
      return {
        ...state,
        currentPlayer: action.payload.currentPlayer,
      };
    case ActionTypes.PlayerHitCard:
      return {
        ...state,
        currentPlayer: action.payload.currentPlayer,
      };
    case ActionTypes.ConnectSocket:
      return {
        ...state,
        socket: action.payload.socket,
      };
    case ActionTypes.SetPlayers:
      return {
        ...state,
        players: action.payload.players,
      };
    case ActionTypes.SetBank:
      return {
        ...state,
        bank: action.payload.bank,
      };
    case ActionTypes.SetCurrentPlayer:
      return {
        ...state,
        currentPlayer: action.payload.currentPlayer,
      };
    case ActionTypes.SetConnectedUser:
      return {
        ...state,
        connectedUser: action.payload.connectedUser,
      };
    case ActionTypes.SetStarted:
      return {
        ...state,
        started: action.payload.started,
      };
    case ActionTypes.SetSelectedPlayer:
      return {
        ...state,
        selectedPlayer: action.payload.selectedPlayer,
      };
    default:
      return state;
  }
};
