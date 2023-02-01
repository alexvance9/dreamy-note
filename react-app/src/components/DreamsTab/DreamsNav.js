import DreamCard from "../DreamCard";
import { NavLink } from "react-router-dom";

const DreamNav = ({dreams}) => {

    if (!dreams) return null;
//    console.log("original", dreams)

   const dreamsCopy = [...dreams]
//    console.log('copy', dreamsCopy)

   function dateSorter(a, b){
        // console.log("a: ", a.date)
        // console.log("b: ", b.date)
        let aDate = new Date(a.date)
        let bDate = new Date(b.date)
        // console.log(aDate, bDate)
        return bDate - aDate
   }
//    console.log(dreamsCopy.sort(dateSorter))
   const sorted = dreamsCopy.sort(dateSorter)


    return (
        <div className="dream-nav-container flexcol">
            <div className="flex dream-title">
                <i className="fa-solid fa-moon fa-xl"></i>
                <h2>My Dreams</h2>
            </div>
            <div className="dream-cards-container flexcol">
                {sorted.map(dream => (
                    <NavLink to={`/dreams/${dream.id}`} key={dream.id} className='dream-card-nav' activeClassName="selected-dream-card">
                        <DreamCard dream={dream} />
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default DreamNav