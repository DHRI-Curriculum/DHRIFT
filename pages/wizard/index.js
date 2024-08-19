import Header from '../../components/Header';
import { useEffect, useState, useCallback } from "react";
import { debounce } from 'lodash';
import { FormControl, InputLabel } from '@mui/material';
import { Stack, TextField, Button, Container, MenuItem } from '@mui/material';
import useAllWorkshops from '../../components/Hooks/UseAllWorkshops';
import { Add, Remove } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid  from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';


export default function Form(props) {
    const [instCreated, setInstCreated] = useState(false);
    const [authComplete, setAuthComplete] = useState(false);
    const [instUrl, setInstUrl] = useState('');
    const [instName, setInstName] = useState('');
    const [firstStage, setFirstStage] = useState(true);
    const [secondStage, setSecondStage] = useState(false);
    const [formError, setFormError] = useState(false);
    const router = useRouter();

    const validationSchema = Yup.object({
        organizers: Yup.array().of(
            Yup.object({
                name: Yup.string().required('Name is required'),
                email: Yup.string().email('Invalid email').required('Email is required')
            })
        ),
        institution: Yup.string().required('Institution is required'),
        event: Yup.string().required('Event is required'),
        description: Yup.string().required('Description is required'),
        herodescription: Yup.string(),
        venue: Yup.string(),
        location: Yup.string(),
        dateStart: Yup.date().required('Start date is required'),
        endDate: Yup.date().required('End date is required'),
        workshopsuser: Yup.string(),
        workshopsrepo: Yup.string(),
        format: Yup.string().required('Format is required'),
        sponsors: Yup.array().of(
            Yup.object({
                name: Yup.string().required('Name is required'),
                link: Yup.string().url('Invalid URL')
            })
        ),
        contact: Yup.array().of(
            Yup.object({
                name: Yup.string().required('Name is required'),
                email: Yup.string().email('Invalid email').required('Email is required')
            })
        ),
        sessions: Yup.array().of(
            Yup.object({
                date: Yup.date().required('Date is required'),
                time: Yup.string().required('Time is required'),
                endTime: Yup.string(),
                title: Yup.string().required('Title is required'),
                description: Yup.string(),
                workshop: Yup.string(),
                location: Yup.string(),
                instructors: Yup.array().of(
                    Yup.object({
                        name: Yup.string().required('Name is required'),
                        email: Yup.string().email('Invalid email').required('Email is required')
                    })
                ),
                helpers: Yup.array().of(
                    Yup.object({
                        name: Yup.string().required('Name is required'),
                        email: Yup.string().email('Invalid email').required('Email is required')
                    })
                )
            })
        ),
        registerLink: Yup.string().url('Invalid URL'),
        registerText: Yup.string(),
        haveRegistration: Yup.boolean(),
        cloneWorkshops: Yup.boolean(),
        showWorkshops: Yup.boolean(),
        longdescription: Yup.string(),
        socialMedia: Yup.string(),
        socialmedialink: Yup.string().url('Invalid URL')
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            organizers: [{ name: '', email: '' }],
            institution: '',
            event: '',
            description: '',
            herodescription: '',
            venue: '',
            location: '',
            dateStart: '',
            endDate: '',
            workshopsuser: 'dhri-curriculum',
            workshopsrepo: 'workshops',
            format: '',
            sponsors: [{ name: '', link: '' }],
            contact: [{ name: '', email: '' }],
            sessions: [
                {
                    date: '',
                    time: '',
                    title: '',
                    description: '',
                    workshop: '',
                    location: '',
                    instructors: [{ name: '', email: '' }],
                    helpers: [{ name: '', email: '' }]
                }
            ],
            registerLink: '',
            registerText: '',
            haveRegistration: false,
            cloneWorkshops: false,
            showWorkshops: false,
            longdescription: '',
            socialMedia: '',
            socialmedialink: ''
        },
        onSubmit: (values) => {
            setFormError(false);
            setShowProgress(true);
            if (!localStorage.getItem('githubToken')) {
                permRequest();
            } else {
                checkAuth();
            }
        }
    });

    useEffect(() => {
        const useDummyData = router.query.useDummyData === 'true';
        if (useDummyData) {
            console.log('Using dummy data');
            const dummyData = {
                organizers: [{ name: 'John Doe', email: 'john.doe@example.com' }],
                institution: 'Example Institute',
                event: 'Example Event',
                description: 'This is a description of the example event.',
                herodescription: 'An example event for testing.',
                venue: 'Example Venue',
                location: 'Example Location',
                dateStart: '2024-09-01',
                endDate: '2024-09-05',
                workshopsuser: 'dhri-curriculum',
                workshopsrepo: 'workshops',
                format: 'online',
                sponsors: [{ name: 'Example Sponsor', link: 'https://example.com' }],
                contact: [{ name: 'Jane Doe', email: 'jane.doe@example.com' }],
                sessions: [
                    {
                        date: '2024-09-01',
                        time: '10:00',
                        title: 'Example Session',
                        description: 'This is a description of the example session.',
                        workshop: 'Example Workshop',
                        location: 'Example Location',
                        instructors: [{ name: 'Instructor One', email: 'instructor.one@example.com' }],
                        helpers: [{ name: 'Helper One', email: 'helper.one@example.com' }]
                    },
                ],
                registerLink: 'https://example.com/register',
                registerText: 'Register Now',
                haveRegistration: true,
                cloneWorkshops: true,
                showWorkshops: true,
                longdescription: 'This is a long description for the example event.',
                socialMedia: 'Example Social Media',
                socialmedialink: 'https://example.com/social'
            };
            formik.setValues(dummyData);
        }
    }, [router.query]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [showProgress, setShowProgress] = useState(false);



    const realAPIURL = 'https://run-dhrift-d5tkoh5ciq-uc.a.run.app/';
    const localAPIURL = 'http://localhost:8080/';
    const APIURL = realAPIURL;

    const { workshops } = useAllWorkshops({ gitUser: 'dhri-curriculum', gitRepo: 'workshops', instUser: 'dhri-curriculum', instRepo: 'workshops' });

    const displayWorkshops = 
        workshops.filter(workshop => workshop.type === 'file' && !workshop.name.startsWith('DHRIFT_') && !workshop.name.startsWith('README.md'))
            .map(workshop => ({ name: workshop.name.replace('.md', '') }))
            .sort((a, b) => a.name.localeCompare(b.name));



    const uploadFiles = async (files) => {
        const addAPIURL = APIURL + 'add_file';
        files.forEach(file => {
            // serialize file data 
            if (file.type.includes('image')) {
                const reader = new FileReader();
                reader.readAsDataURL(file.data);
                reader.onloadend = function () {
                    const base64data = reader.result;
                    const data = {
                        name: file.name + '.' + file.extension,
                        data: base64data,
                        encoding: 'base64',
                        type: file.type,
                        extension: file.extension
                    };

                    fetch(APIURL + 'add_image', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ token: localStorage.getItem('githubToken'), data: data })
                    });
                }
            }
            else {
                fetch(addAPIURL, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token: localStorage.getItem('githubToken'), file: file })
                });
            }
        });
    }

    useEffect(() => {
        function handle_auth_complete(event) {
            const data = JSON.parse(event.data);
            if (data.auth === 'complete') {
                console.log(localStorage.getItem('githubToken'));
                checkAuth();
            }
            else {
                setShowProgress(false);
            }
        }
        const bc = new BroadcastChannel('auth');
        bc.onmessage = handle_auth_complete;
        return () => {
            bc.close();
        }
    }
        , []);

    useEffect(() => {
        if (localStorage.getItem('githubTokenExpiry') < new Date().getTime()) {
            localStorage.removeItem('githubToken');
            localStorage.removeItem('githubTokenExpiry');
        }
    }, []);

    const checkAuth = async () => {
        const cookieAPIURL = APIURL + 'session_test';
        const response = await fetch(cookieAPIURL, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: localStorage.getItem('githubToken') })
        }).then(function (response) {
            return response.text();
        }).then(function (data) {
            if (data === 'Authenticated') {
                setAuthComplete(true);
                createInstitute();
            }
            else {
                permRequest();
            }
        });
    }

    const permRequest = async () => {
        const APIURL = 'https://github.com/login/oauth/authorize?scope=repo, read:user&client_id=b5be98ebcdc9cdf67526&state=' + window.location.origin;
        window.authWindow = window.open(APIURL, 'authWindow', 'width=600,height=600', 'rel=opener');
        window.authWindow.focus();
    }


    const cloneWorkshopsRepo = async (formDataForGithub) => {
        const cloneAPIURL = APIURL + 'make_workshop_repo';
        const response = await fetch(cloneAPIURL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.getItem('githubToken'), formDataForGithub: formDataForGithub })
        });
        if (response.ok) {
            console.log('Workshops repo cloned');
        }
        else {
            console.log('Error cloning workshops repo');
            console.log(response);
        }
    }

    const createInstitute = async () => {
        props.clearCache();
        const formDataForGithub = {
            ...formik.values,
            sessions: formik.values.sessions.map(session => ({
                ...session,
                instructors: session.instructors.map(instructor => ({ name: instructor })),
                helpers: session.helpers.map(helper => ({ name: helper.name })),
            })),
            origin: window.location.origin
        };

        const logo = {
            DHRIFTname: 'logo',
            image: document.querySelector('input[name="logo"]').files[0]
        };
        const heroImage = {
            DHRIFTname: 'heroImage',
            image: document.querySelector('input[name="heroImage"]').files[0]
        };
        let imageDatas = [logo, heroImage];
        if (!imageDatas.some(image => image.image)) {
            // console.log('No images to add');
        }
        let imagesToSend = imageDatas.filter(image => image.image);
        imagesToSend = imagesToSend.map((image) => {
            const imageExtension = image.image.name.split('.').pop();
            return {
                name: image.DHRIFTname,
                data: image.image,
                type: image.image.type,
                extension: imageExtension
            };
        });
        if (formik.values.cloneWorkshops) {
            formDataForGithub.cloneWorkshops = true;
        }
        else {
            formDataForGithub.cloneWorkshops = false;
            formDataForGithub.workshopsuser = 'dhri-curriculum';
            formDataForGithub.workshopsrepo = 'workshops';
        }
        const createAPIURL = APIURL + 'create_institute';
        const response = await fetch(createAPIURL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.getItem('githubToken'), formDataForGithub: formDataForGithub })
        });
        if (response.ok) {
            const data = await response.json();
            setInstUrl(data.repoName);
            setInstName(data.instUser);
            uploadFiles(imagesToSend);
            if (formik.values.cloneWorkshops) {
                console.log('Cloning workshops repo');
                cloneWorkshopsRepo(formDataForGithub);
            }

            setInstCreated(true);
            setDialogOpen(true);
            setShowProgress(false);
        }
        else {
            console.log('Error creating institute');
            console.log(response);
            setShowProgress(false);
        }

    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        formik.setFieldValue(name, type === 'checkbox' ? checked : value);
    };

    const handleAdd = (field, sessionIndex) => {
        const newItem = field === 'sessions' ? { date: '', time: '', title: '', description: '', workshop: '', location: '', instructors: [{ name: '', email: '' }], helpers: [{ name: '', email: '' }] } : { name: '', email: '' };

        if (field === 'sessions') {
            const updatedSessions = [...formik.values.sessions, newItem];
            formik.setFieldValue('sessions', updatedSessions);
        } else if (field === 'instructors' || field === 'helpers') {
            const session = formik.values.sessions[sessionIndex];
            const updatedSession = {
                ...session,
                [field]: [...session[field], newItem]
            };
            const updatedSessions = formik.values.sessions.map((s, i) => i === sessionIndex ? updatedSession : s);
            formik.setFieldValue('sessions', updatedSessions);
        } else {
            formik.setFieldValue(field, [...formik.values[field], newItem]);
        }
    };

    const handleRemove = (field, index, sessionIndex) => {
        if (field === 'instructors' || field === 'helpers') {

            const session = formik.values.sessions[sessionIndex];
            const updatedSession = {
                ...session,
                [field]: session[field].filter((item, i) => i !== index)
            };
            const updatedSessions = formik.values.sessions.map((s, i) => i === sessionIndex ? updatedSession : s);
            return;
        }

        const list = [...formik.values[field]];
        list.splice(index, 1);
        formik.setFieldValue(field, list);
    };

    const handleArrayFieldChange = (field, index, subfield, value, subsubfield, subIndex) => {
        if (subfield === 'instructors' || subfield === 'helpers') {
            const session = formik.values.sessions[index];
            const list = [...session[subfield]];
            list[subIndex][subsubfield] = value;
            const updatedSession = {
                ...session,
                [subfield]: list
            };
            const updatedSessions = formik.values.sessions.map((s, i) => i === index ? updatedSession : s);
            formik.setFieldValue('sessions', updatedSessions);
            return;
        }
        const list = [...formik.values[field]];
        list[index][subfield] = value;
        formik.setFieldValue(field, list);
    };

    const formExplanation = (
        <div>
            <h2>Create a DHRIFT Community Landing Page</h2>
            <p>The following wizard can be used to generate a website for organizing and leading workshops based on the DHRIFT Core curricula. It will prompt you to answer questions about your event, then ask you to provide DHRIFT with access to your GitHub account. The process will end by creating a new repository in your GitHub account with a DHRIFT repository that will combine your answers with DHRIFT content.</p>

            <h2>Before You Begin</h2>
            <p>For an optimal experience, assemble key information about your institute in advance. Institute landing pages can be recreated; however, each new iteration will currently overwrite a previous institute, so you will want to save copies of your previous answers.</p>

            <p>Information you will need includes:</p>
            <ul>
                <li>A title, description, format, location, and contact information for your event.</li>
                <li>Dates, times, and locations for workshops</li>
                <li>Names of instructors and assistants</li>
                <li>A GitHub account and login information</li>
            </ul>

            <p>For more information about how to make the most out of your DHRIFT landing page, please see our documentation. </p>
        </div>
    );

