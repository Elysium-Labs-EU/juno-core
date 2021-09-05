import FileSaver from 'file-saver'

export default (fileData, fileName) => FileSaver.saveAs(fileData, fileName)
