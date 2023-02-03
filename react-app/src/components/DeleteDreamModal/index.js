import { useState } from "react"
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteDreamThunk } from "../../store/dreams";
import './DeleteDreamModal.css'
import sheep from '../../assets/sheep.png'


function DeleteDreamModal({ currentDreamId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
// console.log(currentDreamId)
    // add error handling here

    const handleDelete =  (e) => {
        e.preventDefault();
        // console.log(currentDreamId)
        // const data = await dispatch(deleteDreamThunk(currentDreamId))
        // if (data.errors) {
        //     return setErrors(data.errors)
        // } else {
        //     // closeModal()
        //     await history.push('/dreams')
        //     return closeModal()
        // }
        // WHY DOESNT THIS WORK ^^^^
        dispatch(deleteDreamThunk(currentDreamId))
            .then(history.push("/dreams"))
            .then(closeModal())
            .catch(e => {
                // console.log(e)
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
            <h2>Are you sure you want to delete this Dream?</h2>
            <h4>It will be lost to the Dream void</h4>
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


export default DeleteDreamModal;
