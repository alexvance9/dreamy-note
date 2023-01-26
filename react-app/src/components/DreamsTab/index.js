import { useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import DreamDetail from "../DreamDetail";
import DreamNav from "./DreamsNav"
import './DreamsTab.css'

const DreamsTab = () => {
    let params = useParams()
    console.log(params)

   const sessionUser = useSelector(state => state.session.user);
   const dreams = sessionUser.dreams

    return (
        <div className="dreams-tab-container"> 
            <DreamNav dreams={dreams}/>
            <DreamDetail />
        </div>
    )
}

export default DreamsTab