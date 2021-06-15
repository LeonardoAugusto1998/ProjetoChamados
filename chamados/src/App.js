
import 'react-toastify/dist/ReactToastify.css';
import  AuthProvider from './contexts/auth';
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { ToastContainer } from 'react-toastify';


export default function App(){
  
  return(
    <AuthProvider>
      <BrowserRouter>
      <ToastContainer autoClose={3500}/>
        <Routes/>
      </BrowserRouter>
    </AuthProvider>
  );
}

