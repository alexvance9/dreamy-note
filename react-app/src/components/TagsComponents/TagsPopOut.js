import OpenModalButton from '../OpenModalButton'
import CreateTagModal from './CreateTagModal';

const TagsPopOut = ({setShowMenu, tags}) => {
    
    // console.log("entries: ", Object.entries(tags))


    const tagsArr = Object.values(tags)
    const sortedTags = tagsArr.sort((a, b) => {
        const nameA = a.name.toLowerCase()
        const nameB = b.name.toLowerCase()

        if (nameA < nameB) return -1;
        else if (nameA > nameB) return 1;
        else return 0;
    })

    const alphabetObj = sortedTags.reduce((alphObj, currVal) => {
        const char = currVal.name[0].toUpperCase()
        alphObj[char] = [].concat((alphObj[char] || []), currVal)
        return alphObj;
    }, {})
    
    

    return(
        <div className="tags-pop-out">
            <button onClick={setShowMenu}><i className="fa-solid fa-xmark fa-xl"></i></button>
            <h2>Tags</h2>
            <OpenModalButton 
                buttonText="Add a Tag"
                modalComponent={<CreateTagModal/>} 
                />
            <div className='tags-list-container'>
            {Object.entries(alphabetObj).map(([letter, tags]) => {
                return (
                    <div className="letter-list" key={letter}>
                        <div className="letter-label">{letter}</div>
                        {tags.map(tag => (
                            <div className='tag' key={tag.id}>{tag.name}<span>{`(${tag.refsCount})`}</span></div>
                        ))}
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default TagsPopOut;