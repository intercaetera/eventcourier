let store = {}

export const getState = () => store

export const getDispatch = reducer => {
	const dispatch = action => {
		store = reducer(store, action)
	}

	return dispatch
}
