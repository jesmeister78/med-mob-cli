import { AuthMode } from "../../domain/constants/authMode";

export type RootStackParamList = {
    Main: undefined;
    Auth: { mode: AuthMode } | undefined;
    ProcessedImage: { imageId: string, mode: string };
    ProcedureDetails: { procedureId: string };
};