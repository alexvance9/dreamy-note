import sheep from '../../assets/sheep.png'


const NoDreamsYet = () => {
    return (
        <div className="journal-detail-container">
            <div className='sheep-no-dreams'>
                <img className='user-sheep-img' alt='sheep icon' src={sheep} />
            </div>
            <h1>There arent't any Dreams in this Journal yet.</h1>

        </div>
    )
}

export default NoDreamsYet;