import { ReportData } from "../../../codes/projects/streams/server.class";

describe('Creating a new report data', () => {
  it('should return an instance of ReportData', () => {
    const reportData = new ReportData('Number of promoters', 12000);
    expect(reportData).toBeDefined();
    expect(typeof reportData).toEqual('object');
    expect(reportData.getName()).toEqual('Number of promoters');
    expect(reportData.getValue()).toEqual(12000)
    reportData.setValue(22000)
    expect(reportData.getValue()).toEqual(22000)
  });

});