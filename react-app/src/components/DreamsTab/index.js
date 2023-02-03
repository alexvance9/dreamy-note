import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import DreamDetail from "../DreamDetail";
import DreamNav from "./DreamsNav"
import CreateDreamForm from "../CreateDreamForm";

import './DreamsTab.css'
import LoadingPage from "../ExtraPages/LoadingPage";
import { loadDreamsThunk } from "../../store/dreams";

const DreamsTab = ({isNew}) => {
    // see note

    // grab the current user from state
    // dreams live on the user slice of state
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

    /* --- WEIRD CONDITIONAL RENDERING OF DREAM PAGE VIEW--- */

    // sort the dreams array to be in order by date.
    const dreamsCopy = [...dreamsArr]
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
    
    // If there is a url param, grab it. else, we will render the details of the 
    // first dream in the list. 
    
        
        let currentDreamId;
        if (params.dreamId){
            currentDreamId = Number(params.dreamId)
            // setCurrentDream(currentDreamId)
        } else if (!dreamsArr.length) {
            return (
                <div className="dreams-tab-container flex">
                    <DreamNav dreams={dreamsArr} />
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
                <DreamDetail dreamProp={d} />
            </div>
        )
    }

    return (
        <div className="dreams-tab-container flex"> 
            <DreamNav dreams={sorted}/>
            {renderPage}
        </div>
    )
}

export default DreamsTab