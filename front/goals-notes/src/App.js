import Initial from "./pages/initial_page/initial_page"
import Home from "./pages/homepage/homepage"
import Goals from "./pages/goals/goals"
import CapCreate from "./pages/CapCreate/CapCreate";
import Amigos from "./pages/amigos/amigos";
import Perfil from "./pages/perfil/perfil";
import UserUpdate from "./pages/userUpdate/userUpdate"
import { Route,Routes, BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Initial />}></Route>
          <Route path="/:id/Home" element={<Home />}></Route>
          <Route path="/:id/Goals" element={<Goals />}></Route>
          <Route path="/CapCreate" element={<CapCreate />}></Route>
          <Route path="/:id/UserUpdate" element={<UserUpdate />}></Route>
          <Route path="/:id/Amigos" element={<Amigos />}></Route>
          <Route path="/:id/Perfil" element={<Perfil />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