const logoUpload = (
    <Card variant="outlined" sx={{ padding: 2, marginBottom: 2 }}>
        <h2>Logo Upload</h2>
        <p>Upload a logo for your institute. This will be displayed in the header of your DHRIFT landing page.</p>
        <input type="file" name="logo" accept="image/*" />
    </Card>
);

const heroImageUpload = (
    <Card variant="outlined" sx={{ padding: 2, marginBottom: 2 }}>
        <h2>Hero Image Upload</h2>
        <p>Upload a hero image for your institute. This will be displayed at the top of your DHRIFT landing page.</p>
        <input type="file" name="heroImage" accept="image/*" />
    </Card>
);

    const registrationFormSection = (
        <Stack
            direction={'row'}
            spacing={2}
        >
            <TextField label="Registration or Application Link" type="text" name="registerLink" value={formik.values.registerLink} onChange={handleInputChange}
                style={{
                    width: '400px',
                }}
            />
            <TextField label="Registration or Application Button Text" type="text" name="registerText" value={formik.values.registerText} onChange={handleInputChange}
                style={{
                    width: '400px',
                }}
            />
        </Stack>
    );

    const checkboxtoHaveRegistration = (
        <Stack spacing={2}>
            <h3>Registration Information</h3>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Switch
                    checked={formik.values.haveRegistration}
                    onChange={handleInputChange}
                    name="haveRegistration"
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <label>Include Registration Information</label>
            </Stack>
            {formik.values.haveRegistration && registrationFormSection}
        </Stack>
    );

    const cloneWorkshopsSection = (
        <>
            <div>
                <Checkbox
                    checked={formik.values.cloneWorkshops === true}
                    onChange={handleInputChange}
                    name="cloneWorkshops"
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <label>Clone Workshops Repository</label>
            </div>
        </>
    );

    const progress = (
        <>
            {showProgress &&
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            }
        </>
    );

    const instCreatedSuccessDialog = (
        <>
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box sx={{ padding: '20px', textAlign: 'center' }}>
                    <h2>Success!</h2>
                    <p>Your institute has been successfully created.</p>
                    <p>
                        <a href={`../../inst/?instUser=${instName}&instRepo=${instUrl}`} target="_blank" rel="noopener noreferrer">
                            View your new site
                        </a>
                    </p>
                    <p>
                        <a href={`https://github.com/${instName}/${instUrl}`} target="_blank" rel="noopener noreferrer">
                            View your GitHub repository
                        </a>
                    </p>
                </Box>

                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );

    const formatSection = (
        <>
        <TextField
            select
            label="Format"
            value={formik.values.format}
            onChange={handleInputChange}
            name="format"
            style={{ width: '400px' }}
        >
            <MenuItem value={'online'}>Online</MenuItem>
            <MenuItem value={'hybrid'}>Hybrid</MenuItem>
            <MenuItem value={'in-person'}>In-Person</MenuItem>
        </TextField>
        </>
    );

    const locationSection = () => {
        return (
            <Stack spacing={2}>
                <h3>Location</h3>
                {formik.values.format === 'online' && (
                    <>
                        <TextField
                            label="Virtual Meeting Link"
                            type="text"
                            name="onlinePlatformLink"
                            value={formik.values.onlinePlatformLink}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            label="Event Notes"
                            type="text"
                            name="eventNotes"
                            value={formik.values.eventNotes}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </>
                )}
                {formik.values.format === 'hybrid' && (
                    <>
                        <TextField
                            label="Virtual Meeting Link"
                            type="text"
                            name="onlinePlatformLink"
                            value={formik.values.onlinePlatformLink}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            label="Venue"
                            type="text"
                            name="venue"
                            value={formik.values.venue}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            label="Location"
                            type="text"
                            name="location"
                            value={formik.values.location}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            label="Event Notes"
                            type="text"
                            name="eventNotes"
                            value={formik.values.eventNotes}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </>
                )}
                {formik.values.format === 'in-person' && (
                    <>
                        <TextField
                            label="Venue"
                            type="text"
                            name="venue"
                            value={formik.values.venue}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            label="Location"
                            type="text"
                            name="location"
                            value={formik.values.location}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            label="Event Notes"
                            type="text"
                            name="eventNotes"
                            value={formik.values.eventNotes}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </>
                )}
            </Stack>
        );
    }

    const longDescriptionSection = (
        <Stack spacing={2}>
            <h3>Long Description</h3>
            <p>
                Provide a detailed description of your institute for attendees. This space may describe the desired outcomes, the skills or projects your event will focus on, or the overall purpose of the institute.
            </p>
            <TextField
                label="Long Description"
                type="text"
                name="longdescription"
                value={formik.values.longdescription}
                multiline
                rows={4}
                onChange={handleInputChange}
                fullWidth
            />
            <h3>Social Media</h3>
            <TextField
                label="Social Media"
                type="text"
                name="socialMedia"
                value={formik.values.socialMedia}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                label="Social Media Link"
                type="text"
                name="socialmedialink"
                value={formik.values.socialmedialink}
                onChange={handleInputChange}
                fullWidth
            />
        </Stack>
    );

