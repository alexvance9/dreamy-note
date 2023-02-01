
import DreamCard from "../DreamCard";
import { NavLink } from "react-router-dom";

const JournalDetailNav = ({ currentJournal, entries }) => {
    if (!entries) return null;
    const dreamsCopy = [...entries]
    //    console.log('copy', dreamsCopy)

    function dateSorter(a, b) {
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
        <div className="journal-nav-container flexcol">
            <div className="flex journal-title">
                <i className="fa-solid fa-book"></i>
                <h2>{currentJournal.title}</h2>
            </div>
            <div className="journal-cards-container flexcol">
                {sorted.map(entry => (
                    <NavLink to={`/journals/${currentJournal.id}/entries/${entry.id}`} key={entry.id} className='journal-card-nav' activeClassName="selected-journal-card">
                        <DreamCard dream={entry} />
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default JournalDetailNav;