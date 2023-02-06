import { useState, useEffect } from "react"
import { useDispatch, useSelector} from "react-redux";
// import { useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';

import { getSingleDream, updateDreamThunk } from "../../store/dreams";
import OpenModalButton from "../OpenModalButton";
import DeleteDreamModal from "../DeleteDreamModal";
import './DreamDetail.css'
import LoadingPage from "../ExtraPages/LoadingPage";
import moment from 'moment'
import { loadSingleJournalThunk } from "../../store/journals";

/* This component shows a nicely rendered view of a particular 
    dream entry, and handles editing of the dream.*/

const DreamDetail = ({dreamProp, isJournal}) => {
    // console.log("dreamprop:", dreamProp)
    // grab dream slice of state
    const selectedDream = useSelector(state => state.dreams.singleDream)
    // const userJournals = useSelector(state => state.session.user.journals)
    const userJournals = useSelector(state => state.journals.journals)
    const journalsArr = Object.values(userJournals)
    // console.log(journalsArr)
    // console.log(selectedDream.id)
   
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [errors, setErrors] = useState([]);
    // to toggle editor
    const [isEdit, setIsEdit] = useState(false)

    const [title, setTitle] = useState('') //string
    const [date, setDate] = useState('') //date string in yyyy-mm-dd 
    const [journalId, setJournalId] = useState('')
    const [value, setValue] = useState('') //this is the value of the 'body' after being parsed by the react html parser
    const [editBody, setEditBody] = useState('') // this is the value of the body before being parsed, so still html string

    // function returns date as 'yyyy-mm-dd'
    // const dateHandler = (str) => {
    //     const handled = moment(str, 'MM-DD-YYYY').format("MM/DD/YYYY")
    //     return handled
    // }

    // load dream slice of state, which is a single dream. it is set by grabbing the 
    // dream id of the dreamProp passed from the DreamsTab component.
    //  it changes depending on which dream nav tab has been selected.
    // this useEffect also sets our state variables to display dream data.
    useEffect(() => {
        (async () => {

            if (dreamProp){
                const data = await dispatch(getSingleDream(dreamProp.id));
                
                await setTitle(data.title)
                // console.log(data.date)
                await setDate(data.date)
                // console.log(data.journal)
                await setJournalId(data.journal['id'])
                // edit body is what shows in the editor, value is the parsed body to display outside of the editor
                await setEditBody(data.body)
                const parsedBody = parse(data.body)
                await setValue(parsedBody)
                await setIsEdit(false)
                await setIsLoaded(true);
            }
            // await dispatch(loadJournalsThunk())
        })();
    }, [dispatch, dreamProp]);


    // if use effect hasnt run or there was no dreamProp passed for some reason.
    if (!isLoaded) {
        return (
            <LoadingPage />
        )
    }

    

    const bodyHasContent = (body) => {
        const htmlRegex = /(<([^>]+)>)/ig
        const whiteSpaceRegex = /\s/g
        let noHtml = body.replace(htmlRegex, "")
        let notWhiteSpace = !!(noHtml.replace(whiteSpaceRegex, "").length)
        return notWhiteSpace
    }

    // edit button handler, when is edit is true it will render the edit form
    const openEditor = async (e) => {
        e.preventDefault()
        setIsEdit(true)
    }

    // handles edit form submit
    const saveChanges = async(e) => {
        e.preventDefault()
        // add validations for date
        const errors = []
        const trimTitle = title.trim()
        if (!trimTitle) errors.push(['Please give your dream a title'])
        if(trimTitle.length > 35) errors.push(['Title must be less than 35 characters.'])
        if (!date) errors.push(['When did you have this dream?'])
        if (!journalId) errors.push(['Please select a journal for this dream'])
        if (!bodyHasContent(editBody)) errors.push(['Please describe your dream'])
       
        if(!errors.length){
            setErrors([])
            const dreamId = selectedDream.id
            // const strDate = dateHandler(date)
    
            const data = await dispatch(updateDreamThunk(trimTitle, date, editBody, dreamId, journalId))
                if (data.errors) {
                    // console.log(data)
                    return setErrors(data.errors);
                } else {
                    const loadJournal = await dispatch(loadSingleJournalThunk(journalId))
                    if (loadJournal.errors) {
                        return setErrors(loadJournal.errors);
                    } else{
                        await setValue(parse(editBody))
                        await setIsEdit(false)
                        return
                    }
                }
        }
        return setErrors(errors)
    }

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet'
    ]
    

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
                <form className="edit-dream-form" onSubmit={saveChanges}>
                    <div className="edit-title flex">
                        <label htmlFor="title">Title</label>
                        <input name='title' type='text' value={title} onChange={e => setTitle(e.target.value)}/>
                    </div>
                    <div className="edit-date flex">
                        <label htmlFor="date">Date</label>
                        <input name='date' type='date' value={date} onChange={e => setDate(e.target.value)} />
                    </div>
                    <div className="journal-select">
                        <select name="journal" value={journalId} onChange={e => setJournalId(e.target.value)}>
                            <option value="">Select a Journal...</option>
                            {journalsArr.map(journal => (
                                <option key={journal.id} value={journal.id}>{journal.title}</option>
                            ))}
                        </select>
                    </div>
                    <ReactQuill theme='snow' modules={modules} formats={formats} value={editBody} onChange={setEditBody}/>

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
                    
                    <div className="detail-button-container">
                        <button onClick={openEditor}>Edit Dream</button>
                        <OpenModalButton
                            buttonText="Delete Dream"
                            modalComponent={<DeleteDreamModal currentDream={selectedDream} isJournal={isJournal}/>}
                        />
                    </div>
                </div>
                <div className="detail-body flexcol">
                    <div className="detail-body-top flex">
                        <div className="detail-title">{title}</div>
                        <div className="detail-date">{moment(date, 'YYYY-MM-DD').format("MM/DD/YYYY")}</div>
                    </div>
                    <div>{value}</div>
                    </div> 
            </div>
        )
    }

    return (
        <div className='dream-detail-container' key={dreamProp}>{detailComponents}</div>
    )
}

export default DreamDetail