
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginPage } from './Pages/LoginPage';
import { HomePage } from './Pages/HomePage';
import { SignupPage } from './Pages/SignupPage';
import { ResetPasswordMailingPage } from './Pages/ResetPasswordMailingPage';
import { NewPasswordPage } from './Pages/NewPasswordPage';
import { ResetPassVerifyLinkPage } from './Pages/ResetPassVerifyLinkPage';
import { isUser } from './handlers/auth';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/signup" element={ isUser() ? <Navigate to="/" /> : <SignupPage /> } />
        <Route path="/login" element={ isUser() ? <Navigate to="/" /> : <LoginPage /> } />
        <Route path="/resetpassword" element={isUser() ? <Navigate to="/" /> : <ResetPasswordMailingPage /> } />
        <Route path="/resetpasswordlink" element={isUser() ? <Navigate to="/" /> : <ResetPassVerifyLinkPage /> } />
        <Route path="/resetpassword/setnewpassword" element={isUser() ? <Navigate to="/" /> : <NewPasswordPage /> } />
      </Routes>
    </>
  )
};

export default App
