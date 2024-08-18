import Header from '../../components/Header';
import { useEffect, useState } from "react";
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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';


export default function Form(props) {
    const [instCreated, setInstCreated] = useState(false);
    const [authComplete, setAuthComplete] = useState(false);
    const [instUrl, setInstUrl] = useState('');
    const [instName, setInstName] = useState('');
    const [firstStage, setFirstStage] = useState(true);
    const [formError, setFormError] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
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
            },
        ],
        registerLink: '',
        registerText: '',
        haveRegistration: false,
        cloneWorkshops: false,
        showWorkshops: false,
        longdescription: '',
        socialMedia: '',
        socialmedialink: ''
    });

    useEffect(() => {
        const useDummyData = router.query.useDummyData === 'true';
        if (useDummyData) {
            console.log('Using dummy data');
            setFormData({
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
            });
            formik.setValues({
                ...formik.values,
                ...{
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
                }
            });
        }
    }, [router.query, formData]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [showProgress, setShowProgress] = useState(false);

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
        initialValues: formData,
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

    const realAPIURL = 'https://run-dhrift-d5tkoh5ciq-uc.a.run.app/';
    const localAPIURL = 'http://localhost:8080/';
    const APIURL = realAPIURL;

    const data = useAllWorkshops({ gitUser: 'dhri-curriculum', gitRepo: 'workshops', instUser: 'dhri-curriculum', instRepo: 'workshops' });

    let displayWorkshops = data.workshops.filter(workshop => workshop.type === 'file' && !workshop.name.startsWith('DHRIFT_') && !workshop.name.startsWith('README.md'));
    displayWorkshops = displayWorkshops.map(workshop => ({ name: workshop.name.replace('.md', '') }));


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
            ...formData,
            sessions: formData.sessions.map(session => ({
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
        if (formData.cloneWorkshops) {
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
            if (formData.cloneWorkshops) {
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

        // if it's an instructor or helper, make the field the session.instructors or session.helpers and update the session
        if (field === 'instructors' || field === 'helpers') {
            const session = formData.sessions[sessionIndex];
            const updatedSession = {
                ...session,
                [field]: [...session[field], newItem]
            };
            const updatedSessions = formData.sessions.map((s, i) => i === sessionIndex ? updatedSession : s);
            setFormData({
                ...formData,
                sessions: updatedSessions
            });
            return;
        }

        formik.setFieldValue(field, [...formik.values[field], newItem]);
    };

    const handleRemove = (field, index, sessionIndex) => {
        if (field === 'instructors' || field === 'helpers') {

            const session = formData.sessions[sessionIndex];
            const updatedSession = {
                ...session,
                [field]: session[field].filter((item, i) => i !== index)
            };
            const updatedSessions = formData.sessions.map((s, i) => i === sessionIndex ? updatedSession : s);
            setFormData({
                ...formData,
                sessions: updatedSessions
            });
            return;
        }

        const list = [...formData[field]];
        list.splice(index, 1);
        formik.setFieldValue(field, list);
    };

    const handleArrayFieldChange = (field, index, subfield, value, subsubfield, subIndex) => {
        if (subfield === 'instructors' || subfield === 'helpers') {
            const session = formData.sessions[index];
            const list = [...session[subfield]];
            list[subIndex][subsubfield] = value;
            const updatedSession = {
                ...session,
                [subfield]: list
            };
            const updatedSessions = formData.sessions.map((s, i) => i === index ? updatedSession : s);
            setFormData({
                ...formData,
                sessions: updatedSessions
            });
            return;
        }
        const list = [...formData[field]];
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
        <div>
            <h2>Logo Upload</h2>
            <p>Upload a logo for your institute. This will be displayed in the header of your DHRIFT landing page.</p>
            <input type="file" name="logo" accept="image/*" />
        </div>
    );

    const heroImageUpload = (
        <div>
            <h2>Hero Image Upload</h2>
            <p>Upload a hero image for your institute. This will be displayed at the top of your DHRIFT landing page.</p>
            <input type="file" name="heroImage" accept="image/*" />
        </div>
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
        <div>
            <h3>Registration Information</h3>
            {/* <input type="checkbox" name="haveRegistration" checked={formData.haveRegistration} onChange={handleInputChange} /> */}
            <Switch
                checked={formik.values.haveRegistration}
                onChange={handleInputChange}
                name="haveRegistration"
                inputProps={{ 'aria-label': 'controlled' }}
            />
            <label>Include Registration Information</label>
            {formik.values.haveRegistration && registrationFormSection}
        </div>
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
                <h2>Success!</h2>
                <p>Your institute has been created. You can view it <a href={`../../inst/?instUser=${instName}&instRepo=${instUrl}`}>here</a>.</p>

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
        if (formik.values.format === 'online') {
            return (
                <Stack
                    spacing={2}>
                    <h3>Location</h3>
                    <TextField label="Virtual Meeting Link" type="text" name="onlinePlatformLink" value={formik.values.onlinePlatformLink}
                        style={{
                            width: '400px',
                            marginRight: '10px',
                            marginBottom: '10px'
                        }}
                        onChange={handleInputChange} />
                    <TextField label="Event Notes" type="text" name="eventNotes" value={formik.values.eventNotes} onChange={handleInputChange} />
                </Stack>
            );
        }
        if (formik.values.format === 'hybrid') {
            return (
                <Stack spacing={2}>
                    <h3>Location</h3>
                    <TextField label="Virtual Meeting Link" type="text" name="onlinePlatformLink" value={formData.onlinePlatformLink}
                        style={{ width: '400px' }}
                        onChange={handleInputChange} />
                    <p>Enter the venue and address for your event below. This will be displayed on your DHRIFT landing page.</p>
                    <TextField label="Venue" type="text" name="venue" value={formData.venue} onChange={handleInputChange} />
                    <TextField label="Location" type="text" name="location" value={formData.location} onChange={handleInputChange} />
                    <TextField label="Event Notes" type="text" name="eventNotes" value={formData.eventNotes} onChange={handleInputChange} />
                </Stack>
            );
        }
        if (formik.values.format === 'in-person') {
            return (
                <Stack spacing={2}>
                    <h3>Location</h3>

                    <TextField label="Venue" type="text" name="venue" value={formik.values.venue}
                        style={{
                            width: '400px',
                            marginRight: '10px'
                        }}
                        onChange={handleInputChange} />
                    <TextField label="Location" type="text" name="location" value={formik.values.location}
                        style={{
                            width: '400px',
                            marginBottom: '10px'
                        }}
                        onChange={handleInputChange} />
                    <TextField label="Event Notes" type="text" name="eventNotes" value={formData.eventNotes} onChange={handleInputChange} />
                </Stack>
            );
        }
    }

    const longDescriptionSection = (
        <Stack spacing={2}>
            <h3>Long Description</h3>
            <p>
                Write an up to 150 word description of your institute for attendees. This space may describe what the desired outcome of the event will be, what kind of skills or projects your event will focus on, or the purpose of the institute.
            </p>
            <TextField
                label="Long Description"
                type="text"
                name="longDescription"
                value={formik.values.longdescription}
                multiline
                rows={4}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <h3>Social Media</h3>
            <TextField
                label="Social Media"
                type="text"
                name="socialMedia"
                value={formik.values.socialMedia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <TextField
                label="link"
                type="text"
                name="socialmedialink"
                value={formik.values.socialmedialink}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
        </Stack>
    );

    const generalInfoSection = (
        <Stack
            spacing={2}>
            <h2>General Information</h2>
            <p>The information from this page will appear at the top of the page overlaid on the hero-image. See Creating a DHRIFT Landing Page (?) for an example. Fields with an * are required.</p>
            <TextField label="Title of institute/ workshop / event/ course / class" type="text" name="event" value={formik.values.event}
                required
                error={formError && !formData.event}
                helperText={formError && !formData.event ? 'This field is required' : ''}
                style={{ width: '400px' }}
                onChange={handleInputChange} />
            <Stack spacing={2} direction={'row'}>
                <TextField type="date" name="dateStart" value={formik.values.dateStart}
                    helperText="Start Date" onChange={handleInputChange} />
                <TextField
                    helperText="End Date" type="date" name="endDate" value={formik.values.endDate}
                    onChange={handleInputChange} />
                <TextField type="text" name='herodescription' label="Tagline"
                    value={formik.values.herodescription}
                    helperText="Max 10 words"
                    style={{ width: '400px' }}
                    onChange={handleInputChange} />
                {formatSection}
            </Stack>
            <TextField label='Host Organization' type='text' name='institution' value={formik.values.institution}
                required
                error={formError && !formData.institution}
                helperText={formError && !formData.institution ? 'This field is required' : ''}
                style={{ width: '400px' }}
                onChange={handleInputChange} />
            <TextField label="Short Description" type="text" name="description" value={formik.values.description} multiline rows={3}
                required
                error={formError && !formData.description}
                helperText={formError && !formData.description ? 'This field is required' : ''}
                onChange={handleInputChange} />
        </Stack>
    );

    const organizersSection = (
        <Stack spacing={2}>
            <h4>Organizers</h4>
            {formData.organizers.map((organizer, index) => (
                <div key={index}>
                    <TextField label={`Organizer ${index + 1}`} type="text" value={formik.values.organizers[index].name}
                        style={{
                            width: '400px',
                            marginRight: '10px'
                        }}
                        onChange={(e) => handleArrayFieldChange('organizers', index, 'name', e.target.value)} />
                    <TextField label={`Organizer ${index + 1} Email`} type="email" value={formik.values.organizers[index].email}
                        style={{ width: '400px' }}
                        onChange={(e) => handleArrayFieldChange('organizers', index, 'email', e.target.value)} />
                    {formData.organizers.length > 1 && (
                        <Button type="button" onClick={() => handleRemove('organizers', index)}>Remove Organizer</Button>
                    )}

                    {index === formData.organizers.length - 1 && (
                        <Button type="button" onClick={() => handleAdd('organizers')}><Add /></Button>
                    )}
                </div>
            ))}
        </Stack>
    );

    const sponsorsSection = (
        <Stack spacing={2}>
            <h4>Sponsors</h4>
            {formData.sponsors.map((sponsor, index) => (
                <div key={index}>
                    <TextField label={`Sponsor ${index + 1}`} type="text" value={formik.values.sponsors[index].name}
                        style={{
                            width: '400px',
                            marginRight: '10px'
                        }}
                        onChange={(e) => handleArrayFieldChange('sponsors', index, 'name', e.target.value)} />
                    <TextField label={`Sponsor ${index + 1} Link`} type="text" value={formik.values.sponsors[index].link}
                        style={{ width: '400px' }}
                        onChange={(e) => handleArrayFieldChange('sponsors', index, 'link', e.target.value)} />
                    <TextField
                        label={`Sponsor ${index + 1} Link`}
                        type="text"
                        value={sponsor.link}
                        style={{ width: '400px' }}
                        onChange={(e) => handleArrayFieldChange('sponsors', index, 'link', e.target.value)}
                        onBlur={formik.handleBlur}
                        error={formik.touched.sponsors?.[index]?.link && Boolean(formik.errors.sponsors?.[index]?.link)}
                        helperText={formik.touched.sponsors?.[index]?.link && formik.errors.sponsors?.[index]?.link}
                    />
                    <TextField
                        label={`Sponsor ${index + 1} Notes`}
                        type="text"
                        value={sponsor.notes}
                        style={{ width: '400px' }}
                        onChange={(e) => handleArrayFieldChange('sponsors', index, 'notes', e.target.value)}
                        onBlur={formik.handleBlur}
                    />
                    {formData.sponsors.length > 1 && (
                        <Button type="button" onClick={() => handleRemove('sponsors', index)}>Remove Sponsor</Button>
                    )}

                    {index === formData.sponsors.length - 1 && (
                        <Button type="button" onClick={() => handleAdd('sponsors')}><Add /></Button>
                    )}
                </div>
            ))}
        </Stack>
    );

    const contactSection = (
        <Stack spacing={2}>
            <h4>Contact</h4>
            {formData.contact.map((contact, index) => (
                <div key={index}>
                    <TextField
                        label={`Contact ${index + 1}`}
                        type="text"
                        value={contact.name}
                        style={{ width: '400px', marginRight: '10px' }}
                        onChange={(e) => handleArrayFieldChange('contact', index, 'name', e.target.value)}
                        onBlur={formik.handleBlur}
                        error={formik.touched.contact?.[index]?.name && Boolean(formik.errors.contact?.[index]?.name)}
                        helperText={formik.touched.contact?.[index]?.name && formik.errors.contact?.[index]?.name}
                    />
                    <TextField
                        label={`Contact ${index + 1} Email`}
                        type="email"
                        value={contact.email}
                        style={{ width: '400px' }}
                        onChange={(e) => handleArrayFieldChange('contact', index, 'email', e.target.value)}
                        onBlur={formik.handleBlur}
                        error={formik.touched.contact?.[index]?.email && Boolean(formik.errors.contact?.[index]?.email)}
                        helperText={formik.touched.contact?.[index]?.email && formik.errors.contact?.[index]?.email}
                    />
                    {formik.values.contact.length > 1 && (
                        <Button type="button" onClick={() => handleRemove('contact', index)}>Remove Contact</Button>
                    )}

                    {index === formik.values.contact.length - 1 && (
                        <Button type="button" onClick={() => handleAdd('contact')}><Add /></Button>
                    )}
                </div>
            ))}
        </Stack>
    );

    const instituteDetailsSection = (
        <Stack spacing={2}>
            <h2>Institute Details</h2>
            {sponsorsSection}
            {contactSection}
        </Stack>
    );

    const sessionsSection = (
        <Stack
            className='sessions'
            spacing={2}>
            <h2>Sessions</h2>
            {formData.sessions.map((session, index) => (
                <div
                    style={{ border: '1px solid black', padding: '10px', margin: '10px' }}
                    key={index}>
                    <h4>Session {index + 1}</h4>
                    <Stack spacing={2}
                        direction={'row'}>
                        <TextField
                            label="Title"
                            type="text"
                            value={formik.values.sessions[index].title}
                            onChange={(e) => handleArrayFieldChange('sessions', index, 'title', e.target.value)}
                            style={{ width: '400px' }}
                            error={formik.touched.sessions?.[index]?.title && Boolean(formik.errors.sessions?.[index]?.title)}
                            helperText={formik.touched.sessions?.[index]?.title && formik.errors.sessions?.[index]?.title}
                            required
                        />
                        <TextField
                            // helperText="Date"
                            type="date"
                            value={formik.values.sessions[index].date}
                            onChange={(e) => handleArrayFieldChange('sessions', index, 'date', e.target.value)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.sessions?.[index]?.date && Boolean(formik.errors.sessions?.[index]?.date)}
                            helperText={formik.touched.sessions?.[index]?.date && formik.errors.sessions?.[index]?.date}
                        />
                        <TextField
                            type="time"
                            value={formik.values.sessions[index].time}
                            onChange={(e) => handleArrayFieldChange('sessions', index, 'time', e.target.value)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.sessions?.[index]?.time && Boolean(formik.errors.sessions?.[index]?.time)}
                            helperText={formik.touched.sessions?.[index]?.time && formik.errors.sessions?.[index]?.time}
                        />
                        <TextField
                            type="time"
                            value={formik.values.sessions[index].endTime}
                            onChange={(e) => handleArrayFieldChange('sessions', index, 'endTime', e.target.value)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.sessions?.[index]?.endTime && Boolean(formik.errors.sessions?.[index]?.endTime)}
                            helperText={formik.touched.sessions?.[index]?.endTime && formik.errors.sessions?.[index]?.endTime}
                        />
                    </Stack>
                    <br />
                    <Stack
                        spacing={2}>
                        <TextField
                            label="Description"
                            type="text"
                            value={formik.values.sessions[index].description}
                            onChange={(e) => handleArrayFieldChange('sessions', index, 'description', e.target.value)}
                            multiline
                            rows={4}
                            error={formik.touched.sessions?.[index]?.description && Boolean(formik.errors.sessions?.[index]?.description)}
                            helperText={formik.touched.sessions?.[index]?.description && formik.errors.sessions?.[index]?.description}
                        />
                        <Stack
                            spacing={2}
                            direction={'row'}>
                            <TextField
                                select
                                label="DHRIFT Workshop"
                                value={formik.values.sessions[index].workshop}
                                style={{ width: '400px' }}
                                onChange={(e) => handleArrayFieldChange('sessions', index, 'workshop', e.target.value)}
                                onBlur={formik.handleBlur}
                                error={formik.touched.sessions?.[index]?.workshop && Boolean(formik.errors.sessions?.[index]?.workshop)}
                                helperText={formik.touched.sessions?.[index]?.workshop && formik.errors.sessions?.[index]?.workshop}
                            >
                                {displayWorkshops && displayWorkshops.map((workshop, i) => (
                                    <MenuItem key={i} value={workshop.name}>{workshop.name}</MenuItem>
                                ))}
                                <MenuItem value={''}>None</MenuItem>
                            </TextField>
                            <TextField
                                label="Location"
                                type="text"
                                value={formik.values.sessions[index].location}
                                onChange={(e) => handleArrayFieldChange('sessions', index, 'location', e.target.value)}
                                style={{ width: '400px' }}
                                onBlur={formik.handleBlur}
                                error={formik.touched.sessions?.[index]?.location && Boolean(formik.errors.sessions?.[index]?.location)}
                                helperText={formik.touched.sessions?.[index]?.location && formik.errors.sessions?.[index]?.location}
                            />
                        </Stack>
                        <br />
                    </Stack>

                    {session.instructors && session.instructors.map((instructor, i) => (
                        <Stack
                            spacing={1}
                            direction={'row'}
                            key={'instructor' + i}>
                            <TextField
                                label={`Instructor ${i + 1}`}
                                type="text"
                                value={formik.values.sessions[index].instructors[i].name}
                                style={{ width: '400px', marginRight: '10px' }}
                                onChange={(e) => handleArrayFieldChange('sessions', index, 'instructors', e.target.value, 'name', i)}
                                onBlur={formik.handleBlur}
                                error={formik.touched.sessions?.[index]?.instructors?.[i]?.name && Boolean(formik.errors.sessions?.[index]?.instructors?.[i]?.name)}
                                helperText={formik.touched.sessions?.[index]?.instructors?.[i]?.name && formik.errors.sessions?.[index]?.instructors?.[i]?.name}
                            />
                            <TextField
                                label={`Instructor ${i + 1} Email`}
                                type="email"
                                value={formik.values.sessions[index].instructors[i].email}
                                style={{ width: '400px' }}
                                onChange={(e) => handleArrayFieldChange('sessions', index, 'instructors', e.target.value, 'email', i)}
                                onBlur={formik.handleBlur}
                                error={formik.touched.sessions?.[index]?.instructors?.[i]?.email && Boolean(formik.errors.sessions?.[index]?.instructors?.[i]?.email)}
                                helperText={formik.touched.sessions?.[index]?.instructors?.[i]?.email && formik.errors.sessions?.[index]?.instructors?.[i]?.email}
                            />
                            {session.instructors.length > 1 && (
                                <Button type="button" onClick={() => handleRemove('instructors', i, index)}><Remove /></Button>
                            )}
                        </Stack>
                    ))}
                    <Button type="button" onClick={() => handleAdd('instructors', index)}>
                        <Add />
                    </Button>
                    {session.helpers && session.helpers.map((helper, i) => (
                        <>
                            <Stack
                                spacing={1}
                                direction={'row'}
                                key={'helper' + i}>
                                <TextField
                                    label={`Assistant ${i + 1}`}
                                    type="text"
                                    value={formik.values.sessions[index].helpers[i].name}
                                    style={{ width: '400px', marginRight: '10px' }}
                                    onChange={(e) => handleArrayFieldChange('sessions', index, 'helpers', e.target.value, 'name', i)}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.sessions?.[index]?.helpers?.[i]?.name && Boolean(formik.errors.sessions?.[index]?.helpers?.[i]?.name)}
                                    helperText={formik.touched.sessions?.[index]?.helpers?.[i]?.name && formik.errors.sessions?.[index]?.helpers?.[i]?.name}
                                />
                                <TextField
                                    label={`Assistant ${i + 1} Email`}
                                    type="email"
                                    value={formik.values.sessions[index].helpers[i].email}
                                    style={{ width: '400px' }}
                                    onChange={(e) => handleArrayFieldChange('sessions', index, 'helpers', e.target.value, 'email', i)}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.sessions?.[index]?.helpers?.[i]?.email && Boolean(formik.errors.sessions?.[index]?.helpers?.[i]?.email)}
                                    helperText={formik.touched.sessions?.[index]?.helpers?.[i]?.email && formik.errors.sessions?.[index]?.helpers?.[i]?.email}
                                />
                                <Button type="button" onClick={() => handleRemove('helpers', i, index)}><Remove /></Button>
                            </Stack>
                        </>
                    ))}
                    <Button type="button" onClick={() => handleAdd('helpers', index)}>
                        <Add />
                    </Button>
                    {formData.sessions.length > 1 && (
                        <div>
                            <Button type="button" onClick={() => handleRemove('sessions', index)}>Remove Session</Button>
                        </div>
                    )}
                </div>
            ))}
            <div>
                <Button type="button" onClick={() => handleAdd('sessions')}>Add Session</Button>
            </div>
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

