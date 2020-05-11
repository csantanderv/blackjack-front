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
        name: action.payload.name,
        profile: action.payload.profile,
      };
    case ActionTypes.Error:
      return {
        ...state,
        isError: action.payload.isError,
        msgError: action.payload.msgError,
      };

    default:
      return state;
  }
};
