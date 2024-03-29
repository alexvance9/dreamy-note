import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import DreamDetail from "../DreamDetail";

import CreateDreamForm from "../CreateDreamForm";
import FilterComponent from "./FilterComponent";

import './DreamsTab.css'
import LoadingPage from "../ExtraPages/LoadingPage";
import { loadDreamsThunk } from "../../store/dreams";

const DreamsTab = ({isNew}) => {

    const dispatch = useDispatch()
    let params = useParams()

    const dreams = useSelector(state => state.dreams.dreams)
    const dreamsArr = Object.values(dreams)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        (async () => {
            await dispatch(loadDreamsThunk());
            setIsLoaded(true);
        })(); 
    }, [dispatch]);

    // console.log(isLoaded)

    /* --- CONDITIONAL RENDERING OF DREAM PAGE VIEW--- */

    // sort the dreams array to be in order by date.
    const dreamsCopy = [...dreamsArr]
    //    console.log('copy', dreamsCopy)

    function dateSorter(a, b) {
        let aDate = new Date(a.date)
        let bDate = new Date(b.date)
        return bDate - aDate
    }
    const sorted = dreamsCopy.sort(dateSorter)
    
    // If there is a url param, grab it. else, we will render the details of the 
    // first dream in the list. 
        
        let currentDreamId;
        if (params.dreamId){
            currentDreamId = Number(params.dreamId)
            // setCurrentDream(currentDreamId)
        } else if (!dreamsArr.length) {
            return (
                <div className="dreams-tab-container flex">
                    <FilterComponent dreams={dreamsArr} />
                    <div className="render-view-container">
                        <CreateDreamForm />
                    </div>
                </div>
            )
        } else {
            currentDreamId = sorted[0].id
        }
        // grab the dream by id from the users dreams attr.
        let d = dreams[currentDreamId]
        

    if (!isLoaded) {
        return (
            <LoadingPage />
        )
    }

    
  
    // we want to render the detail page of whichever dream, UNLESS the isNew prop is 
    // passed to the DreamsTab component (t/f). It is passed as TRUE at the route /dreams/new.
    // In that case, render the CreateDreamForm!
    let renderPage;
    if (isNew) {
        renderPage = (
            <div className="render-view-container">
                <CreateDreamForm />
            </div>
        )
    } else {
        renderPage = (
            <div className="render-view-container">
                <DreamDetail dreamProp={d} isJournal={false}/>
            </div>
        )
    }

    return (
        <div className="dreams-tab-container flex"> 
            <FilterComponent dreams={sorted}/>
            {renderPage}
        </div>
    )
}

export default DreamsTab