import ImageAttribute from "../domain/imageAttribute";
import { ProcessedImage } from "../domain/processedImage";

export const dummyProcessedImages: ProcessedImage[] = [
    {
        id: '1', // uuidv4()
        procedureId: '1',
        imageTimestamp: 12345,
        rawImageSource: 'rawImage1',
        processedDate: '2023-12-01',
        processorVersion: '0.0.1', // version of the ai model used to generate the processed image

        attributes: [
            { name: 'chd', isPresent: true },
            { name: 'cbd', isPresent: true, details: [{ label: 'Diameter (mm):', value: "5" }] },
            { name: 'rahd', isPresent: true },
            { name: 'lhd', isPresent: true },
            { name: 'cysticDuct', isPresent: true },
            { name: 'duodenum', isPresent: true },
            { name: 'fillingDefects', isPresent: true, details: [{ label: 'Number present:', value: "5" }, { label: 'Size (mm):', value: "3" }] }] as ImageAttribute[],

        compositeImageSource: 'string',
        labelsImageSource: 'string'
    },

    {
        id: '1', // uuidv4()
        procedureId: '1',
        imageTimestamp: 12345,
        rawImageSource: 'rawImage2',
        processedDate: '2023-11-15',
        processorVersion: '0.0.1', // version of the ai model used to generate the processed image

        attributes: [
            { name: 'chd', isPresent: true },
            { name: 'cbd', isPresent: false, details: [{ label: 'Diameter (mm):', value: "5" }] },
            { name: 'rahd', isPresent: false },
            { name: 'lhd', isPresent: true },
            { name: 'cysticDuct', isPresent: false },
            { name: 'duodenum', isPresent: true },
            { name: 'fillingDefects', isPresent: true, details: [{ label: 'Number present:', value: "5" }, { label: 'Size (mm):', value: "3" }] }] as ImageAttribute[],

        compositeImageSource: 'string',
        labelsImageSource: 'string'
    }
];