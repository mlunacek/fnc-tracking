import { Box, Typography, Link } from '@mui/material';
import PageHeader from "@/app/page-header";
import PageContainer from '@/app/page-container';

const HomePage = () => {

    return (
        <PageContainer padding={2}>
            <PageHeader title="Home" />

            <Typography>
                Home page
            </Typography>



        </PageContainer>
    )
};

export default HomePage;