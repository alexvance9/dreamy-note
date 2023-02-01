import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { useModal } from "../../context/Modal";
import "./auth.css"

const SignUpFormModal = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const hasWhiteSpace = (input) => {
    const whiteSpaceRegex = /\s+/g
    const whiteSpaceCheck = input.replace(whiteSpaceRegex, "")
    return input !== whiteSpaceCheck
  }

  const onSignUp = async (e) => {
    e.preventDefault();
    const signupErrors = []
    if (hasWhiteSpace(username)) signupErrors.push(['Username cannot have whitespace'])
    if (username.length > 25) signupErrors.push(['Username must have 20 characters or less'])
    if (hasWhiteSpace(email)) signupErrors.push(['Email cannot have whitespace'])
    if (hasWhiteSpace(password)) signupErrors.push(['Password cannot have whitespace'])
    if (password !== repeatPassword) signupErrors.push(['Repeat password does not match'])

    
    if (!signupErrors.length) {
      setErrors([])
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        return setErrors(data)
      }
      return closeModal()
    }
    console.log(signupErrors)
    return setErrors(signupErrors)
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='signup-modal'>
    <form className='signup-form' onSubmit={onSignUp}>
      <h2>Sign Up </h2>
      <ul className='errors'>
        {errors.map((error, ind) => (
          <li key={ind}>{error}</li>
        ))}
      </ul>
      <div className='flexcol'>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
        <div className='flexcol'>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
        <div className='flexcol'>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
        <div className='flexcol'>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
    </div>
  );
};

export default SignUpFormModal;
