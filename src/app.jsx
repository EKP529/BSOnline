import React from "react";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import {Login} from './login/login';
import { AuthState } from './login/authState';
import {Lobby} from './lobby/lobby';
import {Play} from './play/play';
import {WinRecords} from './winRecords/winRecords';
import {About} from './about/about';

function NotFound() {
  return (
    <main className="container-fluid text-center">
      <h1>404: Return to Sender. Address Unknown</h1>
    </main>
  );
}
export default function App() {
  const [username, setUsername] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = username ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  return (
    <BrowserRouter>
      <div className="app bg-light">
        <header className="bg-dark container-fluid">
          <nav className="navbar navbar-dark">
            <NavLink className="navbar-brand" to="">BSOnline<sup>&reg;</sup></NavLink>
            <menu className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="winRecords">Win Records</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="about">About</NavLink>
              </li>
            </menu>
          </nav>
        </header>
        <Routes className='routes'>
          <Route path='/' element={
            <Login
              username={username}
              authState={authState}
              onAuthChange={(username, authState) => {
                setAuthState(authState);
                setUsername(username);
              }}
            ></Login>
          } exact>
          </Route>
          <Route path='/winRecords' element={<WinRecords></WinRecords>}></Route>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='*' element={<NotFound></NotFound>}></Route>
        </Routes>
        <footer className="bg-dark text-muted">
          <div className="container-fluid text-light">
            <span>Author Name: &nbsp; Eden Paupulaire</span>
            <a href="https://github.com/EKP529/startup">GitHub</a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}