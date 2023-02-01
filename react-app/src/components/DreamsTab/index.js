import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { authenticate } from "../../store/session";
import DreamDetail from "../DreamDetail";
import DreamNav from "./DreamsNav"
import CreateDreamForm from "../CreateDreamForm";

import './DreamsTab.css'

const DreamsTab = ({isNew}) => {
    // see note

    // grab the current user from state
    // dreams live on the user slice of state
    const dispatch = useDispatch()
    let params = useParams()

    const dreams = useSelector(state => state.session.user.dreams)
    

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setIsLoaded(true);
        })();
    }, [dispatch]);

    // console.log(isLoaded)

    /* --- WEIRD CONDITIONAL RENDERING OF DREAM PAGE VIEW--- */
    
    // If there is a url param, grab it. else, we will render the details of the 
    // first dream in the list. 
    
        
        let currentDreamId;
        if (params.dreamId){
            currentDreamId = Number(params.dreamId)
            // setCurrentDream(currentDreamId)
        } else if (!dreams.length) {
            return (
                <div className="render-view-container">
                    <CreateDreamForm journalIdProp={false}/>
                </div>
            )
        } else {
            currentDreamId = dreams[0].id
        }
        // grab the dream by id from the users dreams attr.
        let d = dreams.filter(dream => dream.id === currentDreamId)
        

    if (!isLoaded) {
        return null
    }

    
  
    // we want to render the detail page of whichever dream, UNLESS the isNew prop is 
    // passed to the DreamsTab component (t/f). It is passed as TRUE at the route /dreams/new.
    // In that case, render the CreateDreamForm!
    let renderPage;
    if (isNew) {
        renderPage = (
            <div className="render-view-container">
                <CreateDreamForm journalIdProp={false} />
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
            <DreamNav dreams={dreams}/>
            {renderPage}
        </div>
    )
}

export default DreamsTab