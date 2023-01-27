const SET_DREAM = 'dream/SET_DREAM'

const setDream = (dream) => ({
    type: SET_DREAM,
    payload: dream
})


export const getSingleDream = (dreamId) => async (dispatch) => {
    const response = await fetch(`/api/dreams/${dreamId}`)
    if (response.ok){
        const dream = await response.json()
        dispatch(setDream(dream))
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


const initialState = { dream: {} }

export default function reducer(state = initialState, action) {
    switch (action.type){
        case SET_DREAM:
            return { dream: action.payload }
        default:
            return state
    }
}