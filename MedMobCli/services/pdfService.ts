// PDFGenerator.ts
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { format } from 'date-fns';
import { Procedure } from '../domain/procedure';
import {Image} from '../domain/image'


export const generatePDF = async (procedure: Procedure): Promise<string> => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Procedure Report</title>
        <style>
          body {
            font-family: 'Helvetica';
            padding: 20px;
            color: #333;
          }
          .header {
            font-size: 24px;
            text-align: center;
            margin-bottom: 30px;
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
          }
          .section {
            margin-bottom: 25px;
          }
          .section-title {
            font-size: 18px;
            color: #2980b9;
            margin-bottom: 15px;
            border-bottom: 1px solid #bdc3c7;
            padding-bottom: 5px;
          }
          .row {
            display: flex;
            margin-bottom: 10px;
            padding: 5px 0;
          }
          .label {
            width: 30%;
            font-weight: bold;
            color: #555;
          }
          .value {
            width: 70%;
          }
          .images-section {
            margin-top: 20px;
          }
          .image {
            max-width: 200px;
            margin: 10px;
          }
          @media print {
            body {
              font-size: 12px;
            }
            .header {
              font-size: 20px;
            }
            .section-title {
              font-size: 16px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">Procedure Report</div>
        
        <div class="section">
          <div class="section-title">Basic Information</div>
          <div class="row">
            <div class="label">Case Number:</div>
            <div class="value">${procedure.caseNumber}</div>
          </div>
          <div class="row">
            <div class="label">UR Identifier:</div>
            <div class="value">${procedure.urIdentifier}</div>
          </div>
          <div class="row">
            <div class="label">Patient Name:</div>
            <div class="value">${procedure.patientName}</div>
          </div>
          <div class="row">
            <div class="label">Date:</div>
            <div class="value">${format(new Date(procedure.date), 'dd/MM/yyyy')}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Procedure Details</div>
          <div class="row">
            <div class="label">Surgeon:</div>
            <div class="value">${procedure.surgeon}</div>
          </div>
          <div class="row">
            <div class="label">Surgery Type:</div>
            <div class="value">${procedure.surgeryType}</div>
          </div>
          <div class="row">
            <div class="label">Hospital:</div>
            <div class="value">${procedure.hospital}</div>
          </div>
          <div class="row">
            <div class="label">Indications:</div>
            <div class="value">${Array.isArray(procedure.indication) 
              ? procedure.indication.join(', ') 
              : procedure.indication}</div>
          </div>
        </div>

        ${procedure.images && procedure.images.length > 0 ? `
          <div class="section">
            <div class="section-title">Procedure Images</div>
            <div class="images-section">
              ${procedure.images.map(image => `
                <img src="${image.rawImageSource}" class="image" alt="Procedure Image"/>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </body>
    </html>
  `;

  try {
    const options = {
      html: htmlContent,
      fileName: `Procedure_${procedure.caseNumber}_${format(new Date(), 'yyyyMMdd')}`,
      directory: Platform.select({
        ios: 'Documents',
        android: RNFS.DownloadDirectoryPath
      }),
      base64: false,
    };

    const file = await RNHTMLtoPDF.convert(options);
    return file.filePath || "could not create pdf - file.filePath is undefined";
  } catch (error) {
    throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};