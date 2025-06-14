import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Alert, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { format } from 'date-fns';
import { Procedure } from '../domain/procedure';
import { procedurePdfStyles } from '../styles/procedurePdf';
import Config from 'react-native-config';
import { surgeryTypes } from '../domain/constants/surgeryTypes';
import { indications } from '../domain/constants/indications';
import { Image } from '../domain/image';

export const pdfService = (() => {
    // This service is responsible for generating PDF reports for procedures
    // It uses react-native-html-to-pdf to convert HTML content into a PDF file

    const getBase64Image = async (imageUri: string): Promise<string> => {
        try {
            imageUri = (Config.XRAI_API_HOST || '') + imageUri;
            console.log(`Attempting to load image: ${imageUri}`);

            if (imageUri.startsWith('file://')) {
                const filePath = imageUri.replace('file://', '');
                const exists = await RNFS.exists(filePath);
                console.log(`File exists: ${exists} at path: ${filePath}`);

                if (!exists) {
                    throw new Error(`File does not exist: ${filePath}`);
                }

                const base64Data = await RNFS.readFile(filePath, 'base64');
                return `data:image/jpeg;base64,${base64Data}`;
            } else if (imageUri.startsWith('http')) {
                const tempFile = `${RNFS.TemporaryDirectoryPath}/${Date.now()}.png`;
                console.log(`Downloading ${imageUri} to ${tempFile}`);

                const downloadResult = await RNFS.downloadFile({
                    fromUrl: imageUri,
                    toFile: tempFile,
                }).promise;

                console.log(`Download result:`, downloadResult);

                if (downloadResult.statusCode !== 200) {
                    throw new Error(`Failed to download image: ${downloadResult.statusCode}`);
                }
                const base64Data = await RNFS.readFile(tempFile, 'base64');
                console.log(`Image downloaded and read as base64 successfully.`);
                return `data:image/jpeg;base64,${base64Data}`;
            }
            throw new Error('Unsupported image URI format');
        } catch (error) {
            console.error('Error converting image to base64:', error);
            // Instead of returning empty string, throw the error so you can see what's wrong
            throw error;
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

    return {
        generatePDF: async (procedure: Procedure, images: Image[]): Promise<string> => {
            let imagesHtml = '';
            // debug: pretty print the procedure object
            console.log('Procedure object:', JSON.stringify(procedure, null, 2));
            
            if (images && images.length > 0) {
                // debug: pretty print each image source
                console.log('images:', JSON.stringify(images, null, 2));

                // Process each image individually to maintain pairing
                const imageRows: string[] = [];
                let totalValidImages = 0;

                for (const image of images) {
                    let rawImageBase64 = '';
                    let compositeImageBase64 = '';

                    // Load raw image if it exists
                    if (image.rawImageSource) {
                        try {
                            rawImageBase64 = await getBase64Image(image.rawImageSource);
                            if (rawImageBase64) totalValidImages++;
                        } catch (error) {
                            console.error('Failed to load raw image:', error);
                        }
                    }

                    // Load composite image if it exists
                    if (image.compositeImageSource) {
                        try {
                            compositeImageBase64 = await getBase64Image(image.compositeImageSource);
                            if (compositeImageBase64) totalValidImages++;
                        } catch (error) {
                            console.error('Failed to load composite image:', error);
                        }
                    }

                    // Create row HTML only if at least one image loaded successfully
                    if (rawImageBase64 || compositeImageBase64) {
                        const rowHtml = `
                            <div class="image-row">
                                <div class="image-pair">
                                    <div class="image-container left">
                                        ${rawImageBase64 ? `
                                            <div class="image-label">Raw Image</div>
                                            <img src="${rawImageBase64}" class="image" alt="Raw Image"/>
                                        ` : `
                                            <div class="image-label">Raw Image</div>
                                            <div class="no-image">No raw image available</div>
                                        `}
                                    </div>
                                    <div class="image-container right">
                                        ${compositeImageBase64 ? `
                                            <div class="image-label">Composite Image</div>
                                            <img src="${compositeImageBase64}" class="image" alt="Composite Image"/>
                                        ` : `
                                            <div class="image-label">Composite Image</div>
                                            <div class="no-image">No composite image available</div>
                                        `}
                                    </div>
                                </div>
                            </div>
                        `;
                        imageRows.push(rowHtml);
                    }
                }

                if (imageRows.length > 0) {
                    imagesHtml = `
                        <div class="section">
                            <div class="section-title">Procedure Images</div>
                            <div class="section-title">Number of Images: ${totalValidImages}</div>
                            <div class="images-section">
                                ${imageRows.join('')}
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
                    <style>
                        ${procedurePdfStyles}
                        
                        /* Additional styles for side-by-side layout */
                        .image-row {
                            margin-bottom: 20px;
                            page-break-inside: avoid;
                        }
                        
                        .image-pair {
                            display: flex;
                            justify-content: space-between;
                            align-items: flex-start;
                            gap: 20px;
                        }
                        
                        .image-container.left,
                        .image-container.right {
                            flex: 1;
                            text-align: center;
                        }
                        
                        .image-container .image {
                            max-width: 100%;
                            height: auto;
                            border: 1px solid #ddd;
                            border-radius: 4px;
                        }
                        
                        .image-container .image-label {
                            font-weight: bold;
                            margin-bottom: 8px;
                            color: #333;
                        }
                        
                        .no-image {
                            padding: 40px;
                            background-color: #f5f5f5;
                            border: 1px dashed #ccc;
                            color: #666;
                            font-style: italic;
                            border-radius: 4px;
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
        }
    };
})();