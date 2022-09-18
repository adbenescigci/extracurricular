import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Programs from "./screens/Programs";
import Program from "./screens/Program";
import Events from "./screens/Events";
import Event from "./screens/Event";
import AddEvent from "./screens/AddEvent";
import AddProgram from "./screens/AddProgram";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<Login />} />
        <Route element={<MainPage />}>
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:id" element={<Program />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<Event />} />
          <Route path="/newProgram" element={<AddProgram />} />
          <Route path="/newEvent" element={<AddEvent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
