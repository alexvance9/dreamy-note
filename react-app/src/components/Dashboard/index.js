// import sheep from '../../assets/sheep.png'
import parse from 'html-react-parser';
import { useSelector } from 'react-redux'
import moment from "moment"
import './Dashboard.css'

const Dashboard = () => {

    // random dream
    const dreams = useSelector(state => state.session.user.dreams)
    // console.log(dreams)
    const randomDream = dreams[Math.floor(Math.random()*dreams.length)];
    console.log(randomDream)
    
   
        return (
        <div className="dashboard-container ">
            <div className="dashboard-header">
                <h2>Welcome to DreamyNote</h2>
                <div className='divider'></div>
                <div className='today'>Today is {moment().format('dddd MMMM Do, YYYY')}</div>
            </div>
            <div className="widget-container">
                <div className="dream-widget">
                    <h3>Remember this Dream?</h3>
                        <div className='divider'></div>
                    <h4>{randomDream.title}</h4>
                    <div>{moment(randomDream.date, "YYYY-MM-DD").format("MM/DD/YYYY")}</div>
                    <div className='dream-widget-body'>{parse(randomDream.body)}</div>
                </div>
                <div className="tags-widget">
                    <h3>Coming Soon</h3>
                     <div className='divider'></div>
                    <div>Track recurring themes in your Dreams with tags!</div>
                </div>
            </div>
        </div>
    
    )
}

export default Dashboard;