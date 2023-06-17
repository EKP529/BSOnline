import React from 'react';
import './login.css';
import Button from 'react-bootstrap/Button';
import {MessageDialog} from './messageDialog';

export function Unauthenticated(props) {
  const [username, setUsername] = React.useState(props.username);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({username: username, password: password}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('username', username);
      props.onLogin(username);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <>
      <div>
        <div>
          <input
            id="username"
            className="input-group-text"
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username Here..."
          />
        </div>
        <div>
          <input
            id="password"
            className="input-group-text"
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password Here..."
          />
        </div>
        <Button
          className="btn btn-light btn-outline-dark"
          id="login"
          onClick={() => loginUser()}
        >Login</Button>
        <Button
          className="btn btn-light btn-outline-dark"
          id="register"
          onClick={() => createUser()}
        >Register</Button>
      </div>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
