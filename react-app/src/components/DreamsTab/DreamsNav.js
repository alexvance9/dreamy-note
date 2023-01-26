import DreamCard from "../DreamCard";

const DreamNav = ({dreams}) => {

    if (!dreams) return null;

    return (
        <div className="dream-nav-container flexcol">
            <div className="flex dream-title">
                <i className="fa-solid fa-moon fa-xl"></i>
                <h2>My Dreams</h2>
            </div>
            <div className="dream-cards-container flexcol">
                {dreams.map(dream => (
                    <DreamCard dream={dream} />
                ))}
            </div>
        </div>
    )
}

export default DreamNav