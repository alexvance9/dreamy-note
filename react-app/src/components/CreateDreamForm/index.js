import { useState } from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createDream } from "../../store/session";
import './CreateDreamForm.css'

const CreateDreamForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    // const [journal, setJournal] = useState("")
    const [body, setBody] = useState("")

    

    const handleDate = (str) => {

        const dateStr = new Date(str).toISOString().split('T')[0].toString()
        return dateStr
    }

   const handleSubmit = async (e) => {
        e.preventDefault()

        const submitDate = handleDate(date)

        const data = await dispatch(createDream(title, submitDate, body))
        if (data) {
            console.log(data)
            setErrors(data);
        } else {
            await history.push('/dreams')
        }
    }

    return (
        <div className="dream-form-container">
            <div className={errors.length ? "create-dream-errors" : "hidden-errors"}>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <h2>New Dream</h2>
            <form onSubmit={handleSubmit}>
                <div className="create-title">
                    <label htmlFor="title">Title</label>
                    <input name='title' type='text' value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="create-date">
                    <label htmlFor="date">Date</label>
                    <input name='date' type='date' value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <ReactQuill theme='snow' value={body} onChange={setBody} />

                <div className="create-dream-button">
                <button type="submit" >this will save the dream</button>
                </div>
            </form>
        </div>
    )
}

export default CreateDreamForm