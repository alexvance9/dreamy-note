import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkUpdateTag } from "../../store/tags";
import './Tags.css'

const UpdateTagModal = ({tagId, tagName}) => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(tagName);
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const trimmedName = name.trim()
        if (!trimmedName) {
            setErrors(['Give your tag a name'])
        } else if (trimmedName.length > 20) {
            setErrors(['Tag Name must be 20 characters or less'])
        } else {

            const data = await dispatch(thunkUpdateTag(tagId, trimmedName))
            if (data.errors) {
                await setErrors(data.errors)
            } else {
                await setErrors([])
                await closeModal()
            }
        }

    }

    const handleCancel = (e) => {
        e.preventDefault()
        closeModal()
    }

    let subtitleComponents;
    if (!errors) {
        subtitleComponents = (
            <div>
                Tags are useful for tracking themes in your dreams.
            </div>
        )
    } else {
        subtitleComponents = (
            <>
                <div>
                    Tags are useful for tracking recurring themes in your dreams.
                </div>
                <div className="errors">
                    {
                        errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))
                    }
                </div>
            </>
        )
    }

    return (
        <div className="new-tag-modal">
            <form className="new-tag-form" onSubmit={handleSubmit}>
                <h2>Rename Tag</h2>
                <div className="subtitle-components">
                    {subtitleComponents}
                </div>
                <div className="title-input flexcol">
                    <label htmlFor="name">Name</label>
                    <input
                        name="name"
                        type='text'
                        placeholder="Tag name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="modal-buttons">
                    <button className="submit-button" type='submit'>Save</button>
                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>

            </form>
        </div>
    )
}

export default UpdateTagModal;