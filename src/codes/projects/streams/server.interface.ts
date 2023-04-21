// Interfaces
import {Title, Name, Value, Unit, Description} from './server.type'
import { Status } from './server.enum'
interface ReportInterface<T> {
  title: Title,
  data: T[],
  createAt: Date,
  getTitle: () => Title
  setTitle: (title: Title) => Title
  getData(): ReportDataInterface[]
  setData: (data: ReportDataInterface[]) => ReportDataInterface[]
}

interface ReportDataInterface {
  name: Name,
  value: Value,
  unit: Unit,
  description: Description,
  status: Status  
  // getName: () => Name
  // setName: (name: Name) => Name
  // getValue: () => Value
  // setValue: (value: Value) => Value
  // getDescription: () => Description
  // setDescription: (description: Description) => Description
  // getStatus: () => Status
  // setStatus: (status: Status) => Status
}

export {
  ReportDataInterface,
  ReportInterface
}