import ClassMask from "../domain/classMask";
import { Procedure } from "../domain/procedure";
import { Image } from "../domain/image";

export const dummyProcessedImages: Image[] = [
    {
        id: '1', // uuidv4()
        procedureId: '1',
        imageTimestamp: new Date().toISOString(),
        rawImageSource: 'rawImage1',
        processedDate: '2023-12-01',
        processorVersion: '0.0.1', // version of the ai model used to generate the processed image

        masks: [
            { name: 'chd', code: 'CHD', show: true },
            { name: 'cbd', code: 'CBD', show: true, details: [{ label: 'Diameter (mm):', value: "5" }] },
            { name: 'rahd', code: 'RAHD', show: true },
            { name: 'lhd', code: 'LHD', show: true },
            { name: 'cysticDuct', code: 'CYSTIC_DUCT', show: true },
            { name: 'duodenum', code: 'DUODENUM', show: true },
            {
                name: 'fillingDefects',
                code: 'FILLING_DEFECTS',
                show: true,
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
        ] as ClassMask[],

        compositeImageSource: 'string',
        labelsImageSource: 'string'
    },

    {
        id: '1', // uuidv4()
        procedureId: '1',
        imageTimestamp: new Date().toISOString(),
        rawImageSource: 'rawImage2',
        processedDate: '2023-11-15',
        processorVersion: '0.0.1', // version of the ai model used to generate the processed image

        masks: [
            { name: 'chd', show: true },
            { name: 'cbd', show: false, details: [{ label: 'Diameter (mm):', value: "5" }] },
            { name: 'rahd', show: false },
            { name: 'lhd', show: true },
            { name: 'cysticDuct', show: false },
            { name: 'duodenum', show: true },
            { name: 'fillingDefects', show: true, details: [{ label: 'Number present:', value: "5" }, { label: 'Size (mm):', value: "3" }] }] as ClassMask[],

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

export const dummyAttributes: ClassMask[] = [
    { name: 'chd', code: 'CHD', show: true },
    { name: 'cbd', code: 'CBD', show: true, details: [{ label: 'Diameter (mm):', value: "5" }] },
    { name: 'rahd', code: 'RAHD', show: true },
    { name: 'lhd', code: 'LHD', show: true },
    { name: 'cysticDuct', code: 'CYSTIC_DUCT', show: true },
    { name: 'duodenum', code: 'DUODENUM', show: true },
    {
        name: 'fillingDefects',
        code: 'FILLING_DEFECTS',
        show: true,
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
] as ClassMask[]