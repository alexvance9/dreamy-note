// action variables
const LOAD_TAGS = 'tags/LOAD_TAGS'

// actions
const loadTags = (tags) => ({
    type: LOAD_TAGS,
    payload: tags
})

// thunks
export const thunkLoadTags = () => async (dispatch) => {
    const response = await fetch('/api/tags')
    if (response.ok){
        const tags = response.json()
        dispatch(loadTags(tags))
        return null
    } else if (response.status < 500) {
        const data = response.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['An error occured at load tags, please try again.']
    }
}

const initialState = { tags: []}
export default function reducer(state = initialState, action){
    switch (action.type) {
        default:
            return state;
    }
}