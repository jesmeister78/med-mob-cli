
export type MainBottomTabParamList = {
    Home: undefined;
    Details: undefined;
    Capture: { procedureId?: string };
    Procedure: { 
        //mode: ProcedureScreenMode,
        imageSource?: string,  
        procedureId?: string,
        isCreateNew?: boolean 
    };
};

export enum ProcedureScreenMode {
    ADD = 0,
    LIST = 1,
    EDIT = 2,
} 

