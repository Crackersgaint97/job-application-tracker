export type ApplicationStatus = 
    | 'Applied'
    | 'PhoneScreen'
    | 'TechnicalInterview'
    | 'ManagerInterview'
    | 'Offer'
    | 'Rejected'
    | 'Withdrawn';

export interface JobApplication {
    id: string;
    companyName: string;
    jobTitle: string;
    jobUrl?: string;
    location?: string;
    salaryRange?: number;
    status: ApplicationStatus;
    appliedAt: string;
}

export interface CreateJobApplicationDto {
    companyName: string;
    jobTitle: string;
    jobUrl?: string;
    location?: string;
    salaryRange?: number;
    status: ApplicationStatus;
}