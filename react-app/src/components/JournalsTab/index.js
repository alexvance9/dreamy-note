import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from "react";
import { loadJournalsThunk } from '../../store/journals';
import OpenModalButton from '../OpenModalButton'
import CreateJournalModal from './CreateJournalModal';

import './JournalsTab.css'
import JournalRow from './JournalRow';

const JournalsTab = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    


    const journals = useSelector(state => state.journals.journals)
    // console.log("inside component:", journals)
    const journalsArr = Object.values(journals)
    // console.log("journals array: ", journalsArr)


    useEffect(() => {
        (async () => {
            await dispatch(loadJournalsThunk());
            setIsLoaded(true);
        })();
    }, [dispatch]);

    

    if(!isLoaded) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <div className='journals-tab'>
            <h2>My Dream Journals</h2>
            <div>
            <OpenModalButton
                buttonText="New Journal"
                modalComponent={<CreateJournalModal />}
            />
            </div>

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
                           <JournalRow key={journal.id} journal={journal} />
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}

export default JournalsTab