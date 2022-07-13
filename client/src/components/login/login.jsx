import './login.css';
import { useState } from 'react';

const Login = ({ setName }) => {
  const [input, setInpus] = useState('');

  const onInputChance = (e) => {
    setInpus(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setName(input);
  };

  return (
    <div className="login full-screen centerd-column white">
      <div className="blue box centerd-column white-font">
        <div className="logo"></div>
        <form className="login-form centerd-column">
          <h1>Welcome!</h1>

          <label htmlFor="name" className="m-font">
            Please enter your nickname
          </label>
          <input
            name="name"
            type="text"
            value={input}
            onChange={(e) => onInputChance(e)}
            required
          />

          <button
            className="btn"
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            Let's play Mancala!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
