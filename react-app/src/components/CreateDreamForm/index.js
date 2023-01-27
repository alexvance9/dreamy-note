import { useState } from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createDream } from "../../store/session";

const CreateDreamForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [body, setBody] = useState("")

    // console.log(date)

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
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>this will be the edit a dream form</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input name='title' type='text' value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="date">Date</label>
                    <input name='date' type='date' value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <ReactQuill theme='snow' value={body} onChange={setBody} />
                
                <button type="submit" >this will save the dream</button>
            </form>
        </div>
    )
}

export default CreateDreamForm