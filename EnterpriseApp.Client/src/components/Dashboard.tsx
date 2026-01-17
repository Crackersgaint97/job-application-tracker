import { useEffect, useState } from 'react';
import { 
    Container, Typography, Paper, Table, TableBody, 
    TableCell, TableContainer, TableHead, TableRow, Chip, 
    Button, Box, IconButton, useTheme, useMediaQuery
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import type { JobApplication, CreateJobApplicationDto } from '../types';
import { getApplications, createApplication, updateApplication, deleteApplication } from '../services/api';
import JobDialog from './JobDialog';
import Navbar from './Navbar';
import SummaryCards from './SummaryCards';

export default function Dashboard() {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<JobApplication | null>(null);
    
    // Responsive Hooks
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        setEditingJob(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (job: JobApplication) => {
        setEditingJob(job);
        setIsDialogOpen(true);
    };

    const handleSave = async (data: CreateJobApplicationDto) => {
        if (editingJob) {
            await updateApplication(editingJob.id, data);
        } else {
            await createApplication(data);
        }
        loadData();
    };

    const handleDelete = async (id: string) => {
        if(confirm("Are you sure?")) {
            await deleteApplication(id);
            loadData();
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 4 }}>
            <Navbar />
            
            {/* UPDATED: maxWidth={false} means "Use 100% width" */}
            <Container maxWidth={false} sx={{ mt: { xs: 2, md: 4 }, px: { xs: 2, md: 4 } }}>
                
                <SummaryCards applications={applications} />

                <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: 2 }} elevation={0}>
                    <Box 
                        display="flex" 
                        flexDirection={isMobile ? 'column' : 'row'} 
                        justifyContent="space-between" 
                        alignItems={isMobile ? 'flex-start' : 'center'} 
                        mb={3}
                        gap={2}
                    >
                        <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold" color="primary">
                            Recent Applications
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={handleAddNew}
                            fullWidth={isMobile}
                            sx={{ px: 3 }}
                        >
                            New Application
                        </Button>
                    </Box>

                    <TableContainer sx={{ overflowX: 'auto' }}>
                        <Table size={isMobile ? 'small' : 'medium'}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>COMPANY</TableCell>
                                    <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>ROLE</TableCell>
                                    <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>STATUS</TableCell>
                                    <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>LOCATION</TableCell>
                                    <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>ACTIONS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {applications.map((app) => (
                                    <TableRow key={app.id} hover>
                                        <TableCell sx={{ fontWeight: 500 }}>{app.companyName}</TableCell>
                                        <TableCell>{app.jobTitle}</TableCell>
                                        <TableCell>
                                            <Chip 
                                                label={app.status} 
                                                color={
                                                    app.status === 'Offer' ? 'success' : 
                                                    app.status.includes('Interview') ? 'warning' : 
                                                    app.status === 'Rejected' ? 'error' : 'default'
                                                }
                                                size="small" 
                                                variant="outlined"
                                                sx={{ fontWeight: 'bold' }}
                                            />
                                        </TableCell>
                                        <TableCell>{app.location || 'Remote'}</TableCell>
                                        <TableCell align="right">
                                            <Box display="flex" justifyContent="flex-end">
                                                <IconButton onClick={() => handleEdit(app)} size="small" sx={{ mr: 1 }}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleDelete(app.id)} size="small">
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                <JobDialog 
                    open={isDialogOpen} 
                    initialData={editingJob || undefined}
                    onClose={() => setIsDialogOpen(false)} 
                    onSubmit={handleSave} 
                />
            </Container>
        </Box>
    );
}