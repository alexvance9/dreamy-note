import { useState } from "react"
import { useDispatch } from "react-redux";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
import { updateDream } from "../../store/session";

/* This component shows a nicely rendered view of a particular 
    dream entry, and handles editing of the dream.*/
const DreamDetail = ({dream}) => {
    const dispatch = useDispatch()

// bc dream gets sent as[{...}] 
    const currentDream = dream[0]
    
    // function returns date as 'yyy-mm-dd'
    const dateHandler = (str) => {
        return new Date(str).toISOString().split('T')[0].toString()
    }

    const [errors, setErrors] = useState([]);
    const [isEdit, setIsEdit] = useState(false)

    const [title, setTitle] = useState(currentDream.title)
    const [date, setDate] = useState(dateHandler(currentDream.date))
    const [value, setValue] = useState(currentDream.body)


    const openEditor = async (e) => {
        e.preventDefault()
        setIsEdit(true)
    }

    const saveChanges = async(e) => {
        e.preventDefault()
        const body = value
        const dreamId = currentDream.id
        const strDate = dateHandler(date)
        

        const data = await dispatch(updateDream(title, strDate, body, dreamId))
            if (data) {
                console.log(data)
                setErrors(data);
            } else {
                await setIsEdit(false)
            }
    }


    let detailComponents;
    if (isEdit) {
        detailComponents = (
            <>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>this will be the edit a dream form</div>
                <form onSubmit={saveChanges}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input name='title' type='text' value={title} onChange={setTitle}/>
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input name='date' type='date' value={date} onChange={setDate} />
                    </div>
                    <ReactQuill theme='snow' value={value} onChange={setValue}/>
                        <div>{parse(value)}</div>
                    <button type="submit" >this will save the changes</button>
                </form>
            </>
        )
    } else {
        detailComponents = (
            <>
                <div>this will be the detail page</div>
                <div>{parse(value)}</div>
                <button onClick={openEditor}>edit the dream</button>
            </>
        )
    }

    return (
        <div>{detailComponents}</div>
    )
}

export default DreamDetail