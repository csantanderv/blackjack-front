import React, { createContext } from 'react';
import * as firebase from 'firebase';
import { useContext } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyAZ7ujuqbJP8bkf0k6IQIxa_hldnLEcKbs',
  authDomain: 'blackjack-back-firebase.firebaseapp.com',
  databaseURL: 'https://blackjack-back-firebase.firebaseio.com',
  projectId: 'blackjack-back-firebase',
  storageBucket: 'blackjack-back-firebase.appspot.com',
  messagingSenderId: '638981064621',
  appId: '1:638981064621:web:0c8e6c535d2407f407c324',
};

firebase.initializeApp(firebaseConfig);

export const FirebaseContext = createContext<any | null>(null);
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const authFirebase = firebase.auth();
const firestoreFirebase = firebase.firestore();

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider: React.FC = ({ children }) => {
  return (
    <FirebaseContext.Provider
      value={{ googleAuthProvider, authFirebase, firestoreFirebase }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
