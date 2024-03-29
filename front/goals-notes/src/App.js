import Initial from "./pages/initial_page/initial_page"
import Home from "./pages/homepage/homepage"
import Goals from "./pages/goals/goals"
import CapCreate from "./pages/CapCreate/CapCreate";
import { Route,Routes, BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Initial />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/Goals" element={<Goals />}></Route>
          <Route path="/CapCreate" element={<CapCreate />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
