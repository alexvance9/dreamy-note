const LOAD_DREAMS = 'dreams/LOAD_DREAMS'
const SET_SINGLE_DREAM = 'dreams/SET_SINGLE_DREAM'
const CREATE_DREAM = 'dreams/CREATE_DREAM'
const UPDATE_DREAM = 'dreams/UPDATE_DREAM'

const loadDreams = (dreams) => ({
    type: LOAD_DREAMS,
    payload: dreams
})

const setSingleDream = (dream) => ({
    type: SET_SINGLE_DREAM,
    payload: dream
})

const createDream = (dream) => ({
    type: CREATE_DREAM,
    payload: dream
})

const updateDream = (dream) => ({
    type: UPDATE_DREAM,
    payload: dream
})

export const loadDreamsThunk = () => async (dispatch) => {
    const response = await fetch('/api/dreams')
    if (response.ok) {
        const dreams = await response.json()
        dispatch(loadDreams(dreams))
        return null
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const getSingleDream = (dreamId) => async (dispatch) => {
    const response = await fetch(`/api/dreams/${dreamId}`)
    if (response.ok){
        const dream = await response.json()
        dispatch(setSingleDream(dream))
        return dream
    } else if (response.status < 500) {
        // if error is coming from backend route^^
        const data = await response.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['An error ocurred at dream thunk, please try again.']
    }
}

export const createDreamThunk = (title, date, body, journalId) => async (dispatch) => {
    const response = await fetch('/api/dreams', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            date,
            body,
            journal_id: journalId
        })
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(createDream(data))
        return data
        // create component expecting dream for redirect
    } else if (response.status < 500) {
        // if error is coming from backend route^^
        const data = await response.json()
        if (data.errors) {
            return data
        }
    } else {
        return ['An error ocurred, please try again.']
    }
}

export const updateDreamThunk = (title, date, body, dreamId, journalId) => async (dispatch) => {
    // dreamId must be sent from FE
    const response = await fetch(`/api/dreams/${dreamId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            date,
            body,
            journal_id: journalId
        })
    })

    if (response.ok) {
        const data = await response.json();
        // console.log(data)
        dispatch(updateDream(data))
        return data
    } else if (response.status < 500) {
        // if error is coming from backend route^^
        const data = await response.json()
        if (data.errors) {
            return data
        }
    } else {
        return ['An error ocurred, please try again.']
    }

}

export const deleteDreamThunk = (dreamId) => async (dispatch) => {
    const response = await fetch(`/api/dreams/${dreamId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        // api route will return current user to update user slice of state
        const dreams = await response.json();
        dispatch(loadDreams(dreams))
        return dreams;
        // FE not expecting return
    } else if (response.status < 500) {
        // if error is coming from backend route^^
        const data = await response.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['An error ocurred, please try again.']
    }
}


const initialState = { dreams: {}, singleDream: {} }

export default function reducer(state = initialState, action) {
    switch (action.type){
        case LOAD_DREAMS: {
            const newState = {dreams: {}, singleDream: {}}
            action.payload.forEach(dream => newState.dreams[dream.id] = dream)
            return newState;
        }
        case SET_SINGLE_DREAM:{
            const newState = { dreams: {...state.dreams}, singleDream: {}}
            newState.singleDream = action.payload
            return newState;
        }
        case CREATE_DREAM: {
            const newState = {dreams: {...state.dreams}, singleDream: {}}
            newState.dreams[action.payload.id] = action.payload
            return newState;
        }
        case UPDATE_DREAM: {
            const newState = {dreams: {...state.dreams}, singleDream: {}}
            newState.dreams[action.payload.id] = action.payload
            return newState;
        }
        default:
            return state
    }
}