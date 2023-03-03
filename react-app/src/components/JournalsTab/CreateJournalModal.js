import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createJournalThunk } from "../../store/journals";
import './JoMo.css'

const CreateJournalModal = () => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("");
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const trimmedTitle = title.trim()
        if (!trimmedTitle) {
            setErrors(['Please name your journal.'])
        } else if (trimmedTitle.length > 30) {
            setErrors(['Journal Name must be 30 characters or less'])
        } else {
            
            const data = await dispatch(createJournalThunk(trimmedTitle))
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
    if (!errors.length){
        subtitleComponents = (
            <div>Journals are useful for grouping dream entries together.<br/>
                Were you traveling for a while? Is it your freshman year of college?<br/>
                Give your Journal a descriptive name.
            </div>
        )
    } else {
        subtitleComponents = (
            <>
                <div>Journals are useful for grouping dream entries together.<br />
                    Were you traveling for a while? Is it your freshman year of college?<br />
                    Give your Journal a descriptive name.
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
        <div className="new-journal-modal">
        <form  className="new-journal-form" onSubmit={handleSubmit}>
            <h2 className="new-journal-h2">Create A New Journal</h2>
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
                <button className="submit-button" type='submit'>Create Journal</button>
                <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
        </div>
    )
}

export default CreateJournalModal;