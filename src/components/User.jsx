import { Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import unixTimestampToDate from '../TImestamp/ToDate';
import Header from './Header';



const User = () => {
    const location = useLocation();
    const userId = location.state.userId;
    const userApiUrl = `https://hacker-news.firebaseio.com/v0/user/${userId}.json`;
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(userApiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setUserData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userApiUrl]);

    return (
        <div>
            <Header />
            {
                !(loading) ? (
                    userData ? (
                        <Paper elevation={3} sx={{ margin: '15px 10px', padding: '10px' }}>
                            <div className='flex'>
                                <Typography color={'#000'}>
                                    User Name : <span style={{ color: '#CACAC6', fontSize: '15px', fontWeight: '600', textTransform: 'capitalize' }}>{userData.id}</span>
                                </Typography>
                            </div>
                            <div className='flex'>
                                <Typography color={'#000'}>
                                    Created : <span style={{ color: '#CACAC6', fontSize: '15px', fontWeight: '600', textTransform: 'capitalize' }}>{unixTimestampToDate(userData.created).formattedDate}</span>
                                </Typography>
                            </div>
                            <div className='flex'>
                                <Typography color={'#000'}>
                                    About : <div style={{ color: '#CACAC6', fontSize: '15px', fontWeight: '600', textTransform: 'capitalize' }} dangerouslySetInnerHTML={{ __html: userData.about }} />
                                </Typography>
                            </div>
                            <div className='flex'>
                                <Typography color={'#000'}>
                                    Karma : <span style={{ color: '#CACAC6', fontSize: '15px', fontWeight: '600', textTransform: 'capitalize' }}>{userData.karma}</span>
                                </Typography>
                            </div>
                        </Paper>
                    ) : (
                        <div>No User data</div>
                    )
                ) : (
                    <div>Loading...</div>
                )
            }

        </div>
    );
};

export default User;
