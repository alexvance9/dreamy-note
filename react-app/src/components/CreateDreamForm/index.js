import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createDreamThunk } from "../../store/dreams";
import { loadJournalsThunk } from "../../store/journals";
import './CreateDreamForm.css'
import '../DreamDetail/DreamDetail.css'
import LoadingPage from "../ExtraPages/LoadingPage";
// import moment from 'moment'

const CreateDreamForm = () => {
    
    const dispatch = useDispatch()
    const history = useHistory()

    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [journalId, setJournalId] = useState("")
    const [body, setBody] = useState("")

    const userJournals = useSelector(state => state.journals.journals)
    const journalsArr = Object.values(userJournals)

    useEffect(() => {
        (async () => {
            await dispatch(loadJournalsThunk());
        })();
    }, [dispatch]);

    if (!Object.values(userJournals).length){
        return <LoadingPage />
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
    

    const bodyHasContent = (body) => {
        // console.log(body)
        const htmlRegex = /(<([^>]+)>)/ig
        const whiteSpaceRegex = /\s/g
        let noHtml = body.replace(htmlRegex, "")
        let notJustWhiteSpace = !!(noHtml.replace(whiteSpaceRegex, "").length)
        return notJustWhiteSpace
    }

   const handleSubmit = async (e) => {
        e.preventDefault()
// todo validate date exists
        const errors = []
        const trimTitle = title.trim()
        if (!trimTitle) errors.push(['Please name your Dream'])
        if (trimTitle.length > 35) errors.push(['Title must be less than 35 characters.'])
        if (!date) errors.push(['When did you have this dream?'])
        if(!journalId) errors.push(['Please select a journal for this dream'])
        if (!bodyHasContent(body)) errors.push(['Please describe your dream'])
        
        if(!errors.length){
            setErrors([])
            // const submitDate = handleDate(date)
            // console.log("date being sent to thunk: ", submitDate, typeof submitDate)
            const data = await dispatch(createDreamThunk(trimTitle, date, body, journalId))
            if (data.errors) {
                // console.log(data)
                return setErrors(data.errors);
            } else {
                return history.push(`/dreams/${data.id}`)
            }
        } 
        return setErrors(errors)
    }

    const handleCancel = (e) => {
        e.preventDefault()
        return history.push('/dreams')
    }

    return (
        <div className="dream-detail-container">
        <div className="dream-form-container">
            <div className={errors.length ? "create-dream-errors" : "hidden-errors"}>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <h2>New Dream</h2>
            <form className="create-dream-form" onSubmit={handleSubmit}>
                <div className="create-title flex">
                    <label htmlFor="title">Title</label>
                    <input name='title' placeholder="Title" type='text' value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="create-date flex">
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
                <ReactQuill theme='snow' modules={modules} formats={formats} value={body} onChange={setBody} />
                
                <div className="create-dream-button">
                <button className="cancel-button-dreams" onClick={handleCancel}>Cancel</button>
                <button type="submit" >Save Dream</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default CreateDreamForm