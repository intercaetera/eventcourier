import { types } from './types'

export const addPackage = ({ from, to, sentOn, id }) => ({
	type: types.ADD_PACKAGE,
	payload: { from, to, sentOn, id }
})

export const deliverPackage = ({ id, deliveredOn }) => ({
	type: types.DELIVER_PACKAGE,
	payload: { id, deliveredOn }
})
