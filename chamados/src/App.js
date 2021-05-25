
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";


export default function App() {
  
  return(
    <div>
      <BrowserRouter>
      <Routes/>
      </BrowserRouter>
    </div>
  );
}

