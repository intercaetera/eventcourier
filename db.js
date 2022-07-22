import path from 'path'
import { promises as fs, createReadStream } from 'fs'
import readline from 'readline'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = path.join(__dirname, 'events.log')

// Initialize event log
export const initializeLog = async () => {
	try {
		await fs.writeFile(
			file,
			JSON.stringify({ id: 0, action: { type: 'INITIALIZE' } }) + '\n'
			, { flag: 'wx' }
		)

		console.info('Event log initialized')
	} catch (e) {
		if (e.code === 'EEXIST') return
		else console.error(e)
	}
}

export const serializeAction = action => {
	fs.appendFile(file, JSON.stringify({ id: Date.now(), action }) + '\n')
}

export const deserializeActions = async dispatch => {
	const fstream = createReadStream(file)
	const rl = readline.createInterface(fstream)

	for await (const line of rl) {
		const parsedLine = JSON.parse(line)
		dispatch(parsedLine.action)
	}
}
