import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { loadSingleJournalThunk } from "../../store/journals";
import JournalDetailNav from "./JournalDetailNav";

const JournalDetailsView = () => {
    const dispatch = useDispatch()
    let { journalId, dreamId } = useParams()
    // console.log('journalId, dreamId:', journalId, dreamId)
    const [isLoaded, setIsLoaded] = useState(false)

    
    useEffect(() => {
        (async () => {
            await dispatch(loadSingleJournalThunk(journalId));
            setIsLoaded(true);
        })();
    }, [dispatch, journalId]);
    
    const currentJournal = useSelector(state => state.journals.singleJournal)
    const entries = currentJournal.entries
    

    if (!isLoaded) {
        return (
            <div>loading...</div>
        )
    }

    console.log(entries)
    let currentEntryId;
    if (dreamId) {
        currentEntryId = Number(dreamId)
        // setCurrentDream(currentDreamId)
    } else {
        currentEntryId = entries[0].id
    }
    // console.log(currentEntryId)
    // grab the dream by id from the users dreams attr.
    let entry = entries.filter(entry => entry.id === currentEntryId)
    console.log(entry)

    return (
        <div className="journal-detail-view">
            <JournalDetailNav currentJournal={currentJournal} entries={entries}/>
        </div>
    )
}

export default JournalDetailsView;