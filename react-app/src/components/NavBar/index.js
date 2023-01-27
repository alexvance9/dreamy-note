
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../auth/LoginFormModal';
import SignUpFormModal from '../auth/SignUpFormModal';
import './NavBar.css'
import owl from '../../assets/owl.png'



const NavBar = ({loaded}) => {

  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='logged-in-nav'>
        <div className='linavtop flexcol'>
          <div className='flex user'>
            <div className='owl-icon'>
              <img className='user-owl-img' alt='owl icon' src={owl} />
            </div>
            <div className='username'>Hello, {sessionUser.username}.</div>
          </div>
          <div className='logout-button'>
            <LogoutButton />
          </div>
        </div>
        <div className='linavlower flexcol'>
          <div className='new-dream-button flex'>
            <NavLink to='/dreams/new'>
            <i className="fa-solid fa-plus"></i>
              New Dream
            </NavLink>
          </div>
          <div className='tab flex'>
            <i className="fa-solid fa-house-chimney"></i>
            <NavLink to='/dashboard'>
              Dashboard
            </NavLink>
          </div>
          <div className='tab flex'>
            <i className="fa-solid fa-moon"></i>
            <NavLink to='/dreams'>
              My Dreams
            </NavLink>
          </div>
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className='logged-out-nav flex'>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignUpFormModal />}
        />
      </div>
    );
  }

  return (
    <nav className={sessionUser ? 'app-nav' : 'splash-nav'}>
          {loaded && sessionLinks}
    </nav>
  );
}

export default NavBar;
