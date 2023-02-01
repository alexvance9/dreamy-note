import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from "react";
import { loadJournalsThunk } from '../../store/journals';
import OpenModalButton from '../OpenModalButton'
import CreateJournalModal from './CreateJournalModal';

import './JournalsTab.css'
import JournalRow from './JournalRow';
import LoadingPage from '../ExtraPages/LoadingPage';

const JournalsTab = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    


    const journals = useSelector(state => state.journals)
    // console.log("inside component:", journals)
    const journalsArr = Object.values(journals.journals)
    // console.log("journals array: ", journalsArr)


    useEffect(() => {
        (async () => {
            await dispatch(loadJournalsThunk());
            setIsLoaded(true);
        })();
    }, [dispatch]);

    

    if(!isLoaded) {
        return (
            <LoadingPage />
        )
    }

    return (
        <div className='journals-tab'>
            <h2 className='my-journals'>My Dream Journals</h2>
            <div className='new-journal-button'>
                <i className="fa-solid fa-book"></i>
            <OpenModalButton
                buttonText="New Journal"
                modalComponent={<CreateJournalModal />}
            />
            </div>

            <div className='journals-table' >
                <table>
                    <thead>
                        <tr>
                            <th className='table-title header-title'>Name</th>
                            <th className='table-entries'>Entries</th>
                            <th className='table-updated'>Updated</th>
                            <th className='table-shared'>Shared</th>
                            <th className='table-menu'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {journalsArr.map(journal => (
                           <JournalRow key={journal.id} journal={journal} />
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}

export default JournalsTab