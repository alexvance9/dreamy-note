import { useState } from "react"
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteJournalThunk } from "../../store/journals";
import sheep from '../../assets/sheep.png'


function DeleteJournalModal({ journal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    // add error handling here

    const handleDelete = (e) => {
        e.preventDefault();
        const journalId = journal.id

        dispatch(deleteJournalThunk(journalId))
            .then(history.push("/journals"))
            .then(closeModal())
            .catch(e => {
                console.log(e)
                setErrors(e)
            })

    }

    return (
        <div className="delete-modal">
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <h2>Are you sure you want to delete this Journal?</h2>
            <h4>It's Dreams will be lost to the Void</h4>
            <div className='sheep-icon'>
                <img className='user-sheep-img' alt='sheep icon' src={sheep} />
            </div>
            <div className="delete-buttons">
                <button className="yes-delete" onClick={handleDelete}>Yes, Delete it.</button>
                <button className='no-delete' onClick={closeModal}>No, Dont!</button>
            </div>
        </div>
    )
}


export default DeleteJournalModal;