import { PdfEngine } from "./engines/Ipdfengine";
import { AlsoOkPDFEngine } from "./engines/alsookpdfengine";
import { BestPDFEngine } from "./engines/bestpdfengine";
import { BetterPDFEngine } from "./engines/betterpdfengine";
import { OkPDFEngine } from "./engines/okpdfengine";
import { SoSoPDFEngine } from "./engines/sosopdfengine";

/**
 * Implement this interface. 
 * Engine name is just an example, feel free to structure this as you see fit
 */ 
interface PDFWrapper extends PdfEngine {}

/**
 * 
 * @param {string} pathToPDFFile - The path to a pdf file
 * @param {number} fileInfoByte - A binary represenation of the attributes required to render the PDF.
 * You can choose which LSB represents which characteristic (annotation, encryption, search)
 * @returns {PDFWrapper} - A PDFWrapper that wraps a selected PDF rendering engine
 */
export async function renderPDF(pathToPDFFile: string, fileInfoByte: number): Promise<PDFWrapper> {
  // fileInfoByte is reduced to it's 3 LSB by using modulus operation (%)
  // after that, the 3 LSB define these features: 
  // B_2 = Annotation
  // B_1 = Encrypt/Decrypt
  // B_0 = Search
  const trimmedFileInfoByte = fileInfoByte%8
  const engineSelector: () => PdfEngine = () => {
    switch (trimmedFileInfoByte) {
      case 0b000:
        return new SoSoPDFEngine()
      case 0b001:
        return new OkPDFEngine()
      case 0b010:
        return new AlsoOkPDFEngine()
      case 0b011:
        return new BestPDFEngine()
      case 0b100:
      case 0b101:
        return new BetterPDFEngine()
      case 0b110:
      case 0b111:
        return new BestPDFEngine()
      default:
        return new BestPDFEngine()
    }
  }

  const engine = engineSelector()
  await engine.LoadDocument(pathToPDFFile)
  const pdfWrapper: PDFWrapper = engine;
  return pdfWrapper;
}

// Feel free to use or remove this run function
function run() {
  console.info('Hello from the index file')
}

run();