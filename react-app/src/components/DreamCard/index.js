import './DreamCard.css'

const DreamCard = ({dream}) => {

    const renderDream = (e) => {
        e.preventDefault()
        
    }
    
    if (!dream) return null

    return (
        // <button className="dream-card-button">
        <button className="dream-card" onClick={renderDream}>
            <div>{dream.title}</div>
            <div>{dream.date}</div>
            <div>{dream.body}</div>
        </button>
        // </button>

    )
}

export default DreamCard;