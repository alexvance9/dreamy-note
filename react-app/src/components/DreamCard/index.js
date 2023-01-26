import './DreamCard.css'

const DreamCard = ({dream}) => {

    
    
    if (!dream) return null

    return (
        // <button className="dream-card-button">
        <div className="dream-card">
            <div>{dream.title}</div>
            <div>{dream.date}</div>
            <div>{dream.body}</div>
        </div>
        // </button>

    )
}

export default DreamCard;