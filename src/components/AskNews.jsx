import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import unixTimestampToMinutesAgo from '../TImestamp';
import { Button, IconButton, Pagination, Paper, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import Header from './Header';

const ITEMS_PER_PAGE = 30;

const AskNews = () => {
    const [newData, setNewData] = useState([]);
    const [votes, setVotes] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true)
    const askStoriesUrl = 'https://hacker-news.firebaseio.com/v0/askstories.json';
    const newsItemUrl = 'https://hacker-news.firebaseio.com/v0/item/';

    const fetchData = async () => {
        try {
            const response = await fetch(askStoriesUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            const newsDataArray = await Promise.all(
                data.map(async (d) => {
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

            setNewData(newsDataArray.filter(item => item !== null));
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching top stories:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleVote = (itemId) => {
        setVotes({ ...votes, [itemId]: true });
    };

    const handleFalseVote = (itemId) => {
        setVotes({ ...votes, [itemId]: false });
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = currentPage * ITEMS_PER_PAGE;
    const itemsToDisplay = newData.slice(startIndex, endIndex);

    return (
        <div>
            <Header />
            {
                isLoading ? (
                    <div className='flex justify-center items-center h-[90vh]'>
                        <Typography>Loading Data...</Typography>
                    </div>
                ) :
                    (
                        <>

                            <div className='m-[10px 0]'>
                                {itemsToDisplay.map((item, index) => (
                                    <Paper key={index} elevation={5} sx={{ margin: '5px 20px', padding: '10px', borderRadius: "5px" }}>
                                        <div className='flex items-center' key={index}>

                                            <div className='flex flex-col'>
                                                <div className='flex gap-1 items-center'>
                                                    <div>{startIndex + index + 1}.</div>
                                                    <div>
                                                        {
                                                            votes[item.id] ? (
                                                                <div><Button onClick={() => handleFalseVote(item.id)} >Unvote</Button></div>
                                                            ) : (
                                                                <IconButton onClick={() => handleVote(item.id)}>
                                                                    <Star />
                                                                </IconButton>
                                                            )
                                                        }
                                                    </div>
                                                    <div>
                                                        <Link to={item.url}>
                                                            <Typography fontSize={'20px'} fontWeight={500}>{item.title}</Typography>
                                                        </Link>
                                                    </div>

                                                </div>
                                                <div className='flex gap-3 items-center ml-[30px]'>
                                                    <div>
                                                        <Typography sx={{ color: ' #8E9EB8' }} fontSize={'15px'} fontWeight={400}>{item.score} points by</Typography>
                                                    </div>
                                                    <div className='mb-[2px]'>
                                                        <Link to={`/user/${item.by}`}
                                                            state={{ userId: item.by }} sx={{ color: ' #8E9EB8' }} >
                                                            {item.by} </Link>
                                                    </div>
                                                    <div>
                                                        <Typography sx={{ color: ' #8E9EB8' }} fontSize={'15px'} fontWeight={400}> {unixTimestampToMinutesAgo(item.time)} </Typography>
                                                    </div>
                                                    <div className='mb-[2px]'>
                                                        {Array.isArray(item.kids) ? (
                                                            <Link
                                                                to={`/comments/${item.id}`}
                                                                state={{ kids: item.kids, title: item.title, score: item.score, by: item.by }} // Pass 'item.kids' as state
                                                            >
                                                                {item.kids.length} Comment
                                                            </Link>
                                                        ) : (
                                                            <Link
                                                                to={`/discuss/${item.id}`}
                                                                state={{ kids: item.kids, title: item.title, score: item.score, by: item.by }} // Pass 'item.kids' as state
                                                            >
                                                                Discuss
                                                            </Link>
                                                        )}

                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </Paper>

                                ))}
                            </div>

                            <div className='mt-[25px] mb-[30px] flex justify-center'>
                                <Pagination
                                    count={Math.ceil(newData.length / ITEMS_PER_PAGE)}
                                    page={currentPage}
                                    onChange={(e, item) => setCurrentPage(item)}
                                    variant="outlined"
                                    size='large'
                                />
                            </div>
                        </>
                    )
            }
        </div>
    );
};

export default AskNews;
