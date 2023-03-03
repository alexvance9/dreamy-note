import OpenModalButton from '../OpenModalButton'
import CreateTagModal from './CreateTagModal';

const TagsPopOut = ({setShowMenu, tags}) => {
    // console.log(tags)
    const tagsArr = Object.values(tags.tags)
    // console.log(tagsArr)
    

    return(
        <div className="tags-pop-out">
            <button onClick={setShowMenu}><i className="fa-solid fa-xmark fa-xl"></i></button>
            <h2>Tags</h2>
            <OpenModalButton 
                buttonText="Add a Tag"
                modalComponent={<CreateTagModal/>} 
                />
            <div className='tags-list-container'>
            {tagsArr.map(tag => (
                <div key={tag.id}>
                    {tag.name}
                    </div>
            ))}
            </div>
        </div>
    )
}

export default TagsPopOut;