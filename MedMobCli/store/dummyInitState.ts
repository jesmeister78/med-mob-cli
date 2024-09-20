import ImageAttribute from "../domain/imageAttribute";
import { Procedure } from "../domain/procedure";
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
            { name: 'chd', code: 'CHD', isPresent: true },
            { name: 'cbd', code: 'CBD', isPresent: true, details: [{ label: 'Diameter (mm):', value: "5" }] },
            { name: 'rahd', code: 'RAHD', isPresent: true },
            { name: 'lhd', code: 'LHD', isPresent: true },
            { name: 'cysticDuct', code: 'CYSTIC_DUCT', isPresent: true },
            { name: 'duodenum', code: 'DUODENUM', isPresent: true },
            {
                name: 'fillingDefects',
                code: 'FILLING_DEFECTS',
                isPresent: true,
                details: [
                    {
                        label: 'Number present:',
                        value: "5"
                    }, {
                        label: 'Size (mm):',
                        value: "3"
                    }
                ]
            }
        ] as ImageAttribute[],

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

export const dummyProcedures: Procedure[] = [
    {
        id: '1', // uuidv4()
        caseNumber: 1,
        patientName: 'Jesse Outh-Aut',
        urIdentifier: 'ur1',
        date: '2023-11-24',
        hospital: 'Epworth',
        surgeon: 'Dr Henry Badgery',
        surgeryType: 'laparoscopic cholecystectomy',

        /*
            Routine
            Suspected choledocholithiasis
            Deranged LFTs
            Pancreatitis
            Other (free text)
        */
        indication: 'Routine',
    },
    {
        id: '2', // uuidv4()
        caseNumber: 2,
        patientName: 'Belinda Davey',
        urIdentifier: 'ur2',
        date: '2023-11-25',
        hospital: 'Monash',
        surgeon: 'Dr Yuning Zhao',
        surgeryType: 'open cholecystectomy',

        /*
            Routine
            Suspected choledocholithiasis
            Deranged LFTs
            Pancreatitis
            Other (free text)
        */
        indication: 'Deranged LFTs',
    }
];

export const dummyAttributes: ImageAttribute[] = [
    { name: 'chd', code: 'CHD', isPresent: true },
    { name: 'cbd', code: 'CBD', isPresent: true, details: [{ label: 'Diameter (mm):', value: "5" }] },
    { name: 'rahd', code: 'RAHD', isPresent: true },
    { name: 'lhd', code: 'LHD', isPresent: true },
    { name: 'cysticDuct', code: 'CYSTIC_DUCT', isPresent: true },
    { name: 'duodenum', code: 'DUODENUM', isPresent: true },
    {
        name: 'fillingDefects',
        code: 'FILLING_DEFECTS',
        isPresent: true,
        details: [
            {
                label: 'Number present:',
                value: "5"
            }, {
                label: 'Size (mm):',
                value: "3"
            }
        ]
    }
] as ImageAttribute[]