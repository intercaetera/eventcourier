import { types } from './types'

export const reducer = (state, { type, payload }) => {
	if (type === types.ADD_PACKAGE) {
		return { 
			...state,
			[payload.id]: {
				from: payload.from,
				to: payload.to,
				sentOn: payload.sentOn,
			}
		}
	}

	if (type === types.DELIVER_PACKAGE) {
		if (!state[payload.id]) return state

		return {
			...state,
			[payload.id]: {
				...state[payload.id],
				deliveredOn: payload.deliveredOn
			}
		}
	}

	return state
}
