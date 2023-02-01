import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { editJournalThunk } from "../../store/journals";

const EditJournalModal = ({journal}) => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState(journal.title);
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    

    const handleSubmit = async (e) => {
        e.preventDefault()
        const trimmedTitle = title.trim()
        if (!trimmedTitle){
            setErrors(['Please name your journal.'])
        } else if(trimmedTitle.length > 30){
            setErrors(['Journal Name must be 30 characters or less'])
        }else {
            const journalId = journal.id
            const data = await dispatch(editJournalThunk(trimmedTitle, journalId))
            if (data){
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
                We bet you can do better than "Journal".
            </div>
        )
    } else {
        subtitleComponents = (
            <div className="errors">
                {
                    errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))
                }
            </div>
        )
    }

    return (
        <div className="new-journal-modal">
            <form className="new-journal-form" onSubmit={handleSubmit}>
                <h2 className="new-journal-h2">Rename your Journal</h2>
                <div className="subtitle-components">
                    {subtitleComponents}
                </div>
                <div className="title-input flexcol">
                    <label htmlFor="title">Name</label>
                    <input
                        name="title"
                        type='text'
                        placeholder="Journal name"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="modal-buttons">
                <button className="submit-button" type='submit'>Rename</button>
                <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditJournalModal;