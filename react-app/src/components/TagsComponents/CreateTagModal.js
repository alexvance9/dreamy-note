import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateTag } from "../../store/tags";
import './Tags.css'

const CreateTagModal = () => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
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

            const data = await dispatch(thunkCreateTag(trimmedName))
            if (data) {
                await setErrors(data.errors)
            } else {
                setErrors([])
                await closeModal()
            }
        }

    }

    const handleCancel = (e) => {
        e.preventDefault()
        closeModal()
    }

    let subtitleComponents;
    if (!errors.length) {
        subtitleComponents = (
            <div>
                Tags are useful for tracking recurring themes in your dreams.<br />
                Are you always having a dream about butterflies?<br />
                Put a tag on it!
            </div>
        )
    } else {
        subtitleComponents = (
            <>
                <div>
                    Tags are useful for tracking recurring themes in your dreams.<br />
                    Are you always having a dream about butterflies?<br />
                    Put a tag on it!
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
                <h2>Create a new Tag</h2>
                <div className="subtitle-components">
                    {subtitleComponents}
                </div>
                <div className="title-input flexcol">
                    <input
                        name="name"
                        type='text'
                        placeholder="Tag name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="modal-buttons">
                    <button className="submit-button" type='submit'>Create Tag</button>
                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>

            </form>
        </div>
    )
}

export default CreateTagModal;