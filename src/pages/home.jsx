import { Box, Typography, Link } from '@mui/material';
import PageHeader from "@/app/page-header";
import PageContainer from '@/app/page-container';
import PageNavigation from '../app/page-navigation';

const HomePage = () => {

    return (
        <Box>
            <PageNavigation />

            <PageContainer padding={2}>
                <PageHeader title="Home" />

                <Typography>
                    Home page.  Is this working.
                </Typography>

            </PageContainer>
        </Box>
    )
};

export default HomePage;