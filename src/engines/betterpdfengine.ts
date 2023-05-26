import { getDocument } from 'pdfjs-dist'
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'
import { PdfEngine } from './Ipdfengine'

class BetterPDFEngine implements PdfEngine {
  engineName = 'BetterPDFEngine'
  currentDocument: PDFDocumentProxy | undefined
  LoadDocument = async (pathToPDFFile: string) => {
    const documentTask = await getDocument(pathToPDFFile).promise
    this.currentDocument = documentTask
    return this.currentDocument
  }
  CloseDocument = () => {
    this.currentDocument?.destroy()
    delete this.currentDocument
  }
  GetPageCount = () => {
    if (this.currentDocument === undefined) {
      throw new Error('No document open, please open a document before attempting this function')
    }
    return this.currentDocument.numPages
  }
  GetPageSize = async (pageNumber: number) => {
    if (this.currentDocument === undefined) {
      throw new Error('No document open, please open a document before attempting this function')
    }
    const currentPage = await this.currentDocument.getPage(pageNumber)
    const width = currentPage.getViewport().width
    const height = currentPage.getViewport().height
    return { width, height }
  }
  SaveAs = async (fileName: string) => {
    if (this.currentDocument === undefined) {
      throw new Error('No document open, please open a document before attempting this function')
    }
    const savedFile = await this.currentDocument.saveDocument()
  }
  RenderPage = async (pageNumber: number, ctx: CanvasRenderingContext2D) => {
    if (this.currentDocument === undefined) {
      throw new Error('No document open, please open a document before attempting this function')
    }  
    const currentPage = await this.currentDocument.getPage(pageNumber)
    await currentPage.render({ canvasContext: ctx, viewport: currentPage.getViewport({ scale: 1.0 })}).promise
  }
  Annotate = async (annotation: string) => {
    console.log(`Added annotation ${annotation}`)
    return `${this.engineName} Annotate method is working`
  }
}

export { BetterPDFEngine }