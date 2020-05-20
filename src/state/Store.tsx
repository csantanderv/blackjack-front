import React, { createContext, useReducer, Dispatch } from 'react';
import { gameReducer } from './Reducer';
import { InitialStateType, GameActions } from './StoreTypes';

const initialState = {
  name: '',
  email: '',
  profile: '',
  token: '',
  isAuth: false,
  isError: false,
  msgError: '',
  newGame: false,
  players: [],
  currentPlayer: null,
  bank: null,
  socket: null,
};

export const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<GameActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
