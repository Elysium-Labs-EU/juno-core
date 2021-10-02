import FileSaver from 'file-saver'

export default (fileData: any, fileName: string) =>
  FileSaver.saveAs(fileData, fileName)
