import sheep from '../../assets/sheep.png'
import './extra.css'


const NoDreamsYet = () => {
    return (
        <div className="journal-detail-container-extra">
            <div className='sheep-no-dreams'>
                <img className='user-sheep-img' alt='sheep icon' src={sheep} />
            </div>
            <div className='not-found-container flexcol'>
            <h1>There aren't any Dreams in this Journal yet.</h1>
            <p>Write a new dream entry to proceed.</p>
            </div>
        </div>
    )
}

export default NoDreamsYet;