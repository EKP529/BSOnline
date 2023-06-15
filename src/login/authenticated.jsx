import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('username');
        props.onLogout();
      });
  }

  return (
    <div>
      <div className='playerName'>{props.username}</div>
      <Button
        className="btn btn-light btn-outline-success"
        onClick={() => navigate('/lobby')}
      >Play</Button>
      <Button
        className="btn btn-danger btn-outline-light"
        onClick={() => logout()}
      >Logout</Button>
    </div>
  );
}
