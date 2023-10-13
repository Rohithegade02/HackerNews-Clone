import React, { useEffect, useState } from 'react'
import unixTimestampToMinutesAgo from '../TImestamp';
import { Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from './Header';

const JobNews = () => {
    const [newData, setNewData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const jobStoriesUrl = 'https://hacker-news.firebaseio.com/v0/jobstories.json';
    const newsItemUrl = 'https://hacker-news.firebaseio.com/v0/item/';

    const fetchData = async () => {
        try {
            const response = await fetch(jobStoriesUrl);
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
                        setIsLoading(false);
                        return await newsResponse.json();

                    } catch (error) {
                        console.error('Error fetching news item:', error);
                        return null;
                    }
                })
            );

            setNewData(newsDataArray.filter(item => item !== null));
        } catch (error) {
            console.error('Error fetching top stories:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Header />
            {
                isLoading ? (
                    <div className='flex justify-center items-center h-[90vh]'>
                        <Typography>Loading Data...</Typography>
                    </div>
                ) : (
                    <>
                        <Typography sx={{ marginLeft: '10px' }}>These are jobs at YC startups. See more at {''}
                            <Link hover='underline' to='https://www.ycombinator.com/jobs'>ycombinator.com/jobs.</Link>
                        </Typography>

                        <div>
                            {newData && newData.map((item, index) => (
                                <Paper key={index} elevation={5} sx={{ margin: '5px 20px', padding: '10px', borderRadius: "5px" }}>
                                    <div className='flex' key={index}>

                                        <div className='flex flex-col'>
                                            <div>
                                                <Link to={item.url}>
                                                    <Typography fontSize={'20px'} fontWeight={500}>{item.title}</Typography>
                                                </Link>
                                            </div>
                                            <div>
                                                <Typography sx={{ color: ' #8E9EB8' }} fontSize={'15px'} fontWeight={400}> {unixTimestampToMinutesAgo(item.time)} </Typography>
                                            </div>

                                        </div>
                                    </div>
                                </Paper>

                            ))}
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default JobNews