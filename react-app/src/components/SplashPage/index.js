import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authenticate } from '../../store/session';
import sheep from '../../assets/sheep.png'
import './Splash.css'
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../auth/LoginFormModal';
import SignUpFormModal from '../auth/SignUpFormModal';
import { Redirect } from 'react-router-dom';
import SplashCarousel from './SplashCarousel';

const SplashPage = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
        })();
    }, [dispatch]);

    if (sessionUser) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div className='welcome-container'>
            <h1 className='welcome'>Welcome to DreamyNote</h1>
            <div className='sheep-splash'>
                <img className='user-sheep-img' alt='sheep icon' src={sheep} />
            </div>
          <SplashCarousel />
            <div className='logged-out-nav flex'>
                <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignUpFormModal />}
                />
                <OpenModalButton
                    buttonText="Log In"
                    modalComponent={<LoginFormModal />}
                />
            </div>
        </div>
    )
}

export default SplashPage;


/* <h1 className='welcome'>Welcome to DreamyNote</h1>
            <div className='sheep-splash'>
                    <img className='user-sheep-img' alt='sheep icon' src={sheep} />
            </div>
            <div className='welcome-about'>
                Discover the power of your subconscious with DreamyNote, a dream journaling app. 
                Dive into a world of self-discovery as you explore your innermost thoughts, emotions, and desires. 
                Keeping track of your dreams has never been easier!
            </div>
            <div className='logged-out-nav flex'>
                <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignUpFormModal />}
                />
                <OpenModalButton
                    buttonText="Log In"
                    modalComponent={<LoginFormModal />}
                />
            </div>
            <div className='welcome-techs'>
                Technologies used:
                <ul>
                    <li>JavaScript/ Nodejs</li>
                    <li>Python</li>
                    <li>Flask</li>
                    <li>React/ Redux</li>
                    <li>Quilljs</li>
                    <li>SQLAlchemy/ Alembic</li>
                    <li>SQLite/ PostgreSQL</li>
                </ul>
            </div>
            <div className='welcome-about-links flex'>
                Created by Alex Vance
                <a href='https://www.linkedin.com/in/alex-vance-503537234/'><i className="fa-brands fa-linkedin"></i></a>
                <a href='https://github.com/alexvance9/dreamy-note'><i className="fa-brands fa-github"></i></a>
          </div> */