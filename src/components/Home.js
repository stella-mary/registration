import register from '../img/register.png';
import { Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = (props) => {
    return (
        <>
            <Stack alignItems="center">
                <img src={register} height="200px" alt="register image" />
                Transport illustrations by Storyset
                <Button component={Link} to="students" variant="contained" size="large">
                    go to students dashboard
                </Button>
            </Stack>
        </>

    );
};

export default Home;