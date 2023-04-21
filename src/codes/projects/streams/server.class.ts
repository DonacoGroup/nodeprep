// Classes
import {Title, Name, Value, Unit, Description} from './server.type'
import {Status} from './server.enum'
import {ReportDataInterface, ReportInterface} from './server.interface'

class Report implements ReportInterface<ReportDataInterface> {
  title: Title
  data: ReportData[]
  createAt: Date


  constructor(title: Title, data: ReportData[] ) {
    this.title = title
    this.data = data
    this.createAt = new Date()
  }

  getTitle = (): Title => {
    return this.title
  }

  setTitle = (title: Title) => {
    this.title = title
  }

  getData = (): ReportData[] => {
    return this.data
  }

  setData = (data: ReportData[]) => {
    this.data = data
  }

}

class ReportData implements ReportDataInterface {
  name: Name
  value: Value
  unit: Unit
  description: Description
  status: Status 

  constructor (name: Name, value: Value, unit: Unit = '', description: Description = '', status: Status = Status.Draft) {
    this.name = name
    this.value = value
    this.unit = unit
    this.description = description
    this.status = status
  }

  getName = () => {
    return this.name
  }

  setName = (name: Name) => {
    this.name = name
  }

  getValue = () => {
    return this.value
  }

  setValue = (value: Value) => {
    this.value = value
  }

  getDescription = () => {
    return this.description
  }

  setDescription = (description: Description) => {
    this.description = description
  }

  getStatus = () => {
    return this.status
  }
  setStatus = (status: Status) => {
    this.status = status
  }



}

export {
  Report,
  ReportData
}