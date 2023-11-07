import { Case } from "../../models/case.model";
import {ADD_CASE, GET_CASES, UPDATE_CASE} from './caseActionTypes'

const createCase = (payload: Case) => ({
    type: ADD_CASE,
    payload,
});

const updateCase = (payload: Case) => ({
    type: UPDATE_CASE,
    payload,
});

const getCases = (payload: Case) => ({
    type: GET_CASES,
    payload,
});

export default {
    createCase,
    updateCase,
    getCases
};