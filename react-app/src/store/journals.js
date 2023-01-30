// Constants
const LOAD_JOURNALS = 'journals/LOAD_DREAMS';
const ADD_JOURNAL = 'journals/ADD_JOURNAL';

/* --------- ACTIONS ---------- */

const loadJournals = (data) => ({
    type: LOAD_JOURNALS,
    payload: data
})

const addJournal = (data) => ({
    type: ADD_JOURNAL,
    payload: data
})


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

export const createJournalThunk = (title) => async (dispatch) => {
    const response = await fetch('/api/journals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            title
        )
    })
    if (response.ok) {
        const data = await response.json()
        console.log(data)
        dispatch(addJournal(data))
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


const initialState = { journals: {} }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_JOURNALS: {
            const newState = {journals : {}}
            // console.log("action.data", action.payload)
                action.payload.forEach( journal => newState.journals[journal.id] = journal)
            return newState;
        }
        case ADD_JOURNAL: {
            const newState = {journals: {...state.journals}}
            newState.journals[action.payload.id] = action.payload;
            return newState;
        }
        default:
            return state
    }
}