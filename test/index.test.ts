import { renderPDF } from '../src/index';

/**
 * Add additional unit tests here to ensure your code works properly for all use cases.
 * Feel free to adjust the structure of tests as suites your needs.
 * 
 * You do NOT need to test actually opening or manipulating a PDF document. Testing mock responses is perfect
 */
describe('renderPDF', () => {
  it('chooses SoSoPDFEngine if no features are required', async () => {
    const fileInfoByte = 0b000;
    const pathToPDFFile = './example.pdf';
    const pdfWrapper = await renderPDF(pathToPDFFile, fileInfoByte);
    expect(pdfWrapper.engineName).toEqual('SoSoPDFEngine');
  })

  it('chooses OkPDFEngine if the file requires search only', async () => {
    const fileInfoByte = 0b001;
    const pathToPDFFile = './example.pdf';
    const pdfWrapper = await renderPDF(pathToPDFFile, fileInfoByte);
    expect(pdfWrapper.engineName).toEqual('OkPDFEngine');
    expect(pdfWrapper.Search).toBeDefined()
    expect(pdfWrapper.Search && await pdfWrapper.Search('searchTerm'))
      .toBe('OkPDFEngine Search method is working')
  })

  it('chooses AlsoOkPDFEngine if the file requires encription only', async () => {
    const fileInfoByte = 0b010;
    const pathToPDFFile = './example.pdf';
    const pdfWrapper = await renderPDF(pathToPDFFile, fileInfoByte);
    expect(pdfWrapper.engineName).toEqual('AlsoOkPDFEngine');
    expect(pdfWrapper.Encrypt).toBeDefined()
    expect(pdfWrapper.Encrypt && await pdfWrapper.Encrypt())
      .toBe('AlsoOkPDFEngine Encrypt method is working')
  })

  it('chooses BetterPDFEngine if the file requires Annotation and Search or Annotation with no encription', async () => {
    const fileInfoByte = 0b101;
    const pathToPDFFile = './example.pdf';
    const pdfWrapper = await renderPDF(pathToPDFFile, fileInfoByte);
    expect(pdfWrapper.engineName).toEqual('BetterPDFEngine');
    expect(pdfWrapper.Search).toBeDefined()
    expect(pdfWrapper.Search && await pdfWrapper.Search('searchTerm'))
      .toBe('BetterPDFEngine Search method is working')
    expect(pdfWrapper.Annotate).toBeDefined()
    expect(pdfWrapper.Annotate && pdfWrapper.Annotate('annotation'))
      .toBe('BetterPDFEngine Annotate method is working')
  })

  it('chooses BestPDFEngine if the file requires Annotation, Encryption and Search', async () => {
    const fileInfoByte = 0b111;
    const pathToPDFFile = './example.pdf';
    const pdfWrapper = await renderPDF(pathToPDFFile, fileInfoByte);
    expect(pdfWrapper.engineName).toEqual('BestPDFEngine');
    expect(pdfWrapper.Encrypt).toBeDefined()
    expect(pdfWrapper.Encrypt && await pdfWrapper.Encrypt())
      .toBe('BestPDFEngine Encrypt method is working')
    expect(pdfWrapper.Search).toBeDefined()
    expect(pdfWrapper.Search && await pdfWrapper.Search('searchTerm'))
      .toBe('BestPDFEngine Search method is working')
    expect(pdfWrapper.Annotate).toBeDefined()
    expect(pdfWrapper.Annotate && pdfWrapper.Annotate('annotation'))
      .toBe('BestPDFEngine Annotate method is working')
  });
});