import { Case } from "../../models/case.model";
import { ADD_CASE, DELETE_CASE, GET_CASES } from "../actions/caseActionTypes";

const initialstate = {
    cases: [],
};

type Action = {
    type: string,
    payload?: any
}

export default (state: any = initialstate, action: Action) => {
    switch (action.type) {
        case ADD_CASE:
            return { ...state, cases: [...state.cases, action.payload] };
        case DELETE_CASE:
            return {
                ...state,
                cases: state.cases.filter(
                    (c: Case) => c.id !== action.payload.id,
                ),
            };
        case GET_CASES:
            return { ...state, cases: action.payload };
        default:
            return state;
    }
};