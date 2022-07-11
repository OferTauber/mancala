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
    <div className="login">
      <form>
        <div>
          <label for="name">Nickname</label>
          <input
            name="name"
            type="text"
            value={input}
            onChange={(e) => onInputChance(e)}
            required
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
