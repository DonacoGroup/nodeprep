/** This server return data produce by a generator function as stream */
import { createServer, IncomingMessage, ServerResponse} from 'node:http'
import { Readable } from 'node:stream'
import { generateReports, randomStatusUpdateTransform } from './server.util'

const requestHandler = (request: IncomingMessage, response: ServerResponse) => {
  switch(request.url){
    case '/':
      response.statusCode = 200
      response.end(JSON.stringify({
        data: 'Welcome, the stream server is healthy!'
      }))
      break;
    case '/reports':
      if(request.method === 'GET'){
        response.statusCode = 200
        // Create a readable stream for the stream of reports data generated by *generateReports()
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
        //.pipe(response)
      }
      break;
    default:
      response.statusCode = 404
      response.end(JSON.stringify({
        data: '404 - Not Found'
      }))
      break;
  }
}

createServer(requestHandler)
.listen(4999)
.on('listening', () => console.log('Listening to node stream server on 4999'))
.on('error',  (err) => console.log(`Error on stream server ${err}`))