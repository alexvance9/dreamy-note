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
import './DreamDetail.css'

/* This component shows a nicely rendered view of a particular 
    dream entry, and handles editing of the dream.*/

const DreamDetail = ({dreamProp}) => {
    // bc dream gets sent as[{...}] 
    const currentDream = dreamProp[0]

    // grab dream slice of state
    const selectedDream = useSelector(state => state.dream.dream)
   
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [errors, setErrors] = useState([]);
    // to toggle editor
    const [isEdit, setIsEdit] = useState(false)

    const [title, setTitle] = useState('') //string
    const [date, setDate] = useState('') //date string in yyyy-mm-dd 
    const [value, setValue] = useState('') //this is the value of the 'body' after being parsed by the react html parser
    const [editBody, setEditBody] = useState('') // this is the value of the body before being parsed, so still html string

    // function returns date as 'yyyy-mm-dd'
    const dateHandler = (str) => {
        // console.log('this is the date string passed to handler,', str)
        const handled = new Date(str).toISOString().split('T')[0].toString()
        return handled
    }

    // load dream slice of state, which is a single dream. it is set by grabbing the 
    // dream id of the dreamProp passed from the DreamsTab component.
    //  it changes depending on which dream nav tab has been selected.
    // this useEffect also sets our state variables to display dream data.
    useEffect(() => {
        (async () => {
            const data = await dispatch(getSingleDream(currentDream.id));
            
            await setTitle(data.title)
            // dream.date is a json date so needs to be handled
            const handledDate = dateHandler(data.date)
            await setDate(handledDate)
            // edit body is what shows in the editor, value is the parsed body to display outside of the editor
            await setEditBody(data.body)
            const parsedBody = parse(data.body)
            await setValue(parsedBody)
            await setIsEdit(false)
            await setIsLoaded(true);
        })();
    }, [dispatch, currentDream.id]);


    // if use effect hasnt run or there was no dreamProp passed for some reason.
    if (!isLoaded || !dreamProp.length) {
        return (
            <div>just loading!</div>
        )
    }

    // edit button handler, when is edit is true it will render the edit form
    const openEditor = async (e) => {
        e.preventDefault()
        setIsEdit(true)
    }

    // handles edit form submit
    const saveChanges = async(e) => {
        e.preventDefault()
        const body = editBody //html string, not parsed
        const dreamId = selectedDream.id
        const strDate = dateHandler(date)
        

        const data = await dispatch(updateDream(title, strDate, body, dreamId))
            if (data) {
                console.log(data)
                setErrors(data);
            } else {
                // TODO
                // await setTitle()
                await setValue(parse(editBody))
                await setIsEdit(false)
            }
    }

    

    let detailComponents;
    if (isEdit) {
        detailComponents = (
            <div className="dream-edit-view">
                <div className={errors.length ? "edit-dream-errors" : "hidden-errors"}>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <h2>Edit Your Dream</h2>
                <form onSubmit={saveChanges}>
                    <div className="edit-title flex">
                        <label htmlFor="title">Title</label>
                        <input name='title' type='text' value={title} onChange={e => setTitle(e.target.value)}/>
                    </div>
                    <div className="edit-date flex">
                        <label htmlFor="date">Date</label>
                        <input name='date' type='date' value={date} onChange={e => setDate(e.target.value)} />
                    </div>
                    <ReactQuill theme='snow' value={editBody} onChange={setEditBody}/>

                    <div className="edit-form-button">
                    <button type="submit" >Save Changes</button>
                    </div>
                </form>
            </div>
        )
    } else {
        detailComponents = (
            <div className="dream-detail-view">
                <div className="dream-detail-header">
                    <div className="detail-date">{date}</div>
                    <div className="detail-title">{title}</div>
                    <div className="detail-button-container">
                        <button onClick={openEditor}>Edit Dream</button>
                        <OpenModalButton
                            buttonText="Delete Dream"
                            modalComponent={<DeleteDreamModal currentDreamId={selectedDream.id} />}
                        />
                    </div>
                </div>
                <div className="detail-body">{value}</div> 
            </div>
        )
    }

    return (
        <div className='dream-detail-container' key={dreamProp}>{detailComponents}</div>
    )
}

export default DreamDetail