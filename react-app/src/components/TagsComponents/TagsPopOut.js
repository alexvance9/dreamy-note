// import { useState } from 'react';
import OpenModalButton from '../OpenModalButton'
import CreateTagModal from './CreateTagModal';
import TagRow from './TagRow';

const TagsPopOut = ({setShowMenu, tags}) => {
    

    // make an array of tags, and alphabetize by tag name
    const tagsArr = Object.values(tags)
    const sortedTags = tagsArr.sort((a, b) => {
        const nameA = a.name.toLowerCase()
        const nameB = b.name.toLowerCase()

        if (nameA < nameB) return -1;
        else if (nameA > nameB) return 1;
        else return 0;
    })
    // use reduce to make into an object with the beginning letter as a key,
    // list/array of tag names with that starting letter as value.
    const alphabetObj = sortedTags.reduce((alphObj, currVal) => {
        const char = currVal.name[0].toUpperCase()
        alphObj[char] = [].concat((alphObj[char] || []), currVal)
        return alphObj;
    }, {})

    
    

    return(
        <div className="tags-pop-out">
            <button onClick={setShowMenu}><i className="fa-solid fa-xmark fa-xl"></i></button>
            <h2>Tags</h2>
            <div className='new-tag-button'>
                <i className="fa-solid fa-tag"></i>
                <OpenModalButton
                    buttonText="Add a Tag"
                    modalComponent={<CreateTagModal />}
                />
            </div>
            <div className='tags-list-container'>
            {Object.entries(alphabetObj).map(([letter, tags]) => {
                return (
                    <div className="letter-list" key={letter}>
                        <div className="letter-label">{letter}</div>
                        {tags.map(tag => (
                            <TagRow tag={tag} setShowMenu={setShowMenu}/>
                        ))}
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default TagsPopOut;