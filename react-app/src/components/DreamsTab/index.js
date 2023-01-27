import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { authenticate } from "../../store/session";
import DreamDetail from "../DreamDetail";
import DreamNav from "./DreamsNav"
import CreateDreamForm from "../CreateDreamForm";
import './DreamsTab.css'

const DreamsTab = ({isNew}) => {
    // grab the current user from state
    // const sessionUser = useSelector(state => state.session.user);
    // dreams live on the user slice of state
    // const dreams = sessionUser.dreams
    const dispatch = useDispatch()
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


    let params = useParams()
    
    // If there is a url param, grab it. else, we will render the details of the 
    // first dream in the list. 
        
        let currentDreamId;
        if (Object.keys(params).length){
            currentDreamId = Number(params.dreamId)
            // setCurrentDream(currentDreamId)
        } else {
            currentDreamId = dreams[0].id
        }
        // grab the dream by id from the users dreams attr.
        let d = dreams.filter(dream => dream.id === currentDreamId)
        

    if (!isLoaded) {
        return (
            <div>just loading from tab!</div>
        )
    }

    
  
    // we want to render the detail page of whichever dream, UNLESS the isNew prop is 
    // passed to the DreamsTab component (t/f). It is passed as TRUE at the route /dreams/new.
    // In that case, render the CreateDreamForm!
    let renderPage;
    if (isNew) {
        renderPage = (
            <CreateDreamForm />
        )
    } else {
        renderPage = (
            <DreamDetail dreamProp={d} />
            // <div>nada</div>
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