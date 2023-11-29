
export type MainBottomTabParamList = {
    Home: undefined;
    Details: undefined;
    Capture: undefined;
    Procedure: { imageSource?: string, mode: ProcedureScreenMode };
};

export enum ProcedureScreenMode {
    ADD = 0,
    LIST = 1
}

