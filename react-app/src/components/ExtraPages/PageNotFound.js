import sheep from '../../assets/sheep.png'
import './extra.css'

const PageNotFound = () => {
    return (
        <div className="journal-detail-container-extra">
            <div className='sheep-no-dreams'>
                <img className='user-sheep-img' alt='sheep icon' src={sheep} />
            </div>
            <div className='not-found-container flexcol'>
                <h1>Oops!</h1>
                <p>We couldn't find the page you were looking for</p>
            </div>
        </div>
    )
}
export default PageNotFound;