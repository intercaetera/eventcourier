import { getDispatch } from './store'
import { reducer } from './reducer'
import { serializeAction } from './db'

export const dispatch = getDispatch(reducer)

export const command = action => {
	serializeAction(action)
	dispatch(action)
}
