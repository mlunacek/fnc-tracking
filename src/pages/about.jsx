import { Box, Typography, Link } from '@mui/material';
import PageHeader from "@/app/page-header";
import PageContainer from '@/app/page-container';


const AboutPage = () => {

    return (
        <PageContainer padding={2}>
            <PageHeader title="About" />

            <Typography>
                This application pulls data from the High Resolution Rapid Refresh (HRRR)
                and North American Model (NAM) weather models for analysis.
            </Typography>



        </PageContainer>
    )
};

export default AboutPage;