interface PdfEngine {
  LoadDocument: (pathToPDFFile: string) => void
  CloseDocument: (pathToPDFFile: string) => void
  GetPageCount: () => number
  GetPageSize: () => void
  SaveAs: (fileName: string) => void
  RenderPage: (pageNumber: number) => void
}

export { PdfEngine }