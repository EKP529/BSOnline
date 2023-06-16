import React from "react";
import './lobby.css';
import './username'
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
import {randomUsername} from "./username";

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, milliseconds);
  });
}
export function Lobby() {
  const navigate = useNavigate();
  const opps = [
    'Waiting on player...',
    'Waiting on player...',
    'Waiting on player...'
  ];
  const [player, setPlayer] = React.useState('???');
  const [opponents, setOpponents] = React.useState(opps);
  React.useEffect(() => {
    async function setPlayers() {
      await delay(2000);
      setPlayer(localStorage.getItem('username') ?? 'Mystery player');
      let i = 0;
      for (const el of document.querySelectorAll('.opponent > .username')) {
        await delay(1000);
        const username = randomUsername();
        opps[i] = username;
        el.textContent = username;
        i++;
      }
    }
    setPlayers().then((onResolved) => {
      setOpponents(opps);
      localStorage.setItem('oppUsernames', JSON.stringify(opps));
    });
  }, []);
  return (
    <main className="container-fluid text-center">
      <div>
        <h2>Game Lobby</h2>
        <br/>
          <table>
            <thead>
            <tr>
              <th></th>
              <th><u>Players</u></th>
            </tr>
            </thead>
            <tbody>
            <tr className="currUser">
              <td>1.</td>
              <td className="username">{player}</td>
            </tr>
            <tr className="opponent">
              <td>2.</td>
              <td className="username">{opponents[0]}</td>
            </tr>
            <tr className="opponent">
              <td>3.</td>
              <td className="username">{opponents[1]}</td>
            </tr>
            <tr className="opponent">
              <td>4.</td>
              <td className="username">{opponents[2]}</td>
            </tr>
            </tbody>
          </table>
          <br/>
          <Button
            className="btn btn-light btn-outline-dark"
            onClick={() => navigate('/play')}
          >Start Game</Button>
      </div>
    </main>
  );
}