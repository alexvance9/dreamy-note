import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import EditJournalModal from './EditJournalModal';
import DeleteJournalModal from "./DeleteJournalModal";


const JournalRow = ({journal}) => {

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

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

    const menuComponents = (
        <div className={menuClassName} ref={ulRef}>
            <OpenModalButton
                buttonText="edit"
                modalComponent={<EditJournalModal journal={journal}/>}
            />
            <OpenModalButton
                buttonText="delete"
                modalComponent={<DeleteJournalModal journal={journal} />}
            />
        </div>
    )
    return (
        <tr>
            <td><NavLink to={`/journals/${journal.id}`}>{journal.title}</NavLink></td>
            <td>{journal.entries.length}</td>
            <td>{journal.lastUpdated}</td>
            <td>&mdash;</td>
            <td><button className='journals-menu' onClick={openMenu}><i className="fa-solid fa-ellipsis"></i></button>{menuComponents}</td>
        </tr>
    )
}

export default JournalRow;