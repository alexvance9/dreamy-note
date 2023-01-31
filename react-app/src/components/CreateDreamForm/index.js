import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
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
    const [journalId, setJournalId] = useState("")
    const [body, setBody] = useState("")

    const userJournals = useSelector(state => state.session.user.journals)
    console.log("user journals: ", userJournals)
    console.log('journal state:', journalId)
    // const journalTitlesList = userJournals.map(journal => {
    //     return journal.title
    // })
    // console.log('journal titles: ', journalTitlesList)

    
// yyyy-mm-dd
    const handleDate = (str) => {
        const dateStr = new Date(str).toISOString().split('T')[0]?.toString()
        return dateStr
    }

    const bodyHasContent = (body) => {
        console.log(body)
        const htmlRegex = /(<([^>]+)>)/ig
        const whiteSpaceRegex = /\s/g
        let noHtml = body.replace(htmlRegex, "")
        let notWhiteSpace = !!(noHtml.replace(whiteSpaceRegex, "").length)
        return notWhiteSpace
    }

   const handleSubmit = async (e) => {
        e.preventDefault()
// todo validate date exists

        const submitDate = handleDate(date)
        if (bodyHasContent(body)){
            const data = await dispatch(createDream(title, submitDate, body, journalId))
            if (data) {
                console.log(data)
                setErrors(data);
            } else {
                await history.push('/dreams')
            }
        } else {
            setErrors(['Please Describe Your Dream'])
            return
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
                <div className="journal-select">
                    <select name="journal" value={journalId} onChange={e => setJournalId(e.target.value)}>
                        <option value="">Select a Journal...</option>
                        {userJournals.map(journal => (
                            <option key={journal.id} value={journal.id}>{journal.title}</option>
                        ))}
                    </select>
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