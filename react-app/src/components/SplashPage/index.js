import sheep from '../../assets/sheep.png'
import './Splash.css'

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
        </div>
    )
}

export default SplashPage;