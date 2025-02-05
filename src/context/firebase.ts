import { Firestore } from "firebase/firestore";
import { Auth, User } from 'firebase/auth';
import React from "react";
import * as firebaseui from 'firebaseui'

export interface IFirebaseContext{
    db?: Firestore;
    ui?: firebaseui.auth.AuthUI;
    auth?: Auth;
    user?: User;
}

export const FirebaseContext = React.createContext<IFirebaseContext>({
    db: undefined
});