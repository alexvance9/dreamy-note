import { thunkAddDreamTag, thunkRemoveDreamTag } from "../../store/dreams";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const EditTagsModal = ({dreamId, currentDreamsTags}) => {
    
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const currentTags = useSelector(state => state.tags.tags)
    const tagsArr = Object.values(currentTags)
    const [tagId, setTagId] = useState("")
    const [errors, setErrors] = useState([])
    const [dreamTags, setDreamTags] = useState(currentDreamsTags)
    
    const handleRemoveTag = async (e) => {
        e.preventDefault()
        const currentTagId = e.currentTarget.value;
        const data = await dispatch(thunkRemoveDreamTag(dreamId, currentTagId))
        if (data.errors) {
            return setErrors(data.errors)
        } else {
            return setDreamTags(data.tags)
        }
        
    }

    let tagsList;
    if (dreamTags?.length > 0){
        tagsList = (
            <>
            {dreamTags.map(tag => (
                <div key={tag.id}>
                    {tag.name}
                    <button className="remove-dream-tag-button" value={tag.id} onClick={handleRemoveTag}><i className="fa-regular fa-square-minus"></i></button>
                </div>
            ))}
            </>
        )
    } else {
        tagsList = (
            <div></div>
        )
    }

    const handleDone = (e) => {
        e.preventDefault()
        return closeModal()
    }

    const handleAddDreamTag = async (e) => {
        e.preventDefault()
        setErrors([])
        if (!tagId) return setErrors(['Select a tag to add'])
        if(!errors.length) {
            const data = await dispatch(thunkAddDreamTag(dreamId, tagId))
            if(data.errors){
                return setErrors(data.errors)
            } else {
                return setDreamTags(data.tags)
            }
        }
    }

    return (
        <div className="edit-dream-tags-modal">
            <h2>Add Tags to your Dream</h2>
            { errors && (<div className="errors">
                {
                    errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))
                }
            </div>)}
            <form className="add-dream-tag-form" onSubmit={handleAddDreamTag}>
                <div className='tag-select'>
                    <select name='tags' value={tagId} onChange={e => {
                                                            setErrors([])
                                                            return setTagId(e.target.value)}} >
                        <option value="">Add a Tag...</option>
                        {tagsArr?.map(tag => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        ))}
                    </select>
                    <button type="submit">Add</button>
                </div>
            </form>
            <div className="edit-dream-tags-list">{tagsList}</div>
            <button onClick={handleDone}>Done</button>
        </div>
    )
}

export default EditTagsModal;