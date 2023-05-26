import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'

interface PdfEngine {
  engineName: string
  LoadDocument: (pathToPDFFile: string) => Promise<PDFDocumentProxy>
  CloseDocument: () => void
  GetPageCount: () => number
  GetPageSize: (pageNumber: number) => Promise<{ width: number, height: number }>
  SaveAs: (fileName: string) => Promise<void>
  RenderPage: (pageNumber: number, ctx: CanvasRenderingContext2D) => Promise<void>
  Annotate?: (annotation: string) => Promise<string>
  Encrypt?: () => Promise<string>
  Decrypt?: () => Promise<string>
  Search?: (searchTerm: string) => Promise<string>
}

export { PdfEngine }