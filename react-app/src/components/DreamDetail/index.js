import { useState, useEffect } from "react"
import { useDispatch, useSelector} from "react-redux";
// import { useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
import { updateDream } from "../../store/session";
import { getSingleDream } from "../../store/dream";
import OpenModalButton from "../OpenModalButton";
import DeleteDreamModal from "../DeleteDreamModal";

/* This component shows a nicely rendered view of a particular 
    dream entry, and handles editing of the dream.*/
const DreamDetail = ({dreamProp}) => {
    // bc dream gets sent as[{...}] 
    const currentDream = dreamProp[0]
    // console.log(dreamProp)
    // const params = useParams()
    // console.log('params', params)

    const selectedDream = useSelector(state => state.dream.dream)
   

    const dispatch = useDispatch()

    const [errors, setErrors] = useState([]);
    // to toggle editor
    const [isEdit, setIsEdit] = useState(false)

    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [value, setValue] = useState('')
    const [editBody, setEditBody] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)

    // function returns date as 'yyy-mm-dd'
    const dateHandler = (str) => {
        // console.log('this is the date string passed to handler,', str)
        const handled = new Date(str).toISOString().split('T')[0].toString()
        return handled
    }

    useEffect(() => {
        (async () => {
            const data = await dispatch(getSingleDream(currentDream.id));
            console.log('this is the dispatch data:', data)
            await setTitle(data.title)
            // console.log("this is when I'm calling the date handler")
            const handledDate = dateHandler(data.date)
            await setDate(handledDate)
            // await setTitle(selectedDream.date)
            await setEditBody(data.body)
            const parsedBody = parse(data.body)
            await setValue(parsedBody)
            await setIsLoaded(true);
        })();
    }, [dispatch, currentDream.id]);

    // console.log(isLoaded)
    // console.log(typeof selectedDream.body)

    if (!isLoaded || !dreamProp.length) {
        return (
            <div>just loading!</div>
        )
    }

    const openEditor = async (e) => {
        e.preventDefault()
        setIsEdit(true)
    }

    const saveChanges = async(e) => {
        e.preventDefault()
        const body = editBody
        const dreamId = selectedDream.id
        const strDate = dateHandler(date)
        

        const data = await dispatch(updateDream(title, strDate, body, dreamId))
            if (data) {
                console.log(data)
                setErrors(data);
            } else {
                await setValue(parse(editBody))
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
                        <input name='title' type='text' value={title} onChange={e => setTitle(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input name='date' type='date' value={date} onChange={e => setDate(e.target.value)} />
                    </div>
                    <ReactQuill theme='snow' value={editBody} onChange={setEditBody}/>
                       
                    <button type="submit" >this will save the changes</button>
                </form>
            </>
        )
    } else {
        detailComponents = (
            <>
                <div>this will be the detail page</div>
                {/* <div>{parse(value)}</div> */}
                <div>{value}</div>
                <button onClick={openEditor}>edit the dream</button>
                <OpenModalButton
                    buttonText="Delete this Dream"
                    modalComponent={<DeleteDreamModal currentDreamId={selectedDream.id}/>}
                />
            </>
        )
    }

    return (
        <div key={dreamProp}>{detailComponents}</div>
    )
}

export default DreamDetail