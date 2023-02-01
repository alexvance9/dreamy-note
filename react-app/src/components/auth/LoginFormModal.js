import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { useModal } from "../../context/Modal";
import './auth.css'

const LoginFormModal = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const onLogin = async (e) => {
    e.preventDefault();
    const loginErrors = []
    if (!email) loginErrors.push(['Email is required'])
    if (!password) loginErrors.push(['Password is required'])
    if (!loginErrors.length){
      setErrors([])
      const data = await dispatch(login(email, password));
      if (data) {
        return setErrors(data);
      }
      return closeModal()
    }
    return setErrors(loginErrors)
    }

  const handleDemo = async (e) => {
    e.preventDefault();
    const demoEmail = 'demo@aa.io'
    const demoPassword = 'password'

    const data = await dispatch(login(demoEmail, demoPassword))
    if (data) {
      setErrors(data)
    }
    await closeModal()
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='login-modal'>
    <form className='login-form' onSubmit={onLogin}>
      <h2>Log In</h2>
      <div className='errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button type='submit'>Login</button>
        <button onClick={handleDemo}>Demo User</button>
      </div>
    </form>
    </div >
  );
};

export default LoginFormModal;
