import { useEffect, useState } from 'react';
import { 
    Container, Typography, Paper, Table, TableBody, 
    TableCell, TableContainer, TableHead, TableRow, Chip, 
    Button, Box 
} from '@mui/material';
import type { JobApplication } from '../types'; // <--- Note: "type" added here
import { getApplications, deleteApplication } from '../services/api';

export default function Dashboard() {
    const [applications, setApplications] = useState<JobApplication[]>([]);

    // Load data when the page opens
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

    const handleDelete = async (id: string) => {
        if(confirm("Are you sure you want to delete this application?")) {
            await deleteApplication(id);
            loadData(); // Refresh the list
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    Job Application Tracker
                </Typography>
                <Button variant="contained" color="primary">
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
                                    <Button color="error" onClick={() => handleDelete(app.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}