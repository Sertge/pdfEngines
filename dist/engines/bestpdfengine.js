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
exports.BestPDFEngine = void 0;
const pdfjs_dist_1 = require("pdfjs-dist");
class BestPDFEngine {
    constructor() {
        this.engineName = 'BestPDFEngine';
        this.LoadDocument = (pathToPDFFile) => __awaiter(this, void 0, void 0, function* () {
            const documentTask = yield (0, pdfjs_dist_1.getDocument)(pathToPDFFile).promise;
            this.currentDocument = documentTask;
            return this.currentDocument;
        });
        this.CloseDocument = () => {
            var _a;
            (_a = this.currentDocument) === null || _a === void 0 ? void 0 : _a.destroy();
            delete this.currentDocument;
        };
        this.GetPageCount = () => {
            if (this.currentDocument === undefined) {
                throw new Error('No document open, please open a document before attempting this function');
            }
            return this.currentDocument.numPages;
        };
        this.GetPageSize = (pageNumber) => __awaiter(this, void 0, void 0, function* () {
            if (this.currentDocument === undefined) {
                throw new Error('No document open, please open a document before attempting this function');
            }
            const currentPage = yield this.currentDocument.getPage(pageNumber);
            const width = currentPage.getViewport().width;
            const height = currentPage.getViewport().height;
            return { width, height };
        });
        this.SaveAs = (fileName) => __awaiter(this, void 0, void 0, function* () {
            if (this.currentDocument === undefined) {
                throw new Error('No document open, please open a document before attempting this function');
            }
            const savedFile = yield this.currentDocument.saveDocument();
        });
        this.RenderPage = (pageNumber, ctx) => __awaiter(this, void 0, void 0, function* () {
            if (this.currentDocument === undefined) {
                throw new Error('No document open, please open a document before attempting this function');
            }
            const currentPage = yield this.currentDocument.getPage(pageNumber);
            yield currentPage.render({ canvasContext: ctx, viewport: currentPage.getViewport({ scale: 1.0 }) }).promise;
        });
        this.Search = (searchTerm) => __awaiter(this, void 0, void 0, function* () {
            console.log(`You are searching for ${searchTerm}`);
            return `${this.engineName} Search method is working`;
        });
        this.Annotate = (annotation) => __awaiter(this, void 0, void 0, function* () {
            console.log(`Added annotation ${annotation}`);
            return `${this.engineName} Annotate method is working`;
        });
        this.Encrypt = () => __awaiter(this, void 0, void 0, function* () {
            console.log('The file has been encrypted');
            return `${this.engineName} Annotate method is working`;
        });
        this.Decypt = () => __awaiter(this, void 0, void 0, function* () {
            console.log('The file has been decrypted');
            return `${this.engineName} Annotate method is working`;
        });
    }
}
exports.BestPDFEngine = BestPDFEngine;
