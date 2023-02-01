// Constants
const LOAD_JOURNALS = 'journals/LOAD_JOURNALS';
const LOAD_SINGLE_JOURNAL = 'journals/LOAD_SINGLE_JOURNAL'
const ADD_JOURNAL = 'journals/ADD_JOURNAL';
const EDIT_JOURNAL = 'journals/EDIT_JOURNAL';
const DELETE_JOURNAL = 'journals/DELETE_JOURNAL';

/* --------- ACTIONS ---------- */

const loadJournals = (data) => ({
    type: LOAD_JOURNALS,
    payload: data
})

const addJournal = (data) => ({
    type: ADD_JOURNAL,
    payload: data
})

const editJournal = (data) => ({
    type: EDIT_JOURNAL,
    payload: data
})

const loadSingleJournal = (data) => ({
    type: LOAD_SINGLE_JOURNAL,
    payload: data
})

// const deleteJournal = () => ({
//     type: DELETE_JOURNAL
// })


/* --------- JOURNAL THUNKS ---------- */

export const loadJournalsThunk = () => async (dispatch) => {
    const response = await fetch('/api/journals')

    if (response.ok) {
        const data = await response.json()
        console.log(data)
        dispatch(loadJournals(data))
        return null
    } else if (response.status < 500) {
        const data = response.json()
        if(data.errors){
            return data.errors
        }
    } else {
        return ['an error ocurred at load journals, please try again.']
    }
}

export const loadSingleJournalThunk = (journalId) => async (dispatch) => {
    const response = await fetch(`/api/journals/${journalId}`)

    if (response.ok) {
        const data = await response.json()
        console.log(data)
        dispatch(loadSingleJournal(data))
        return null
    } else if (response.status < 500) {
        const data = response.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['an error ocurred at load journals, please try again.']
    }
}

export const createJournalThunk = (title) => async (dispatch) => {
    
    const response = await fetch('/api/journals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title
        }
        )

    })
    if (response.ok) {
        const data = await response.json()
        
        dispatch(addJournal(data))
        return null
    } else if (response.status < 500) {
        const data = response.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['an error ocurred at add journals, please try again.']
    }
}

export const editJournalThunk = (title, journalId) => async (dispatch) => {

    const response = await fetch(`/api/journals/${journalId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title
        }
        )

    })
    if (response.ok) {
        const data = await response.json()
        dispatch(editJournal(data))
        return null
    } else if (response.status < 500) {
        const data = response.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['an error ocurred at edit journals, please try again.']
    }
}

export const deleteJournalThunk = (journalId) => async (dispatch) => {
    const response = await fetch(`/api/journals/${journalId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        // const data = await response.json()
        // dispatch(deleteJournal())
        dispatch(loadJournalsThunk())
        return null
    } else if (response.status < 500) {
        const data = response.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['an error ocurred at edit journals, please try again.']
    }
}


const initialState = { journals: {}, singleJournal: { entries: []} }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_JOURNALS: {
            const newState = { journals: {}, singleJournal: { entries: [] } }
            // console.log("action.data", action.payload)
                action.payload.forEach( journal => newState.journals[journal.id] = journal)
            return newState;
        }
        case LOAD_SINGLE_JOURNAL: {
            const newState = { journals: { ...state.journals }, singleJournal: { entries: [] } }
            newState.singleJournal = action.payload
            newState.singleJournal.entries = action.payload.entries
            return newState;
        }
        case ADD_JOURNAL: {
            const newState = { journals: { ...state.journals }, singleJournal: { entries: [] } }
            newState.journals[action.payload.id] = action.payload;
            return newState;
        }
        case EDIT_JOURNAL: {
            const newState = { journals: { ...state.journals }, singleJournal: { entries: [] } }
            newState.journals[action.payload.id] = action.payload;
            return newState;
        }
        case DELETE_JOURNAL: {
            const newState = {journals: {}}
            return newState
        }
        default:
            return state
    }
}