import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { editJournalThunk } from "../../store/journals";

const EditJournalModal = ({journal}) => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState(journal.title);
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    

    const handleSubmit = (e) => {
        e.preventDefault()
        const journalId = journal.id
        dispatch(editJournalThunk(title, journalId))
            .then(closeModal())
            .catch(e => {
                console.log(e)
                setErrors(e)
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Rename Journal</h2>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <input
                    type='text'
                    placeholder="Journal Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </div>
            <button type='submit'>Done</button>
        </form>
    )
}

export default EditJournalModal;