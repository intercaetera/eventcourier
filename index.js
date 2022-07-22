import express from 'express'
import { v4 as uuid } from 'uuid'

import { getState } from './store'
import { dispatch, command } from './command'
import { addPackage, deliverPackage } from './actions'
import { initializeLog, deserializeActions } from './db'

const app = express()
const port = 3000

initializeLog().then(() => {
	deserializeActions(dispatch)
})

app.use(express.json())
app.get('/', (_req, res) => {
	res.json(getState())
})

app.post('/add', (req, res) => {
	const { from, to } = req.body

	if (!from) return res.json({ ok: false, error: 'From field missing' })
	if (!to) return res.json({ ok: false, error: 'To field missing' })

	const sentOn = Date.now()
	const id = uuid()

	command(addPackage({ from, to, sentOn, id }))

	res.json({ ok: true })
})

app.post('/deliver', (req, res) => {
	const { id } = req.body

	if (!id) return res.json({ ok: false, error: 'ID missing' })
	if (!getState()[id]) return res.json({ ok: false, error: 'No such package' })

	const deliveredOn = Date.now()

	command(deliverPackage({ id, deliveredOn }))

	res.json({ ok: true })
})

app.listen(port, () => {
	console.log(`EventCourier app listening on port ${port}`)
})
