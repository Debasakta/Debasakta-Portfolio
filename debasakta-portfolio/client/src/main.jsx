import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {GoogleOAuthProvider} from '@react-oauth/google'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1089560713289-538805hredvadnrsdskpbom39hootsjt.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
)