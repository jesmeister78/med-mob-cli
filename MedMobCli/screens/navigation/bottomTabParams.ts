
export type MainBottomTabParamList = {
    Home: undefined;
    Details: undefined;

    Capture: { 
        showCamera: boolean
        procedureId?: string 
    };

    ProcedureList: { 
        //mode: ProcedureScreenMode,
        imageId?: string,  
    };
    
    ProcedureDetails: { 
        //mode: ProcedureScreenMode,
        procedureId?: string,
    };
};

export enum ProcedureScreenMode {
    ADD = 0,
    LIST = 1,
    EDIT = 2,
} 

