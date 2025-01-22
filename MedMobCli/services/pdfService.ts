// PDFGenerator.ts
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { format } from 'date-fns';
import { Procedure } from '../domain/procedure';
import { procedurePdfStyles } from '../styles/procedurePdf';
import Config from 'react-native-config';
import { surgeryTypes } from '../domain/constants/surgeryTypes';
import { indications } from '../domain/constants/indications';

const getBase64Image = async (imageUri: string): Promise<string> => {
    try {
        imageUri = (Config.XRAI_API_HOST || '') + imageUri;
        console.log(`imageUri: ${imageUri}`);
        // Handle both file:// and http(s):// URIs
        if (imageUri.startsWith('file://')) {
            const base64Data = await RNFS.readFile(
                imageUri.replace('file://', ''),
                'base64',
            );
            return `data:image/jpeg;base64,${base64Data}`;
        } else if (imageUri.startsWith('http')) {
            // For remote images, first download them
            const tempFile = `${RNFS.TemporaryDirectoryPath}/${Date.now()}.jpg`;
            await RNFS.downloadFile({
                fromUrl: imageUri,
                toFile: tempFile,
            }).promise;
            const base64Data = await RNFS.readFile(tempFile, 'base64');
            // Clean up temp file
            await RNFS.unlink(tempFile);
            return `data:image/jpeg;base64,${base64Data}`;
        }
        throw new Error('Unsupported image URI format');
    } catch (error) {
        console.error('Error converting image to base64:', error);
        return ''; // Return empty string if conversion fails
    }
};

const getSurgeryTypeLabel = (value: string): string | undefined => {
    const surgeryType = surgeryTypes.find(type => type.value === value);
    return surgeryType?.label;
};

const getIndicationLabels = (values: string): string => {
    if (!values) return '';

    const valueArray = values.split(',').map(v => v.trim());

    const labels = valueArray
        .map(
            value =>
                indications.find(indication => indication.value === value)?.label,
        )
        .filter((label): label is string => label !== undefined); // Type guard to remove undefined values

    return labels.join(', ');
};

export const generatePDF = async (procedure: Procedure): Promise<string> => {
    // Convert all images to base64 first
    let imagesHtml = '';
    if (procedure.images && procedure.images.length > 0) {
        const base64Images = await Promise.all(
            procedure.images.map(image =>
                getBase64Image(image.compositeImageSource || image.rawImageSource),
            ),
        );

        imagesHtml = `
      <div class="section">
        <div class="section-title">Procedure Images</div>
        <div class="images-section">
          ${base64Images
                .map(base64 =>
                    base64
                        ? `
            <img src="${base64}" class="image" alt="Procedure Image"/>
          `
                        : '',
                )
                .join('')}
        </div>
      </div>
    `;
    } else {
        imagesHtml = `
      <div class="section">
        <div class="section-title">Procedure Images</div>
        <div class="images-section">
          <div class="no-images">No images available</div>
        </div>
      </div>
    `;
    }
    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Procedure Report</title>
        <style>${procedurePdfStyles}
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
            <div class="value">${format(
        new Date(procedure.date),
        'dd/MM/yyyy',
    )}</div>
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
            <div class="value">${getSurgeryTypeLabel(
        procedure.surgeryType,
    )}</div>
          </div>
          <div class="row">
            <div class="label">Hospital:</div>
            <div class="value">${procedure.hospital}</div>
          </div>
          <div class="row">
            <div class="label">Indications:</div>
            <div class="value">${getIndicationLabels(
        procedure.indication || '',
    )}</div>
          </div>
        </div>

        ${imagesHtml}
      </body>
    </html>
  `;

    try {
        const options = {
            html: htmlContent,
            fileName: `Procedure_${procedure.caseNumber}_${format(
                new Date(),
                'yyyyMMdd',
            )}`,
            directory: Platform.select({
                ios: 'Documents',
                android: RNFS.DownloadDirectoryPath,
            }),
            base64: false,
            height: 842, // A4 height in points
            width: 595, // A4 width in points
            padding: 0,
        };

        const file = await RNHTMLtoPDF.convert(options);

        // if there is no filePath on the file we will throw an exception
        return file.filePath!;
    } catch (error) {
        throw new Error(
            `Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'
            }`,
        );
    }
};
