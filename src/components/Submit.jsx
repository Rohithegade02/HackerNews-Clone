import React, { useEffect, useState } from 'react';
import Header from './Header';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Submit = () => {
    const initialFormValues = {
        title: '',
        url: '',
        text: '',
    };

    const [formValues, setFormValues] = useState(initialFormValues);
    const [urlError, setUrlError] = useState('');
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const [submitData, setSubmitData] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValidUrl(formValues.url)) {
            setUrlError('Invalid URL');
        } else {
            setUrlError('');
            setSubmitData(formValues);
            setFormValues(initialFormValues); // Clear the form fields
        }
    };

    const isValidUrl = (url) => {
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([/\w\.-]*)*\/?$/;
        return urlPattern.test(url);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    useEffect(() => {

    }, []);

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit}>
                <div className='m-[10px] flex flex-col items-center gap-3'>
                    <div>
                        <TextField
                            name="title"
                            label="Title"
                            variant="outlined"
                            sx={{ width: '50vw' }}
                            value={formValues.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            name="url"
                            label="URL"
                            variant="outlined"
                            sx={{ width: '50vw' }}
                            value={formValues.url}
                            onChange={handleInputChange}
                            required
                            error={urlError !== ''}
                            helperText={urlError}
                        />
                    </div>
                    <div>
                        <TextField
                            name="text"
                            label="Text"
                            variant="outlined"
                            multiline
                            rows={4}
                            sx={{ width: '50vw' }}
                            value={formValues.text}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Button type="submit">
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
            <div>
                {submitData && (
                    <div>
                        <Paper sx={{ margin: '10px', padding: '10px' }}>
                            <div>
                                <Typography fontSize={'12px'}>
                                    1 point by {userData.email.split('@')[0]}
                                </Typography>
                            </div>
                            <div>
                                <Typography fontSize={'13px'}>{submitData.title}</Typography>
                            </div>
                            <div>
                                <Link style={{ fontSize: '15px', fontWeight: 600 }} to={submitData.url}>
                                    {submitData.text}
                                </Link>
                            </div>
                        </Paper>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Submit;
