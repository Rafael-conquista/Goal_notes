import './App.css';
import Initial from "./pages/initial_page/initial_page"
import Home from "./pages/homepage/homepage"
import Goals from "./pages/goals/goals"
import { Route,Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Initial />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/Goals" element={<Goals />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
