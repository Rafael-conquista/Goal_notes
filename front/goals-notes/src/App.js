import Initial from "./pages/initial_page/initial_page"
import Home from "./pages/homepage/homepage"
import Goals from "./pages/goals/goals"
import CapCreate from "./pages/CapCreate/CapCreate";
import Amigos from "./pages/amigos/amigos";
import Perfil from "./pages/perfil/perfil";
import Store from "./pages/store/store";
import { Route,Routes, BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { verify } from "./utils/token_verify";
import React, { useEffect } from 'react';
import Posts from "./pages/GoalPosts/posts";
import Feedback from "./pages/Feedback/index";


  function App() {
    useEffect(() => {
      const intervalId = setInterval(() => {
        const token = localStorage.getItem('token');
        verify(token);
        console.log('estou verificando o token');
      }, 600000);
  
      return () => clearInterval(intervalId);
    }, []);
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Initial />}></Route>
          <Route path="/:id/Home" element={<Home />}></Route>
          <Route path="/:id/Goals" element={<Goals />}></Route>
          <Route path="/CapCreate" element={<CapCreate />}></Route>
          <Route path="/:id/Amigos" element={<Amigos />}></Route>
          <Route path="/:id/Perfil" element={<Perfil />}></Route>
          <Route path="/:id/store" element={<Store />}></Route>
          <Route path="/:id/posts" element={<Posts />}></Route>
          <Route path="/:id/feedback" element={<Feedback />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
