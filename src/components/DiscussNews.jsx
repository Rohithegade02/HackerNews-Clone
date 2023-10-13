
import { Button, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import unixTimestampToMinutesAgo from '../TImestamp';
import Header from './Header';

const DiscussNews = () => {
    const location = useLocation()
    const comments = location.state.kids;
    const title = location.state.title
    const score = location.state.score
    const author = location.state.by
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const discussText = sessionStorage.getItem('discussText');
    const [newDiscussText, setDiscussText] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editedDiscussText, setEditedDiscussText] = useState('');

    const handleEditClick = () => {
        setEditMode(true);
        setEditedDiscussText(discussText);
    };

    const handleSaveEdit = () => {
        sessionStorage.setItem('discussText', editedDiscussText);
        setDiscussText(editedDiscussText);
        setEditMode(false);
        setEditedDiscussText('');
    };
    const handleDiscussSubmit = () => {
        sessionStorage.setItem('discussText', newDiscussText);
        setDiscussText('');
    };
    return (
        <div>
            <Header />
            <div className='m-[10px]'>
                <div className='flex flex-col'>
                    <div>
                        <Typography fontSize={'20px'} fontWeight={600}>
                            {title}
                        </Typography>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div>
                            <Typography fontSize={'15px'} fontWeight={500}>
                                {score} points by
                            </Typography>
                        </div>
                        <div className='mb-[3.5px]'>
                            <Link to={`/user/${author}`} state={{ userId: author }}>{author}</Link>
                        </div>
                    </div>
                </div>
                <div className='mt-[25px] flex flex-col items-center'>
                    <div>
                        <TextField
                            label="Add a comment"
                            variant="outlined"
                            sx={{ width: '70vw' }}
                            value={newDiscussText}
                            multiline
                            maxRows={10}
                            onChange={(e) => setDiscussText(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button onClick={handleDiscussSubmit}>
                            Submit Comment
                        </Button>
                    </div>
                    <div>
                        {editMode ? (
                            <div>
                                <TextField
                                    label="Edit comment"
                                    variant="outlined"
                                    sx={{ width: '70vw' }}
                                    value={editedDiscussText}
                                    multiline
                                    maxRows={10}
                                    onChange={(e) => setEditedDiscussText(e.target.value)}
                                />
                                <Button onClick={handleSaveEdit}>
                                    Save Comment
                                </Button>
                            </div>
                        ) : (
                            discussText ? (
                                <Paper sx={{ width: '70vw', margin: '10px', padding: '10px' }}>
                                    <div>
                                        <Typography fontSize={'12px'}>1 point by {userData.email.split('@')[0]}</Typography>
                                    </div>

                                    <div className='ml-[10px]'>
                                        <Typography fontSize={'15px'}>{discussText}</Typography>
                                    </div>
                                    <Button sx={{ color: ' #8E9EB8' }} onClick={handleEditClick}>
                                        Edit comment
                                    </Button>
                                </Paper>
                            ) : (
                                <Typography>No Discuss</Typography>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiscussNews