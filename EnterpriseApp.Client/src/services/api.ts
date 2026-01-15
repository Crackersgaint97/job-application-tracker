import axios from 'axios';
import type { JobApplication, CreateJobApplicationDto } from '../types'; // Added 'type' here

// The URL of your .NET Backend
const API_URL = 'http://localhost:5296/api/JobApplications';

export const getApplications = async (): Promise<JobApplication[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createApplication = async (data: CreateJobApplicationDto): Promise<JobApplication> => {
    const response = await axios.post(API_URL, data);
    return response.data;
};

export const deleteApplication = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};