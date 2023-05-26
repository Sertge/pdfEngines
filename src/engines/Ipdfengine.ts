import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'

interface PdfEngine {
  LoadDocument: (pathToPDFFile: string) => Promise<PDFDocumentProxy>
  CloseDocument: () => void
  GetPageCount: () => number
  GetPageSize: (pageNumber: number) => Promise<{ width: number, height: number }>
  SaveAs: (fileName: string) => Promise<void>
  RenderPage: (pageNumber: number, ctx: CanvasRenderingContext2D) => Promise<void>
  annotate?: (annotation: string) => Promise<void>
  Encrypt?: () => Promise<void>
  Decrypt?: () => Promise<void>
  Search?: (searchTerm: string) => Promise<void>
}

export { PdfEngine }