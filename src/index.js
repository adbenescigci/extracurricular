import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./providers/Redux/store";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Programs from "./screens/Programs";
import Program from "./screens/Program";
import Events from "./screens/Events";
import Event from "./screens/Event";
import AddEvent from "./screens/AddEvent";
import NotFound from "./pages/NotFound";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" exact={true} element={<Login />} />
      <Route element={<MainPage />}>
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:id" element={<Program />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<Event />} />
        <Route path="/newEvent" element={<AddEvent />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
