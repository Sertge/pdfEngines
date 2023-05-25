import pdfjs from 'pdfjs-dist'
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'
import { PdfEngine } from './Ipdfengine'

class SoSoPDFEngine implements PdfEngine {
  currentDocument: PDFDocumentProxy | undefined
  LoadDocument = async (pathToPDFFile: string) => {
    const documentTask = await pdfjs.getDocument(pathToPDFFile).promise
    this.currentDocument = documentTask
  }
  CloseDocument = () => {
    this.currentDocument?.destroy()
  }
  GetPageCount = () => {
    return this.currentDocument ? this.currentDocument.numPages : 0
  }
  GetPageSize = () => {
    this.currentDocument
  }
  SaveAs = (fileName: string) => {

  }
  RenderPage = (pageNumber: number) => {
    
  }
}

export { SoSoPDFEngine};