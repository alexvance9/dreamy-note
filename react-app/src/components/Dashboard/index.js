import sheep from '../../assets/sheep.png'

const Dashboard = () => {
   
        return (
        <div className="journal-detail-container-extra">
            <div className='sheep-no-dreams'>
                <img className='user-sheep-img' alt='sheep icon' src={sheep} />
            </div>
            <div className='not-found-container flexcol'>
                <h1>Dashboard Under Construction</h1>
                <p>Head to the Dreams tab to begin.</p>
            </div>
        </div>
    
    )
}

export default Dashboard;