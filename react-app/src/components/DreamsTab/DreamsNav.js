import DreamCard from "../DreamCard";
import { NavLink } from "react-router-dom";

const DreamNav = ({dreams}) => {

    // console.log('dreams in dreams nav: ', dreams)

    return (
        
            <div className="dream-cards-container flexcol">
                {dreams?.map(dream => (
                    <NavLink to={`/dreams/${dream.id}`} key={dream.id} className='dream-card-nav' activeClassName="selected-dream-card">
                        <DreamCard dream={dream} />
                    </NavLink>
                ))}
            </div>
       
    )
}

export default DreamNav