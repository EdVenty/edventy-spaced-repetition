import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import 'firebaseui/dist/firebaseui.css'
import App from './App.tsx'

import store from './store/store.ts'
import { Provider } from 'react-redux'

import { BrowserRouter } from "react-router";
// import { ConfigProvider } from 'antd'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      {/* <ConfigProvider
        theme={{
          // 1. Use dark algorithm
          // algorithm: theme.darkAlgorithm,
    
          // 2. Combine dark algorithm and compact algorithm
          // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        }}
      > */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      {/* </ConfigProvider> */}
    </Provider>
  </StrictMode>,
)
