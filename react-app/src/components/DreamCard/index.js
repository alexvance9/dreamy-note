import parse from 'html-react-parser';
import './DreamCard.css'

const DreamCard = ({dream}) => {

    // function returns date as 'yyyy-mm-dd'
    const dateHandler = (str) => {
        // console.log('this is the date string passed to handler,', str)
        const handled = new Date(str).toISOString().split('T')[0].toString()
        const handledArr = handled.split('-')
        // console.log(handledArr)
        const prettyDate = `${handledArr[1]}/${handledArr[2]}/${handledArr[0]}`

        return prettyDate
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