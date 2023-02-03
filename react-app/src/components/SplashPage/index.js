import sheep from '../../assets/sheep.png'
import './Splash.css'
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../auth/LoginFormModal';
import SignUpFormModal from '../auth/SignUpFormModal';

const SplashPage = () => {
    return (
        <div className='welcome-container'>
            <h1 className='welcome'>Welcome to dreamy note</h1>
            <div className='sheep-splash'>
                    <img className='user-sheep-img' alt='sheep icon' src={sheep} />
            </div>
            <p>Here is some information about this website and how to use it!</p>
            <p>Here's a list of the technologies used to build it!</p>
            <p>Here's my contact information displayed nicely!</p>
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