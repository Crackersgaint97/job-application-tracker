import { Grid, Paper, Typography } from '@mui/material';
import type { JobApplication } from '../types';

interface SummaryCardsProps {
    applications: JobApplication[];
}

export default function SummaryCards({ applications }: SummaryCardsProps) {
    const total = applications.length;
    const interviews = applications.filter(a => 
        a.status.includes('Interview') || a.status === 'PhoneScreen'
    ).length;
    const offers = applications.filter(a => a.status === 'Offer').length;

    return (
        <Grid container spacing={3} mb={4}>
            {/* Card 1: Total */}
            <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="subtitle2" color="textSecondary">Total Applications</Typography>
                    <Typography variant="h3" color="primary" fontWeight="bold">{total}</Typography>
                </Paper>
            </Grid>

            {/* Card 2: Interviews */}
            <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 3, height: '100%', borderLeft: '6px solid orange', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="subtitle2" color="textSecondary">Interviews Pending</Typography>
                    <Typography variant="h3" fontWeight="bold">{interviews}</Typography>
                </Paper>
            </Grid>

            {/* Card 3: Offers */}
            <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 3, height: '100%', borderLeft: '6px solid #4caf50', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="subtitle2" color="textSecondary">Offers Received</Typography>
                    <Typography variant="h3" color="success.main" fontWeight="bold">{offers}</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}