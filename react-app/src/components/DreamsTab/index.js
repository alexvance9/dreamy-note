import { useSelector } from "react-redux"
import DreamNav from "./DreamsNav"
import './DreamsTab.css'

const DreamsTab = () => {

   const sessionUser = useSelector(state => state.session.user);
   const dreams = sessionUser.dreams

    return (
        <div className="dreams-tab-container"> 
            <DreamNav dreams={dreams}/>
        </div>
    )
}

export default DreamsTab