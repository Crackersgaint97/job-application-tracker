import { 
    Dialog, DialogTitle, DialogContent, DialogActions, 
    TextField, Button, MenuItem, Grid 
} from '@mui/material';
import { useState, useEffect } from 'react';
import type { CreateJobApplicationDto, ApplicationStatus } from '../types';

interface JobDialogProps {
    open: boolean;
    initialData?: CreateJobApplicationDto; // If present, we are editing
    onClose: () => void;
    onSubmit: (data: CreateJobApplicationDto) => Promise<void>;
}

const STATUS_OPTIONS: ApplicationStatus[] = [
    'Applied', 'PhoneScreen', 'TechnicalInterview', 
    'ManagerInterview', 'Offer', 'Rejected', 'Withdrawn'
];

export default function JobDialog({ open, initialData, onClose, onSubmit }: JobDialogProps) {
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState<CreateJobApplicationDto>({
        companyName: '',
        jobTitle: '',
        location: '',
        salaryRange: 0,
        status: 'Applied'
    });

    // Whenever the dialog opens or initialData changes, update the form
    useEffect(() => {
        if (initialData) {
            setFormData(initialData); // Edit Mode: Fill form with data
        } else {
            // Create Mode: Reset form
            setFormData({
                companyName: '',
                jobTitle: '',
                location: '',
                salaryRange: 0,
                status: 'Applied'
            });
        }
    }, [open, initialData]);

    const handleChange = (field: keyof CreateJobApplicationDto, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await onSubmit(formData);
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to save job");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{initialData ? 'Edit Job' : 'Add New Job'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <TextField 
                            label="Company Name" fullWidth required 
                            value={formData.companyName}
                            onChange={(e) => handleChange('companyName', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Job Title" fullWidth required 
                            value={formData.jobTitle}
                            onChange={(e) => handleChange('jobTitle', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            label="Location" fullWidth 
                            value={formData.location || ''}
                            onChange={(e) => handleChange('location', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            label="Status" select fullWidth
                            value={formData.status}
                            onChange={(e) => handleChange('status', e.target.value)}
                        >
                            {STATUS_OPTIONS.map(opt => (
                                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}