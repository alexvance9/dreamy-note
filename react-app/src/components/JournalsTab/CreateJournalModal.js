import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createJournalThunk } from "../../store/journals";

const CreateJournalModal = () => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("");
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createJournalThunk(title))
        .then(closeModal())
        .catch(e => {
            console.log(e)
            setErrors(e)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create A New Journal</h2>
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
            <button type='submit'>Create Journal</button>
        </form>
    )
}

export default CreateJournalModal;