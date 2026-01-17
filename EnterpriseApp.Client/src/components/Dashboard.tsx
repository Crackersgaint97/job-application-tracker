import { useEffect, useState } from 'react';
import { 
    Container, Typography, Paper, Table, TableBody, 
    TableCell, TableContainer, TableHead, TableRow, Chip, 
    Button, Box, IconButton 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { JobApplication, CreateJobApplicationDto } from '../types';
import { getApplications, createApplication, updateApplication, deleteApplication } from '../services/api';
import JobDialog from './JobDialog';

export default function Dashboard() {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    // Track which job is being edited (null = creating new)
    const [editingJob, setEditingJob] = useState<JobApplication | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await getApplications();
            setApplications(data);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    const handleAddNew = () => {
        setEditingJob(null); // Clear editing state
        setIsDialogOpen(true);
    };

    const handleEdit = (job: JobApplication) => {
        setEditingJob(job); // Set the job to be edited
        setIsDialogOpen(true);
    };

    const handleSave = async (data: CreateJobApplicationDto) => {
        if (editingJob) {
            // Update existing
            await updateApplication(editingJob.id, data);
        } else {
            // Create new
            await createApplication(data);
        }
        loadData(); // Refresh table
    };

    const handleDelete = async (id: string) => {
        if(confirm("Are you sure?")) {
            await deleteApplication(id);
            loadData();
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    Job Application Tracker
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleAddNew}
                >
                    + New Application
                </Button>
            </Box>

            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell><strong>Company</strong></TableCell>
                            <TableCell><strong>Role</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Location</strong></TableCell>
                            <TableCell align="right"><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applications.map((app) => (
                            <TableRow key={app.id}>
                                <TableCell>{app.companyName}</TableCell>
                                <TableCell>{app.jobTitle}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={app.status} 
                                        color={app.status === 'Offer' ? 'success' : 'default'} 
                                        size="small" 
                                    />
                                </TableCell>
                                <TableCell>{app.location || 'Remote'}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => handleEdit(app)} size="small">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(app.id)} size="small">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <JobDialog 
                open={isDialogOpen} 
                initialData={editingJob || undefined}
                onClose={() => setIsDialogOpen(false)} 
                onSubmit={handleSave} 
            />
        </Container>
    );
}