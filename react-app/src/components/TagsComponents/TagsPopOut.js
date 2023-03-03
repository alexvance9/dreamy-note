

const TagsPopOut = ({setShowMenu, tags}) => {
    // console.log(tags)
    const handleAddTag = (e) => {
        e.preventDefault()

    }

    return(
        <div className="tags-pop-out">
            <button onClick={setShowMenu}><i className="fa-solid fa-xmark fa-xl"></i></button>
            <h2>Tags</h2>
            
        </div>
    )
}

export default TagsPopOut;