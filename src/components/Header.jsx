import { Feed } from '@mui/icons-material'
import { Button, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const userData = sessionStorage.getItem('userData')
    const handleLogout = () => {
        sessionStorage.removeItem("userData");
        sessionStorage.removeItem('commentData');
        sessionStorage.removeItem('CommentText');
        sessionStorage.removeItem('discussText');
        sessionStorage.removeItem('formData')
        navigate("/");
    }
    return (
        <div className=' m-[10px] rounded-lg w-[98vw] color-[#000] h-[10vh] bg-[#FF6600] p-[10px]'>
            <div className=' mt-[3px] flex items-center justify-between '>
                <div className='flex items-center gap-1'>
                    <div >
                        <IconButton >
                            <Feed />
                        </IconButton>
                    </div>
                    <div>
                        <Typography onClick={() => navigate('/')} sx={{ cursor: 'pointer' }} fontSize={'22px'} fontFamily={' Roboto, sans-serif'} fontWeight={700}>Hacker News</Typography>
                    </div>
                </div>
                <div className='flex gap-11 items-center'>
                    <div>
                        <Button sx={{
                            color: location.pathname === '/newest' ? 'black' : '#fff', fontWeight: 600, fontFamily: 'Roboto', '&:hover': {
                                backgroundColor: 'none'
                            }
                        }} onClick={() => navigate('/newest')}>New </Button>
                    </div>
                    <div>
                        <Button sx={{ color: location.pathname === '/past' ? 'black' : '#fff', fontWeight: 600 }} onClick={() => navigate('/past')}>Past </Button>
                    </div>
                    <div>
                        <Button sx={{ color: location.pathname === '/ask' ? 'black' : '#fff', fontWeight: 600 }} onClick={() => navigate('/ask')}>Ask </Button>
                    </div>
                    <div>
                        <Button sx={{ color: location.pathname === '/show' ? 'black' : '#fff', fontWeight: 600 }} onClick={() => navigate('/show')}>Show </Button>
                    </div>
                    <div>
                        <Button sx={{ color: location.pathname === '/jobs' ? 'black' : '#fff', fontWeight: 600 }} onClick={() => navigate('/jobs')}>Job </Button>
                    </div>
                    {userData &&
                        <div>
                            <Button sx={{ color: location.pathname === '/threads' ? 'black' : '#fff', fontWeight: 600 }} onClick={() => navigate('/threads')}>Threads</Button>
                        </div>}
                    {userData &&
                        <div>
                            <Button sx={{ color: location.pathname === '/submit' ? 'black' : '#fff', fontWeight: 600 }} onClick={() => navigate('/submit')}>Submit</Button>
                        </div>}

                </div>
                <div className='flex ' >
                    {
                        userData ? (
                            <Button sx={{ color: '#fff', fontWeight: 600 }} onClick={handleLogout}>Logout</Button>

                        ) : (
                            <Button sx={{ color: '#fff', fontWeight: 600 }} onClick={() => navigate('/login')}>Login</Button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Header