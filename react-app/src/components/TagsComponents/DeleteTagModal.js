import { useState } from "react"
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteTag } from "../../store/tags";
import sheep from '../../assets/sheep.png'

const DeleteTagModal = ({tagId}) => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    // add error handling here

    const handleDelete = (e) => {
        e.preventDefault();

        dispatch(thunkDeleteTag(tagId))
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
            <h2>Are you sure you want to delete this Tag?</h2>
            <h4>It will be removed from all Dreams</h4>
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

export default DeleteTagModal;