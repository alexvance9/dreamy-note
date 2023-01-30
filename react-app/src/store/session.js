// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

/* --------- ACTIONS ---------- */

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})




/* --------- AUTH THUNKS ---------- */

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
  
    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

/*---------- DREAM THUNKS ---------- */

export const createDream = (title, date, body, journalId) => async (dispatch) => {
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
    // api route will return current user to update user slice of state
    const data = await response.json();
    dispatch(setUser(data))
    return null
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


export const updateDream = (title, date, body, dreamId, journalId) => async (dispatch) => {
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
    // api route will return current user to update user slice of state
    const data = await response.json();
    dispatch(setUser(data))
    return null
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

export const deleteDream = (dreamId) => async (dispatch) => {
  const response = await fetch(`/api/dreams/${dreamId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    // api route will return current user to update user slice of state
    const data = await response.json();
    dispatch(setUser(data))
    return null
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

/*---------- REDUCER ---------- */

const initialState = { user: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    default:
      return state;
  }
}