const generalInfoSection = (
    <Stack spacing={3}>
        <h2>General Information</h2>
        <p>The information from this page will appear at the top of the page overlaid on the hero-image. Fields with an * are required.</p>
        
        <TextField 
            label="Title of Institute / Workshop / Event / Course / Class" 
            type="text" 
            name="event" 
            value={formik.values.event}
            required
            error={formError && !formik.values.event}
            helperText={formError && !formik.values.event ? 'This field is required' : ''}
            fullWidth
            onChange={handleInputChange} 
        />
        
        <Stack spacing={2} direction="row">
            <TextField 
                type="date" 
                name="dateStart" 
                value={formik.values.dateStart}
                helperText="Start Date" 
                onChange={handleInputChange} 
                fullWidth
            />
            <TextField
                type="date" 
                name="endDate" 
                value={formik.values.endDate}
                helperText="End Date" 
                onChange={handleInputChange} 
                fullWidth
            />
        </Stack>
        
        <TextField 
            label="Tagline" 
            type="text" 
            name="herodescription" 
            value={formik.values.herodescription}
            helperText="Max 10 words"
            fullWidth
            onChange={handleInputChange} 
        />
        
        {formatSection}
        
        <TextField 
            label="Host Organization" 
            type="text" 
            name="institution" 
            value={formik.values.institution}
            required
            error={formError && !formik.values.institution}
            helperText={formError && !formik.values.institution ? 'This field is required' : ''}
            fullWidth
            onChange={handleInputChange} 
        />
        
        <TextField 
            label="Short Description" 
            type="text" 
            name="description" 
            value={formik.values.description} 
            multiline 
            rows={3}
            required
            error={formError && !formik.values.description}
            helperText={formError && !formik.values.description ? 'This field is required' : ''}
            fullWidth
            onChange={handleInputChange} 
        />
    </Stack>
);

    const organizersSection = (
        <Stack spacing={2}>
            <h4>Organizers</h4>
            {formik.values.organizers.map((organizer, index) => (
                <Box key={index} display="flex" alignItems="center" flexWrap="wrap" gap={2}>
                    <TextField
                        label={`Organizer ${index + 1}`}
                        type="text"
                        value={formik.values.organizers[index].name}
                        onChange={(e) => handleArrayFieldChange('organizers', index, 'name', e.target.value)}
                        style={{ flex: 1, minWidth: '200px' }}
                    />
                    <TextField
                        label={`Organizer ${index + 1} Email`}
                        type="email"
                        value={formik.values.organizers[index].email}
                        onChange={(e) => handleArrayFieldChange('organizers', index, 'email', e.target.value)}
                        style={{ flex: 1, minWidth: '200px' }}
                    />
                    {formik.values.organizers.length > 1 && (
                        <Button type="button" onClick={() => handleRemove('organizers', index)}><Remove /></Button>
                    )}
                    {index === formik.values.organizers.length - 1 && (
                        <Button type="button" onClick={() => handleAdd('organizers')}><Add /></Button>
                    )}
                </Box>
            ))}
        </Stack>
    );

    const sponsorsSection = (
        <Stack spacing={2}>
            <h3>Sponsors</h3>
            {formik.values.sponsors.map((sponsor, index) => (
                <Stack key={index} spacing={2} direction="row" alignItems="center">
                    <TextField
                        label={`Sponsor ${index + 1}`}
                        type="text"
                        value={formik.values.sponsors[index].name}
                        onChange={(e) => handleArrayFieldChange('sponsors', index, 'name', e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label={`Sponsor ${index + 1} Link`}
                        type="text"
                        value={formik.values.sponsors[index].link}
                        onChange={(e) => handleArrayFieldChange('sponsors', index, 'link', e.target.value)}
                        onBlur={formik.handleBlur}
                        error={formik.touched.sponsors?.[index]?.link && Boolean(formik.errors.sponsors?.[index]?.link)}
                        helperText={formik.touched.sponsors?.[index]?.link && formik.errors.sponsors?.[index]?.link}
                        fullWidth
                    />
                    <TextField
                        label={`Sponsor ${index + 1} Notes`}
                        type="text"
                        value={sponsor.notes}
                        onChange={(e) => handleArrayFieldChange('sponsors', index, 'notes', e.target.value)}
                        onBlur={formik.handleBlur}
                        fullWidth
                    />
                    {formik.values.sponsors.length > 1 && (
                        <Button type="button" onClick={() => handleRemove('sponsors', index)}><Remove /></Button>
                    )}
                    {index === formik.values.sponsors.length - 1 && (
                        <Button type="button" onClick={() => handleAdd('sponsors')}><Add /></Button>
                    )}
                </Stack>
            ))}
        </Stack>
    );

    const contactSection = (
        <Stack spacing={2}>
            <h3>Contact</h3>
            {formik.values.contact.map((contact, index) => (
                <Stack key={index} spacing={2} direction="row" alignItems="center">
                    <TextField
                        label={`Contact ${index + 1}`}
                        type="text"
                        value={contact.name}
                        onChange={(e) => handleArrayFieldChange('contact', index, 'name', e.target.value)}
                        onBlur={formik.handleBlur}
                        error={formik.touched.contact?.[index]?.name && Boolean(formik.errors.contact?.[index]?.name)}
                        helperText={formik.touched.contact?.[index]?.name && formik.errors.contact?.[index]?.name}
                        fullWidth
                    />
                    <TextField
                        label={`Contact ${index + 1} Email`}
                        type="email"
                        value={contact.email}
                        onChange={(e) => handleArrayFieldChange('contact', index, 'email', e.target.value)}
                        onBlur={formik.handleBlur}
                        error={formik.touched.contact?.[index]?.email && Boolean(formik.errors.contact?.[index]?.email)}
                        helperText={formik.touched.contact?.[index]?.email && formik.errors.contact?.[index]?.email}
                        fullWidth
                    />
                    {formik.values.contact.length > 1 && (
                        <Button type="button" onClick={() => handleRemove('contact', index)}><Remove /></Button>
                    )}
                    {index === formik.values.contact.length - 1 && (
                        <Button type="button" onClick={() => handleAdd('contact')}><Add /></Button>
                    )}
                </Stack>
            ))}
        </Stack>
    );

    const instituteDetailsSection = (
        <Stack spacing={3}>
            <h2>Institute Details</h2>
            <p>Provide details about the sponsors and contact persons for your institute.</p>
            {sponsorsSection}
            {contactSection}
        </Stack>
    );

const sessionsSection = (
    <Stack spacing={3}
    className='sessions'
    >
        <h2>Sessions</h2>
        <p>Provide details about each session in your institute.</p>
        {formik.values.sessions.map((session, index) => (
            <Card key={index} variant="outlined" sx={{ padding: 2, marginBottom: 2 }}>
                <h4>Session {index + 1}</h4>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Title"
                            type="text"
                            value={session.title}
                            onChange={(e) => handleArrayFieldChange('sessions', index, 'title', e.target.value)}
                            fullWidth
                            required
                            error={formik.touched.sessions?.[index]?.title && Boolean(formik.errors.sessions?.[index]?.title)}
                            helperText={formik.touched.sessions?.[index]?.title && formik.errors.sessions?.[index]?.title}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            type="date"
                            value={session.date}
                            onChange={(e) => handleArrayFieldChange('sessions', index, 'date', e.target.value)}
                            fullWidth
                            required
                            error={formik.touched.sessions?.[index]?.date && Boolean(formik.errors.sessions?.[index]?.date)}
                            helperText={formik.touched.sessions?.[index]?.date && formik.errors.sessions?.[index]?.date}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            type="time"
                            value={session.time}
                            onChange={(e) => handleArrayFieldChange('sessions', index, 'time', e.target.value)}
                            fullWidth
                            required
                            error={formik.touched.sessions?.[index]?.time && Boolean(formik.errors.sessions?.[index]?.time)}
                            helperText={formik.touched.sessions?.[index]?.time && formik.errors.sessions?.[index]?.time}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            type="time"
                            value={session.endTime}
                            onChange={(e) => handleArrayFieldChange('sessions', index, 'endTime', e.target.value)}
                            fullWidth
                            error={formik.touched.sessions?.[index]?.endTime && Boolean(formik.errors.sessions?.[index]?.endTime)}
                            helperText={formik.touched.sessions?.[index]?.endTime && formik.errors.sessions?.[index]?.endTime}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            type="text"
                            value={session.description}
                            onChange={(e) => handleArrayFieldChange('sessions', index, 'description', e.target.value)}
                            multiline
                            rows={4}
                            fullWidth
                            error={formik.touched.sessions?.[index]?.description && Boolean(formik.errors.sessions?.[index]?.description)}
                            helperText={formik.touched.sessions?.[index]?.description && formik.errors.sessions?.[index]?.description}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            label="DHRIFT Workshop"
                            value={session.workshop}
                            onChange={(e) => handleArrayFieldChange('sessions', index, 'workshop', e.target.value)}
                            fullWidth
                            error={formik.touched.sessions?.[index]?.workshop && Boolean(formik.errors.sessions?.[index]?.workshop)}
                            helperText={formik.touched.sessions?.[index]?.workshop && formik.errors.sessions?.[index]?.workshop}
                        >
                            {displayWorkshops.map((workshop, i) => (
                                <MenuItem key={i} value={workshop.name}>{workshop.name}</MenuItem>
                            ))}
                            <MenuItem value={''}>None</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Location"
                            type="text"
                            value={session.location}
                            onChange={(e) => handleArrayFieldChange('sessions', index, 'location', e.target.value)}
                            fullWidth
                            error={formik.touched.sessions?.[index]?.location && Boolean(formik.errors.sessions?.[index]?.location)}
                            helperText={formik.touched.sessions?.[index]?.location && formik.errors.sessions?.[index]?.location}
                        />
                    </Grid>
                </Grid>
                <h5>Instructors</h5>
                {session.instructors.map((instructor, i) => (
                    <Grid container spacing={2} key={i}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={`Instructor ${i + 1}`}
                                type="text"
                                value={instructor.name}
                                onChange={(e) => handleArrayFieldChange('sessions', index, 'instructors', e.target.value, 'name', i)}
                                fullWidth
                                error={formik.touched.sessions?.[index]?.instructors?.[i]?.name && Boolean(formik.errors.sessions?.[index]?.instructors?.[i]?.name)}
                                helperText={formik.touched.sessions?.[index]?.instructors?.[i]?.name && formik.errors.sessions?.[index]?.instructors?.[i]?.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={`Instructor ${i + 1} Email`}
                                type="email"
                                value={instructor.email}
                                onChange={(e) => handleArrayFieldChange('sessions', index, 'instructors', e.target.value, 'email', i)}
                                fullWidth
                                error={formik.touched.sessions?.[index]?.instructors?.[i]?.email && Boolean(formik.errors.sessions?.[index]?.instructors?.[i]?.email)}
                                helperText={formik.touched.sessions?.[index]?.instructors?.[i]?.email && formik.errors.sessions?.[index]?.instructors?.[i]?.email}
                            />
                        </Grid>
                        {session.instructors.length > 1 && (
                            <Grid item xs={12}>
                                <Button type="button" onClick={() => handleRemove('instructors', i, index)}><Remove /></Button>
                            </Grid>
                        )}
                    </Grid>
                ))}
                <Button type="button" onClick={() => handleAdd('instructors', index)}><Add /></Button>
                <h5>Helpers</h5>
                {session.helpers.map((helper, i) => (
                    <Grid container spacing={2} key={i}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={`Helper ${i + 1}`}
                                type="text"
                                value={helper.name}
                                onChange={(e) => handleArrayFieldChange('sessions', index, 'helpers', e.target.value, 'name', i)}
                                fullWidth
                                error={formik.touched.sessions?.[index]?.helpers?.[i]?.name && Boolean(formik.errors.sessions?.[index]?.helpers?.[i]?.name)}
                                helperText={formik.touched.sessions?.[index]?.helpers?.[i]?.name && formik.errors.sessions?.[index]?.helpers?.[i]?.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={`Helper ${i + 1} Email`}
                                type="email"
                                value={helper.email}
                                onChange={(e) => handleArrayFieldChange('sessions', index, 'helpers', e.target.value, 'email', i)}
                                fullWidth
                                error={formik.touched.sessions?.[index]?.helpers?.[i]?.email && Boolean(formik.errors.sessions?.[index]?.helpers?.[i]?.email)}
                                helperText={formik.touched.sessions?.[index]?.helpers?.[i]?.email && formik.errors.sessions?.[index]?.helpers?.[i]?.email}
                            />
                        </Grid>
                        {session.helpers.length > 1 && (
                            <Grid item xs={12}>
                                <Button type="button" onClick={() => handleRemove('helpers', i, index)}><Remove /></Button>
                            </Grid>
                        )}
                    </Grid>
                ))}
                <Button type="button" onClick={() => handleAdd('helpers', index)}><Add /></Button>
                {formik.values.sessions.length > 1 && (
                    <Button type="button" onClick={() => handleRemove('sessions', index)}>Remove Session</Button>
                )}
            </Card>
        ))}
        <Button type="button" onClick={() => handleAdd('sessions')}>Add Session</Button>
    </Stack>
    );

    const handleStageChange = (e) => {
        // jump to top of page
        window.scrollTo(0, 0);
        if (firstStage) {
            setFirstStage(false);
            setSecondStage(true);
        }
        else {
            setFirstStage(true);
            setSecondStage(false);
        }
    }

    const firstStageSection = (
        <>
            {formExplanation}
            {generalInfoSection}
            {checkboxtoHaveRegistration}
            {organizersSection}
            {locationSection()}
            {longDescriptionSection}
            {instituteDetailsSection}
            {sessionsSection}
            {logoUpload}
            {heroImageUpload}
            {cloneWorkshopsSection}
            <div>
                <Checkbox
                    checked={formik.values.showWorkshops}
                    onChange={handleInputChange}
                    name="showWorkshops"
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <label>Show Workshops</label>
            </div>
            <Box sx={{ display: 'flex' }}>
                <Button
                    onClick={formik.handleSubmit}
                    disabled={showProgress}
                >Create Institute</Button>
                {progress}
            </Box>
        </>
    );

    return (
        <>

            {instCreatedSuccessDialog}
            {(
                <>
                    <Header title={'Dhrift'} instUser={'dhri-curriculum'} instRepo={'dhrift-site-template'}
                        gitUser={'dhri-curriculum'} gitRepo={'workshops'}
                    />
                    <Container>
                        <form className='form' onSubmit={formik.handleSubmit}>
                            <FormControl>
                                {firstStage && firstStageSection}
                            </FormControl>
                        </form>
                    </Container>
                </>
            )}
        </>
    );
}

