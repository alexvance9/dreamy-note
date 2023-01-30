import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect, useRef } from "react";
import { loadJournalsThunk } from '../../store/journals';
import './JournalsTab.css'

const JournalsTab = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();


    const journals = useSelector(state => state.journals.journals)
    console.log("inside component:", journals)
    const journalsArr = Object.values(journals)
    console.log("journals array: ", journalsArr)


    useEffect(() => {
        (async () => {
            await dispatch(loadJournalsThunk());
            setIsLoaded(true);
        })();
    }, [dispatch]);

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
            <button>edit</button>
            <button>delete</button>
        </div>
    )

    if(!isLoaded) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <div className='journals-tab'>
            <h2>My Dream Journals</h2>
            <div className='journals-table' >
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Entries</th>
                            <th>Updated</th>
                            <th>Shared</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {journalsArr.map(journal => (
                            <tr>
                                <td>{journal.title}</td>
                                <td>{journal.entries.length}</td>
                                <td>{journal.lastUpdated}</td>
                                <td>&mdash;</td>
                                <td><button className='journals-menu' onClick={openMenu}><i className="fa-solid fa-ellipsis"></i></button>{menuComponents}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}

export default JournalsTab