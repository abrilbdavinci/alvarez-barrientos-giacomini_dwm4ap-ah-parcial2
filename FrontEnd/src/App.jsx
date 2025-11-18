// src/App.jsx
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Contact from "./views/Contact";
import Details from "./views/Details";
import Login from "./views/Login";
import Registro from "./views/Registro";
import NotFound from "./views/NotFound";
import Perfil from "./views/Perfil";

import { PrivateRoute } from "./utils/PrivateRoute";
import { AuthProvider } from "./utils/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app-root">

      <AuthProvider>
        <Navbar />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/perfil"
              element={
                <PrivateRoute>
                  <Perfil />
                </PrivateRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </AuthProvider>

      <footer className="app-footer">
        <small>LabSkin • Proyecto MERN • Frontend</small>
      </footer>
    </div>
  );
}

export default App;
