import { useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import DreamDetail from "../DreamDetail";
import DreamNav from "./DreamsNav"
import CreateDreamForm from "../CreateDreamForm";
import './DreamsTab.css'

const DreamsTab = ({isNew}) => {
    // grab the current user from state
    const sessionUser = useSelector(state => state.session.user);
    // dreams live on the user slice of state
    const dreams = sessionUser.dreams

    /* --- WEIRD CONDITIONAL RENDERING OF DREAM PAGE VIEW--- */


    let params = useParams()
    let currentDreamId;

    // If there is a url param, grab it. else, we will render the details of the 
    // first dream in the list. 
    if (Object.keys(params).length){
        currentDreamId = Number(params.dreamId)
    } else {
        currentDreamId = dreams[0].id
    }

    // grab the dream by id from the users dreams attr.
    let currentDream = dreams.filter(dream => dream.id === currentDreamId)
  
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
            <DreamDetail dream={currentDream} />
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