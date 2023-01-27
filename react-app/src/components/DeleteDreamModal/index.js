import { useState } from "react"
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteDream } from "../../store/session";


function DeleteDreamModal({ currentDreamId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    // add error handling here

    const handleDelete = (e) => {
        e.preventDefault();

        dispatch(deleteDream(currentDreamId))
            .then(history.push("/dreams"))
            .then(closeModal())
            .catch(e => {
                console.log(e)
                setErrors(e)
            })

        // FOR SOME REASON this async await created a race condition... so switched to .then
        // if (data) {
        //     console.log("this is the data:", data)
        //     setErrors(data);
        // } else {
        //     // await history.push("/dashboard")
        //     await closeModal()
        //     return <Redirect to="/dashboard" />
        // }
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
            <button onClick={handleDelete}>Yes, Delete it.</button>
            <button onClick={closeModal}>No, Dont!</button>
        </div>
    )

}

export default DeleteDreamModal;