import { randomUUID } from "node:crypto";
import { Readable, Transform } from "stream";
import { Report, ReportData } from "./server.class";
import { Status } from "./server.enum";

// Generate reports on demand with a generator object
function* generateReports (): Generator<Report> {

  for(let index = 0; index < 1000; index++){
    let report = new Report(`Report #${randomUUID()}`, [
      new ReportData('Number of promoters', 100 * index),
      new ReportData('Number of consumers', 1_000_000 * index),
      new ReportData('Number of campaigns', 1_000 * index),
    ])

    yield report
  }

}
// Update report data statuses for report passed as first parameter to status passed as second parameter
const updateReportDataStatus = (chunckedReport: Report, status: Status) => {
  for(let entry of chunckedReport.getData()){
    entry.setStatus(status)
  }
  return chunckedReport
}

// Create a transform stream that update report data status randomly
const randomStatusUpdateTransform = new Transform({
  objectMode: false,
  transform(chunck, _encoding, callback){
    console.log(chunck)
    let chunckedReport = JSON.parse(chunck)
    console.log(chunckedReport)
    // Generate a random number between 1 and 4
    const random = Math.floor((Math.random() * 4))
    // The generated number to update reportdata's status
    if(random === 1){
      updateReportDataStatus(chunckedReport as Report, Status.Reviewed)
    }
    if(random === 2){
      updateReportDataStatus(chunckedReport as Report, Status.Approved)
    }
    if(random === 3){
      updateReportDataStatus(chunckedReport as Report, Status.Published)
    }
    // return the new report
    callback(null, JSON.stringify(chunckedReport))
  }
})

export {
  randomStatusUpdateTransform,
  generateReports
}

// test it
const readableStream = new Readable ({
  read(){
    for(const report of generateReports()){
      this.push(JSON.stringify(report).concat('\n'))
    }
    // Indicate the end of the stream
    this.push(null) 
  }
})
// Pipe it to response
readableStream
.pipe(randomStatusUpdateTransform)

//.pipe(process.stdout)