import DreamCard from "../DreamCard";
import { NavLink } from "react-router-dom";

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
                    <NavLink to={`/dreams/${dream.id}`} key={dream.id} className='dream-card-nav'>
                        <DreamCard dream={dream} />
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default DreamNav