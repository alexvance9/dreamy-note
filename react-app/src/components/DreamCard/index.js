import parse from 'html-react-parser';
import './DreamCard.css';
import moment from 'moment';

const DreamCard = ({dream}) => {

    
    const dateHandler = (str) => {
    //    console.log(str)
        const handled = moment(str, 'YYYY-MM-DD').format("MM/DD/YYYY")
        return handled
    }

    if (!dream) return null

    return (
        
        <div className="dream-card">
            <div className='card-title'>{dream.title}</div>
            <div className='card-body'>{parse(dream.body)}</div>
            <div className='card-date'>{dateHandler(dream.date)}</div>
        </div>
        

    )
}

export default DreamCard;