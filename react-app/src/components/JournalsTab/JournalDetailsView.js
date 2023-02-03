import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { loadSingleJournalThunk } from "../../store/journals";
import JournalDetailNav from "./JournalDetailNav";
import NoDreamsYet from "../ExtraPages/NoDreamsYet";
import './JoDe.css'
import DreamDetail from "../DreamDetail";
import LoadingPage from "../ExtraPages/LoadingPage";
// import { authenticate } from "../../store/session";

const JournalDetailsView = () => {
    const dispatch = useDispatch()
    let { journalId, dreamId } = useParams()
    // console.log('journalId, dreamId:', journalId, dreamId)
    const [isLoaded, setIsLoaded] = useState(false)

    
    useEffect(() => {
        (async () => {
            console.log("reloading")
            // await dispatch(authenticate())
            await dispatch(loadSingleJournalThunk(journalId));
            setIsLoaded(true);
        })();
    }, [dispatch, journalId]);
    
    const currentJournal = useSelector(state => state.journals.singleJournal)
    const entries = useSelector(state => state.journals.singleJournal.entries)
    // const dreams = useSelector(state => state.session.user.dreams)
      

    if (!isLoaded) {
        return (
           <LoadingPage />
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
            <NoDreamsYet />
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