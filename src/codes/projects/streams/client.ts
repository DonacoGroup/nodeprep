/** This client send request to a stream server and receive a response*/
import { get } from 'node:http'

type Host = string

const host:Host = 'http://localhost:4999'

const getWelcome = () => new Promise((resolve) => get(`${host}`, (response) => resolve(response)))

const getReports = () => new Promise((resolve) => get(`${host}/reports`, (response) => resolve(response)))

const welcome = await getWelcome()
const reports = await getReports()


welcome.pipe(process.stdout)
reports.pipe(process.stdout)
