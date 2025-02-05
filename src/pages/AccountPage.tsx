import { useContext, useEffect } from "react";
import { FirebaseContext } from "../context/firebase";
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";


export function AccountPage(){
    const { ui, auth } = useContext(FirebaseContext);
    
    useEffect(() => {
        if(ui && auth?.currentUser == null){
            const uiConfig = {
                callbacks: {
                  signInSuccessWithAuthResult: function() {
                    return false;
                  },
                  uiShown: function() {
                    console.log("UI shown");
                  }
                },
                signInOptions: [
                  GoogleAuthProvider.PROVIDER_ID,
                  EmailAuthProvider.PROVIDER_ID,
                ],

            } as firebaseui.auth.Config;
            let fui = document.getElementById('#firebaseui-auth-container');
            if (fui)
                fui.style.display = 'inherit';
            ui.start('#firebaseui-auth-container', uiConfig);

        }
    }, [ui, auth]);

    if(auth?.currentUser != null){
        return <div className="p-4">
            <p>Привет, {auth.currentUser.displayName}! Аккаунт на сайте нужен, чтобы сохранять прогресс прохождения тестов.</p>
        </div>;
    }
    else{
        return <div>
            <div id='firebaseui-auth-container'></div>
        </div>
    }
}