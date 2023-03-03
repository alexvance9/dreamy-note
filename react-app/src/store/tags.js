// action variables
const LOAD_TAGS = 'tags/LOAD_TAGS'
const CREATE_TAG = 'tags/CREATE_TAG'

// actions
const loadTags = (tags) => ({
    type: LOAD_TAGS,
    payload: tags
})

const createTag = (tag) => ({
    type: CREATE_TAG,
    payload: tag
})
// thunks
export const thunkLoadTags = () => async (dispatch) => {
    const response = await fetch('/api/tags')
    if (response.ok){
        const tags = await response.json()
        console.log('tags at thunk: ', tags)
        dispatch(loadTags(tags))
        return null
    } else if (response.status < 500) {
        const data = await response.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['An error occured at load tags, please try again.']
    }
}

export const thunkCreateTag = (name) => async (dispatch) => {
    const response = await fetch('/api/tags', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name
        })
    })
    if (response.ok){
        const data = await response.json()
        dispatch(createTag(data))
        return null
    } else if (response.status < 500) {
        const data = await response.json()
        if (data.errors) {
            return data
        }
    } else {
        return ['an error ocurred at add journals, please try again.']
    }
}

const initialState = { tags: {}}
export default function reducer(state = initialState, action){
    switch (action.type) {
        case LOAD_TAGS: {
            const newState = { tags: {} }
            console.log('action.payload:', action.payload)
            action.payload.forEach(tag => newState.tags[tag.id] = tag)
            return newState;
        } 
        case CREATE_TAG: {
            const newState = { tags: {...state.tags} }
            newState.tags[action.payload.id] = action.payload;
            return newState;
        }
        default:
            return state;
    }
}