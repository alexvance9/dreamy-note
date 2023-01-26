import { useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import DreamDetail from "../DreamDetail";
import DreamNav from "./DreamsNav"
import './DreamsTab.css'

const DreamsTab = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dreams = sessionUser.dreams

    let params = useParams()
    let currentDreamId;
    if (Object.keys(params).length){
        currentDreamId = Number(params.dreamId)
        // console.log(currentDream)
    } else {
        // console.log("false!")
        currentDreamId = dreams[0].id
    }

    // console.log("dream id", currentDreamId)
    let currentDream = dreams.filter(dream => dream.id === currentDreamId)
    // console.log("dream", currentDream)

    return (
        <div className="dreams-tab-container flex"> 
            <DreamNav dreams={dreams}/>
            <DreamDetail dream={currentDream}/>
        </div>
    )
}

export default DreamsTab