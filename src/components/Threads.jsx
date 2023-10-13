import { Paper, Typography } from '@mui/material'
import React from 'react'
import Header from './Header'

const Threads = () => {
  const userData = JSON.parse(sessionStorage.getItem('userData'))
  const comment = sessionStorage.getItem('CommentText')

  return (
    <div>
      <Header />
      <div>
        {
          comment ? (
            <Paper sx={{ margin: '10px', padding: '10px' }}>
              <div>
                <Typography fontSize={'12px'}>1 points by {userData.email.split('@')[0]} | parent </Typography>
              </div>
              <div className='ml-[15px] mt-[10px]'>
                <Typography fontSize={'15px'}>{comment}</Typography>
              </div>
            </Paper>
          ) : (
            <div sx={{ margin: '10px' }} >
              <Typography>No Threads Found</Typography>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Threads