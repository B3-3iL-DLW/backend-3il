// src/app/login/services/timetableService.ts

import {apiRequest} from '../../api/apiService';


export class InvalidTimeTableError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'InvalidTimeTableError';
    }
}

export async function getTimeTable(className: string) {
    try {
        return await apiRequest(`timetable/${className}`, 'GET');
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            throw new InvalidTimeTableError('Invalid TimeTable');
        } else {
            throw new Error('Failed to get TimeTable');
        }
    }
}