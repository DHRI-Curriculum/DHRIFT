import Header from '../../components/Header';
import { useEffect, useState } from "react";
import { FormControl, InputLabel, Input } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Stack, TextField, Button, Container, MenuItem } from '@mui/material';
import useAllWorkshops from '../../components/Hooks/UseAllWorkshops';
import { Add, Remove } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { useRef } from 'react';


export default function Form(props) {
    const [instCreated, setInstCreated] = useState(false);
    const [authComplete, setAuthComplete] = useState(false);
    const [instUrl, setInstUrl] = useState('');
    const [instName, setInstName] = useState('');
    const [firstStage, setFirstStage] = useState(true);
    const [formError, setFormError] = useState(false);
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
        organizers: [{ name: '', email: '' }],
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
    });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [showProgress, setShowProgress] = useState(false);

    const formRef = useRef();

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
                        body: JSON.stringify({ token: localStorage.getItem('githubToken'), data })
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
                    body: JSON.stringify({ token: localStorage.getItem('githubToken'), file })
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

    const handleSubmit = async (e) => {
        setFormError(false);
        e.preventDefault();
        if (formRef.current.reportValidity()) {
            setShowProgress(true);
            if (!localStorage.getItem('githubToken')) {
                permRequest();
            }
            else {
                checkAuth();
            }
        }
        else {
            setFormError(true);
        }
    }

    const cloneWorkshopsRepo = async (formDataForGithub) => {
        const cloneAPIURL = APIURL + 'make_workshop_repo';
        const response = await fetch(cloneAPIURL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.getItem('githubToken'), formDataForGithub })
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
            body: JSON.stringify({ token: localStorage.getItem('githubToken'), formDataForGithub })
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
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
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

        setFormData({
            ...formData,
            [field]: [...formData[field], newItem]
        });
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
        setFormData({
            ...formData,
            [field]: list
        });
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
        setFormData({
            ...formData,
            [field]: list
        });
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
            <TextField label="Registration or Application Link" type="text" name="registerLink" value={formData.registerLink} onChange={handleInputChange}
                style={{
                    width: '400px',
                }}
            />
            <TextField label="Registration or Application Button Text" type="text" name="registerText" value={formData.registerText} onChange={handleInputChange}
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
                checked={formData.haveRegistration}
                onChange={handleInputChange}
                name="haveRegistration"
                inputProps={{ 'aria-label': 'controlled' }}
            />
            <label>Include Registration Information</label>
            {formData.haveRegistration && registrationFormSection}
        </div>
    );

    const cloneWorkshopsSection = (
        <>
            <div>
                <Checkbox
                    checked={formData.cloneWorkshops}
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
            <FormLabel component="legend">Format</FormLabel>
            <RadioGroup row aria-label="format" name="format" value={formData.format} onChange={handleInputChange}>
                <FormControlLabel value="online" control={<Radio />} label="Online" />
                <FormControlLabel value="hybrid" control={<Radio />} label="Hybrid" />
                <FormControlLabel value="in-person" control={<Radio />} label="In-Person" />
            </RadioGroup>
        </>
    );

    const locationSection = function () {
        if (formData.format === 'online') {
            return (
                <Stack
                    spacing={2}>
                    <h3>Location</h3>
                    <TextField label="Virtual Meeting Link" type="text" name="onlinePlatformLink" value={formData.onlinePlatformLink}
                        style={{
                            width: '400px',
                            marginRight: '10px',
                            marginBottom: '10px'
                        }}
                        onChange={handleInputChange} />
                    <TextField label="Event Notes" type="text" name="eventNotes" value={formData.eventNotes} onChange={handleInputChange} />
                </Stack>
            );
        }
        if (formData.format === 'hybrid') {
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
        if (formData.format === 'in-person') {
            return (
                <Stack spacing={2}>
                    <h3>Location</h3>

                    <TextField label="Venue" type="text" name="venue" value={formData.venue}
                        style={{
                            width: '400px',
                            marginRight: '10px'
                        }}
                        onChange={handleInputChange} />
                    <TextField label="Location" type="text" name="location" value={formData.location}
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
            <TextField label="Long Description" type="text" name="longDescription" value={formData.longdescription} multiline rows={4}
                onChange={handleInputChange} />
            <h3>Social Media</h3>
            <TextField label="Social Media" type="text" name="socialMedia" value={formData.socialMedia} onChange={handleInputChange} />
            <TextField label="link" type="text" name="socialmedialink" value={formData.socialmedialink} onChange={handleInputChange} />
        </Stack>
    );

    const generalInfoSection = (
        <Stack
            spacing={2}>
            <h2>General Information</h2>
            <p>The information from this page will appear at the top of the page overlaid on the hero-image. See Creating a DHRIFT Landing Page (?) for an example. Fields with an * are required.</p>
            <TextField label="Title of institute/ workshop / event/ course / class" type="text" name="event" value={formData.event}
                required
                error={formError && !formData.event}
                helperText={formError && !formData.event ? 'This field is required' : ''}
                style={{ width: '400px' }}
                onChange={handleInputChange} />
            <Stack spacing={2} direction={'row'}>
                <TextField type="date" name="dateStart" value={formData.dateStart}
                    helperText="Start Date" onChange={handleInputChange} />
                <TextField
                    helperText="End Date" type="date" name="endDate" value={formData.endDate}
                    onChange={handleInputChange} />
                <TextField type="text" name='herodescription' label="Tagline"
                    value={formData.herodescription}
                    helperText="Max 10 words"
                    style={{ width: '400px' }}
                    onChange={handleInputChange} />
                {formatSection}
            </Stack>
            <TextField label='Host Organization' type='text' name='institution' value={formData.institution}
                required
                error={formError && !formData.institution}
                helperText={formError && !formData.institution ? 'This field is required' : ''}
                style={{ width: '400px' }}
                onChange={handleInputChange} />
            <TextField label="Short Description" type="text" name="description" value={formData.description} multiline rows={3}
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
                    <TextField label={`Organizer ${index + 1}`} type="text" value={organizer.name}
                        style={{
                            width: '400px',
                            marginRight: '10px'
                        }}
                        onChange={(e) => handleArrayFieldChange('organizers', index, 'name', e.target.value)} />
                    <TextField label={`Organizer ${index + 1} Email`} type="email" value={organizer.email}
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
                    <TextField label={`Sponsor ${index + 1}`} type="text" value={sponsor.name}
                        style={{
                            width: '400px',
                            marginRight: '10px'
                        }}
                        onChange={(e) => handleArrayFieldChange('sponsors', index, 'name', e.target.value)} />
                    <TextField label={`Sponsor ${index + 1} Link`} type="text" value={sponsor.link}
                        style={{ width: '400px' }}
                        onChange={(e) => handleArrayFieldChange('sponsors', index, 'link', e.target.value)} />
                    <TextField label={`Sponsor ${index + 1} Notes`} type="text" value={sponsor.notes}
                        style={{ width: '400px' }}
                        onChange={(e) => handleArrayFieldChange('sponsors', index, 'notes', e.target.value)} />
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
                    <TextField label={`Contact ${index + 1}`} type="text" value={contact.name}
                        style={{
                            width: '400px',
                            marginRight: '10px'
                        }}
                        onChange={(e) => handleArrayFieldChange('contact', index, 'name', e.target.value)} />
                    <TextField label={`Contact ${index + 1} Email`} type="email" value={contact.email}
                        style={{ width: '400px' }}
                        onChange={(e) => handleArrayFieldChange('contact', index, 'email', e.target.value)} />
                    {formData.contact.length > 1 && (
                        <Button type="button" onClick={() => handleRemove('contact', index)}>Remove Contact</Button>
                    )}

                    {index === formData.contact.length - 1 && (
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
                        <TextField label="Title" type="text" value={session.title} onChange={(e) => handleArrayFieldChange('sessions', index, 'title', e.target.value)}
                            style={{ width: '400px' }}
                        />
                        <TextField
                            helperText="Date"
                            type="date" value={session.date} onChange={(e) => handleArrayFieldChange('sessions', index, 'date', e.target.value)} />
                        <TextField
                            helperText="Start Time"
                            type="time" value={session.time} onChange={(e) => handleArrayFieldChange('sessions', index, 'time', e.target.value)} />
                        <TextField helperText="End Time" type="time" value={session.endTime} onChange={(e) => handleArrayFieldChange('sessions', index, 'endTime', e.target.value)} />
                    </Stack>
                    <br />
                    <Stack
                        spacing={2}>
                        <TextField label="Description" type="text" value={session.description} onChange={(e) => handleArrayFieldChange('sessions', index, 'description', e.target.value)} multiline rows={4}
                        />
                        <Stack
                            spacing={2}
                            direction={'row'}>
                            <TextField
                                select
                                label="DHRIFT Workshop"
                                value={session.workshop}
                                style={{ width: '400px' }}
                                onChange={(e) => handleArrayFieldChange('sessions', index, 'workshop', e.target.value)}
                            >
                                {displayWorkshops && displayWorkshops.map((workshop, i) => (
                                    <MenuItem key={i} value={workshop.name}>{workshop.name}</MenuItem>
                                ))}
                                <MenuItem value={''}>None</MenuItem>
                            </TextField>
                            <TextField label="Location" type="text" value={session.location} onChange={(e) => handleArrayFieldChange('sessions', index, 'location', e.target.value)}
                                style={{ width: '400px' }}
                            />
                        </Stack>
                        <br />
                    </Stack>

                    {session.instructors && session.instructors.map((instructor, i) => (
                        <Stack
                            spacing={1}
                            direction={'row'}
                            key={'instructor' + i}>
                            <TextField label={`Instructor ${i + 1}`} type="text" value={instructor.name}
                                style={{
                                    width: '400px',
                                    marginRight: '10px'
                                }}
                                onChange={(e) => handleArrayFieldChange('sessions', index, 'instructors', e.target.value, 'name', i)}
                            />
                            <TextField label={`Instructor ${i + 1} Email`} type="email" value={instructor.email}
                                style={{ width: '400px' }}
                                onChange={(e) => handleArrayFieldChange('sessions', index, 'instructors', e.target.value, 'email', i)}
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
                                <TextField label={`Assistant ${i + 1}`} type="text" value={helper.name}
                                    style={{
                                        width: '400px',
                                        marginRight: '10px'
                                    }}
                                    onChange={(e) => handleArrayFieldChange('sessions', index, 'helpers', e.target.value, 'name', i)} />
                                <TextField label={`Assistant ${i + 1} Email`} type="email" value={helper.email}
                                    style={{ width: '400px' }}
                                    onChange={(e) => handleArrayFieldChange('sessions', index, 'helpers', e.target.value, 'email', i)} />
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
                    checked={formData.showWorkshops}
                    onChange={handleInputChange}
                    name="showWorkshops"
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <label>Show Workshops</label>
            </div>
            <Box sx={{ display: 'flex' }}>
                <Button
                    onClick={handleSubmit}
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
                        <form
                            className='form'
                            ref={formRef}
                        >
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

