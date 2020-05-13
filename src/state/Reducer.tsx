import { ActionTypes, InitialStateType, GameActions } from './StoreTypes';

export const gameReducer = (state: InitialStateType, action: GameActions) => {
  switch (action.type) {
    case ActionTypes.Login:
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

    default:
      return state;
  }
};
