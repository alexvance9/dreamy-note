// Constants
const LOAD_JOURNALS = 'journals/LOAD_DREAMS';

/* --------- ACTIONS ---------- */

const loadDreams = (data) => ({
    type: LOAD_JOURNALS,
    payload: data
})


/* --------- JOURNAL THUNKS ---------- */

export const loadDreamsThunk = () => async (dispatch) => {
    const response = await fetch('/api/journals')

    if (response.ok) {
        const data = await response.json()
        dispatch(loadDreams(data))
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


const initialState = { journals: {} }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_JOURNALS: {
            const newState = {journals : {}}
                action.data.forEach( journal => newState.journals[journal.id] = journal)
            return newState;
        }
        default:
            return state
    }
}