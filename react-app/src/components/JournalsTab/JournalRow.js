import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import EditJournalModal from './EditJournalModal';
import DeleteJournalModal from "./DeleteJournalModal";
import moment from 'moment'


const JournalRow = ({journal}) => {

    const [showMenu, setShowMenu] = useState(false);
    const [showEntries, setShowEntries] = useState(false);
    const ulRef = useRef();
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const handleEntries = (e) => {
        e.preventDefault()
        setShowEntries(!showEntries)
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const menuClassName = "journal-dropdown" + (showMenu ? "" : " hidden");
    const entryClassName = "journal-entry" + (showEntries ? "" : " hidden")
    const entryButton = (showEntries ? <i className="fa-solid fa-caret-down"></i> : <i className="fa-solid fa-caret-right"></i> )
    const deleteDivClass = "delete-button" + (journal.isDefault ? "-disabled" : "")

    const menuComponents = (
        <div className="drop-container">
            <div className={menuClassName} ref={ulRef}>
                <OpenModalButton
                    buttonText="rename"
                    modalComponent={<EditJournalModal journal={journal}/>}
                />
                <div className={deleteDivClass} data-tooltip={journal.isDefault ? "Cannot delete default Journal" : ""}>
                <OpenModalButton
                    buttonText="delete"
                    modalComponent={<DeleteJournalModal journal={journal} />}
                    disabled={journal.isDefault ? true : false }
                />
                </div>
            </div>
        </div>
    )

    // console.log("lastUpdated: ", journal.lastUpdated)
    // console.log("moment attempt: ", moment(journal.lastUpdated))
    // console.log("new date: ", new Date(journal.lastUpdated))
    // const momentUpdated = moment(journal.lastUpdated)
    // console.log("format:", momentUpdated.format("MM/D/YYYY"))

    return (
        <>
        <tr>
            <td className="table-title"><button onClick={handleEntries}>{entryButton}</button><NavLink to={`/journals/${journal.id}`}>{journal.title}</NavLink></td>
            <td className="table-entries">{journal.entries.length}</td>
            <td className="table-updated">{moment(journal.dateCreated, "MM-DD-YYYY").format("MM/DD/YYYY")}</td>
            <td className="table-shared">&mdash;</td>
            <td className="table-menu"><button className='journals-menu' onClick={openMenu}><i className="fa-solid fa-ellipsis"></i></button>{menuComponents}</td>
        </tr>
        {journal.entries.map(entry => (
            <tr key={entry.id} className={entryClassName}>
                <td className="journal-entry-td"><NavLink to={`/journals/${journal.id}/entries/${entry.id}`}><i className="fa-regular fa-file-lines"></i>{entry.title}</NavLink></td>
            </tr>
        ))}
        </>
    )
}

export default JournalRow;