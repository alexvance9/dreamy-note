import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { loadSingleJournalThunk } from "../../store/journals";
import JournalDetailNav from "./JournalDetailNav";
import CreateDreamForm from "../CreateDreamForm";
import './JoDe.css'
import DreamDetail from "../DreamDetail";

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
    const entries = useSelector(state => state.journals.singleJournal.entries)
      

    if (!isLoaded) {
        return (
            <div>loading...</div>
        )
    }

    // console.log(entries)
    let entry;
    if (entries.length){
        let currentEntryId;
        if (dreamId) {
            currentEntryId = Number(dreamId)
            // setCurrentDream(currentDreamId)
        } else {
            currentEntryId = entries[0].id
        }
        // console.log(currentEntryId)
        // grab the dream by id from the users dreams attr.
        entry = entries.filter(entry => entry.id === currentEntryId)
    } else {
        return (
            <div className="render-view-container">
                <CreateDreamForm journalIdProp={currentJournal.id}/>
            </div>
        )
    }

    return (
        <div className="journal-detail-container flex">
            <JournalDetailNav currentJournal={currentJournal} entries={entries}/>
            <div className="render-view-container">
                <DreamDetail dreamProp={entry}/>
            </div>
        </div>
    )
}

export default JournalDetailsView;