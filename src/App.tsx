import './App.css'
import { Route, Routes, useNavigate } from 'react-router'
import { MainPage } from './pages/MainPage'
import { QuizPage } from './pages/QuizPage'
import { ErrorPage } from './pages/ErrorPage'
// import NotesPage from './pages/NotesPage'
import { OverviewQuizzesPage } from './pages/OverviewQuizzesPage'
// import { Button, Menu } from 'antd'
// import { Header } from 'antd/es/layout/layout'

import "remark-callouts/styles.css";
import { useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { FirebaseContext, IFirebaseContext } from './context/firebase.ts'
import { getFirestore } from 'firebase/firestore'
// import * as firebaseui from 'firebaseui'
import { AccountPage } from './pages/AccountPage'
// import { UserOutlined } from '@ant-design/icons'

const menuItems = [
  {
    key: '/',
    label: 'Main'
  },
  {
    key: '/q',
    label: 'Quizzes'
  },
  {
    key: '/n',
    label: 'Notes'
  }
]

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6HiJDKox3olYrugwlsROxShUZCLOsHvU",
  authDomain: "uzbek-d3ba1.firebaseapp.com",
  databaseURL: "https://uzbek-d3ba1-default-rtdb.firebaseio.com",
  projectId: "uzbek-d3ba1",
  storageBucket: "uzbek-d3ba1.firebasestorage.app",
  messagingSenderId: "510006873802",
  appId: "1:510006873802:web:60e878a931ccaa77266e33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const ui = null;
// const ui = new firebaseui.auth.AuthUI(auth);
const firebaseState: IFirebaseContext = {
  db, auth, ui
};

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(() => {
      console.log("User is logged in now");
      // setUser(user_);
      // if(user_){
      //   getDoc(doc(db!, `/users/${user_.uid}`))
      //   .then((doc_) => {
      //     if (!doc_.exists().valueOf()){
      //       console.log("New profile");
      //       setDoc(doc(db!, `/v2-users/${user_.uid}`), {
      //         name: user_!.displayName,
      //         avatar: user_!.photoURL,
      //         bio: ""
      //       } as IUserProfile);
      //     }
      //   });
      // }
      // else{
      //   setUserProfile(undefined);
      // }
    });
  }, []);

  return (
    <FirebaseContext.Provider value={firebaseState}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: "flex-start" }}>
        {/* <Header style={{ display: 'flex', alignItems: 'center' }}>
          <h3 className="mr-10 m-0 break-keep text-white" onClick={() => navigate('/')}>ELP</h3>
          <Menu 
            mode="horizontal"
            items={menuItems}
            // selectedKeys={[location.pathname.split('/')[0]]}
            onSelect={({ key }) => navigate(key)}
            inlineCollapsed={false}
          />
          <div className='flex justify-end w-[-webkit-fill-available]'>
            <Button icon={<UserOutlined />} onClick={() => navigate('/m')}/>
          </div>
        </Header> */}
        <div className='h-full overflow-y-scroll flex flex-col justify-between'>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path='/q' element={<OverviewQuizzesPage />} />
            <Route path='/q/:quizId' element={<QuizPage />} />
            {/* <Route path='/n' element={<NotesPage />} /> */}
            <Route path='/e' element={<ErrorPage />} />
            <Route path='/m' element={<AccountPage />} />
          </Routes>
          {/* <Footer>
            <p>Made by Andrew Danilchenko</p>
          </Footer> */}
        </div>
      </div>
    </FirebaseContext.Provider>
  )
}

export default App
