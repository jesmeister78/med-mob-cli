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
    let imagesHtml = '';
    if (procedure.images && procedure.images.length > 0) {
        // Prepare an array to collect all base64 image promises
        const imagePromises: Promise<{ base64: string, label: string }>[] = [];

        // For each image, add both raw and composite to our promises array (when they exist)
        procedure.images.forEach(image => {
            if (image.compositeImageSource) {
                imagePromises.push(
                    getBase64Image(image.compositeImageSource).then(base64 => ({
                        base64,
                        label: 'Composite Image'
                    }))
                );
            }

            if (image.rawImageSource) {
                imagePromises.push(
                    getBase64Image(image.rawImageSource).then(base64 => ({
                        base64,
                        label: 'Raw Image'
                    }))
                );
            }
        });

        // Resolve all promises
        const allImages = await Promise.all(imagePromises);

        // Filter out any failures (empty strings)
        const validImages = allImages.filter(img => img.base64);

        if (validImages.length > 0) {
            imagesHtml = `
        <div class="section">
            <div class="section-title">Procedure Images</div>
            <div class="images-section">
                ${validImages.map(img => `
                    <div class="image-container">
                        <div class="image-label">${img.label}</div>
                        <img src="${img.base64}" class="image" alt="Procedure Image"/>
                    </div>
                `).join('')}
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
