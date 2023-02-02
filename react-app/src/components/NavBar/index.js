
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../auth/LoginFormModal';
import SignUpFormModal from '../auth/SignUpFormModal';
import './NavBar.css'
import '../SplashPage/Splash.css'
import sheep from '../../assets/sheep.png'



const NavBar = ({loaded}) => {

  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='logged-in-nav'>
        <div className='linavtop flexcol'>
          <div className='flexcol user'>
            <div className='sheep-icon'>
              <img className='user-sheep-img' alt='sheep icon' src={sheep} />
            </div>
            <div className='username'>Hello, <br/> {sessionUser.username}.</div>
          </div>
          <div className='logout-button'>
            <LogoutButton />
          </div>
        </div>
        <div className='linavlower flexcol'>
          <div className='new-dream-button flex'>
            <NavLink to='/dreams/new'>
              <i id='new-dream-plus' className="fa-solid fa-plus"></i>
              New Dream
            </NavLink>
          </div>
          <div className='tab flex'>
            <i  className="fa-solid fa-house-chimney"></i>
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
          <div className='tab flex'>
            <i className="fa-solid fa-book"></i>
            <NavLink to='/journals'>
              My Journals
            </NavLink>
          </div>
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div></div>
    );
  }

  return (
    <nav className={sessionUser ? 'app-nav' : 'splash-nav'}>
          {loaded && sessionLinks}
    </nav>
  );
}

export default NavBar;
