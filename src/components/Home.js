import home from '../img/home.svg';
import { Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = (props) => {
    return (
        <div className="formContainer1">
            <Stack alignItems="center">

                <img src={home} height="200px" alt="register image" />

                <Button component={Link}>
                    {/* <button type='submit' className="btn solid">Sign in</button> */}
                    <Link to="/signup">
                        <button className="btn solid">Go to Login</button>
                    </Link>
                </Button>
            </Stack>
        </div>

    );
};

export default Home;