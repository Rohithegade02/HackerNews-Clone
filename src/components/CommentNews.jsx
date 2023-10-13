import { Button, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import unixTimestampToMinutesAgo from '../TImestamp';
import Header from './Header';

function CommentNews() {

    const location = useLocation()
    const comments = location.state.kids;
    const title = location.state.title
    const score = location.state.score
    const author = location.state.by
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const [loading, setLoading] = useState(true);
    const [commentData, setCommentData] = useState([])
    const [newCommentText, setNewCommentText] = useState('');
    const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
    const newsItemUrl = 'https://hacker-news.firebaseio.com/v0/item/';

    useEffect(() => {
        const storedCommentText = sessionStorage.getItem('CommentText');
        if (storedCommentText) {
            setNewCommentText(storedCommentText);
        }
    }, []);
    const fetchData = async () => {
        try {


            const newsDataArray = await Promise.all(
                comments.map(async (d) => {
                    try {
                        const newsResponse = await fetch(`${newsItemUrl}${d}.json`);
                        if (!newsResponse.ok) {
                            throw new Error(`HTTP error! Status: ${newsResponse.status}`);
                        }
                        return await newsResponse.json();
                    } catch (error) {
                        console.error('Error fetching news item:', error);
                        return null;
                    }
                })
            );

            setCommentData(newsDataArray.filter(item => item !== null));
            setLoading(false)
        } catch (error) {
            console.error('Error fetching top stories:', error);
        }
    };
    const handleCommentSubmit = () => {
        const newComment = {
            by: userData && userData.email ? userData.email.split('@')[0] : 'Unknown user'
            ,
            text: newCommentText,
            time: Math.floor(Date.now() / 1000)
        };
        setCommentData([...commentData, newComment]);
        sessionStorage.setItem('CommentText', newCommentText);
        setNewCommentText('');
    };
    useEffect(() => {
        fetchData();
    }, [])
    useEffect(() => {
        sessionStorage.setItem('commentData', JSON.stringify(commentData));


    }, [commentData]);

    const handleDeleteComment = (index) => {
        const updatedComments = [...commentData];
        updatedComments.splice(index, 1);
        setCommentData(updatedComments);
    };

    useEffect(() => {
        const storedCommentData = sessionStorage.getItem('commentData');
        if (storedCommentData) {
            setCommentData(JSON.parse(storedCommentData));
        }
    }, []);
    return (
        <div className=''>
            <div>
                <Header />
            </div>
            {
                loading ? (
                    <div className='flex justify-center items-center h-[90vh]'>
                        <Typography>Loading Data....</Typography>
                    </div>
                ) : (
                    <div>
                        <div className='flex m-[10px] flex-col'>
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
                                    sx={{ width: '90vw' }}
                                    value={newCommentText}
                                    multiline
                                    maxRows={10}
                                    onChange={(e) => setNewCommentText(e.target.value)}
                                />
                            </div>
                            <div>
                                <Button onClick={handleCommentSubmit}>
                                    Submit Comment
                                </Button>
                            </div>
                        </div>
                        {commentData.length === 0 ? (
                            <div>
                                {/* Show a message or component when commentData is empty */}
                                <Typography>No comments available.</Typography>
                            </div>
                        ) : (
                            commentData.map((data, index) => (
                                <Paper key={index} elevation={2} sx={{ padding: '5px 10px', margin: '10px' }}>
                                    <div className='flex flex-col m-[10px]' key={index}>
                                        <div className='flex gap-1 items-center'>
                                            <div className='flex gap-1 items-center'>
                                                <div className='mb-[1px]'>

                                                    <Link to={`/user/${data.by}`}
                                                        state={{ userId: data.by }} sx={{ color: ' #8E9EB8', cursor: 'pointer' }} >
                                                        {data.by}
                                                    </Link>
                                                </div>
                                                <div>   <Typography sx={{ fontSize: '13px', color: '#8E9EB8' }} >
                                                    {unixTimestampToMinutesAgo(data.time)} |
                                                </Typography></div>
                                            </div>
                                            <div>
                                                <Button sx={{ color: ' #8E9EB8' }} >Prev</Button>
                                            </div>
                                            {index < commentData.length - 1 && (
                                                <div>
                                                    <Button sx={{ color: ' #8E9EB8' }} onClick={() => { setCurrentCommentIndex(index + 1) }}>Next</Button>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div className='ml-[15px]'>

                                                <div style={{ fontSize: '15px' }} dangerouslySetInnerHTML={{ __html: data.text }} />

                                            </div>
                                        </div>
                                    </div>
                                </Paper>
                            ))
                        )}
                    </div>
                )
            }
        </div>
    );
}

export default CommentNews;
