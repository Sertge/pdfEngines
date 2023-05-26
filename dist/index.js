"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderPDF = void 0;
const sosopdfengine_1 = require("./engines/sosopdfengine");
const okpdfengine_1 = require("./engines/okpdfengine");
const alsookpdfengine_1 = require("./engines/alsookpdfengine");
const betterpdfengine_1 = require("./engines/betterpdfengine");
const bestpdfengine_1 = require("./engines/bestpdfengine");
/**
 *
 * @param {string} pathToPDFFile - The path to a pdf file
 * @param {number} fileInfoByte - A binary represenation of the attributes required to render the PDF.
 * You can choose which LSB represents which characteristic (annotation, encryption, search)
 * @returns {PDFWrapper} - A PDFWrapper that wraps a selected PDF rendering engine
 */
function renderPDF(pathToPDFFile, fileInfoByte) {
    return __awaiter(this, void 0, void 0, function* () {
        // fileInfoByte is reduced to it's 3 LSB by using modulus operation (%)
        // after that, the 3 LSB define these features: 
        // B_2 = Annotation
        // B_1 = Encrypt/Decrypt
        // B_0 = Search
        const trimmedFileInfoByte = fileInfoByte % 8;
        console.log('trimmedByte', trimmedFileInfoByte);
        const engineSelector = () => {
            switch (trimmedFileInfoByte) {
                case 0b000:
                    console.log('SoSoPDFEngine');
                    return new sosopdfengine_1.SoSoPDFEngine();
                case 0b001:
                    console.log('OkPDFEngine');
                    return new okpdfengine_1.OkPDFEngine();
                case 0b010:
                    console.log('AlsoOkPDFEngine');
                    return new alsookpdfengine_1.AlsoOkPDFEngine();
                case 0b011:
                    console.log('BestPDFEngine');
                    return new bestpdfengine_1.BestPDFEngine();
                case 0b100:
                    console.log('BetterPDFEngine');
                    return new betterpdfengine_1.BetterPDFEngine();
                case 0b101:
                    console.log('BetterPDFEngine');
                    return new betterpdfengine_1.BetterPDFEngine();
                case 0b110:
                    console.log('BestPDFEngine');
                    return new bestpdfengine_1.BestPDFEngine();
                case 0b111:
                    console.log('BestPDFEngine');
                    return new bestpdfengine_1.BestPDFEngine();
                default:
                    console.log('BestPDFEngine');
                    return new bestpdfengine_1.BestPDFEngine();
            }
        };
        const engine = engineSelector();
        yield engine.LoadDocument(pathToPDFFile);
        const pdfWrapper = engine;
        return pdfWrapper;
    });
}
exports.renderPDF = renderPDF;
// Feel free to use or remove this run function
function run() {
    console.info('Hello from the index file');
}
run();
