import Header from '../../components/Header';
import { useEffect, useState } from "react";
import { FormControl, InputLabel, Input } from '@mui/material';
import { Stack, TextField, Button, Container, MenuItem } from '@mui/material';
import useAllWorkshops from '../../components/Hooks/UseAllWorkshops';
import { Add, Remove } from '@mui/icons-material';

export default function Form() {
    const [instCreated, setInstCreated] = useState(false);
    const [authComplete, setAuthComplete] = useState(false);
    const [instUrl, setInstUrl] = useState('');
    const [instName, setInstName] = useState('');
    const [formData, setFormData] = useState({
        organizers: [{ name: '', email: '' }],
        institution: 'CUNY Graduate Center',
        event: 'Learn.',
        herodescription: 'DHRIFT curriculum have been developed, used, and tested in classrooms at over twenty colleges and universities. DHRIFT provides sites for your technical intensives and workshops that help you to teach technical topics effectively. DHRIFT is created by humanists, for humanists. We value inclusivity and openness in the design of our curriculum and platform.',
        description: 'DHRIFT can be customized to your pedagogical needs.',
        // registerlink: 'https://app.dhrift.org/inst/?instUser=GC-DRI&instRepo=GCDRI24Schedule',
        // registertext: 'See a Demonstration Institute',
        venue: '',
        address: '365 5th Ave, New York, NY 10016',
        dateStart: '2023-01-01',
        endDate: '2023-01-01',
        workshopsuser: 'dhri-curriculum',
        workshopsrepo: 'workshops',

        // format: 'online, hybrid, in-person',
        format: 'online',

        sessions: [
            {
                date: '2023-03-01',
                time: '09:00',
                title: 'Welcome to the DHRI',
                description: 'This is the first day of the DHRI. We will introduce ourselves and the DHRI, and discuss the goals of the institute.',
                workshop: '',
                location: 'The Graduate Center, CUNY',
                instructors: [{ name: 'Steve Zweibel', email: '' }],
                helpers: [{ name: 'Zachary Lloyd', email: '' }]
            },
            {
                date: '2023-03-01',
                time: '11:00',
                title: 'Introduction to the Command Line',
                description: 'This workshop will introduce you to the command line, a text-based interface for interacting with your computer. We will cover basic commands, file management, and navigating the file system.',
                workshop: 'command-line',
                location: 'The Graduate Center, CUNY',
                instructors: [{ name: 'Stephen Zweibel', email: '' }],
                helpers: [{ name: 'Zachary Lloyd', email: '' }]
            },
        ],
    });

    const realAPIURL = 'https://run-dhrift-d5tkoh5ciq-uc.a.run.app/';
    const localAPIURL = 'http://localhost:8080/';
    const APIURL = realAPIURL;

    const data = useAllWorkshops({ gitUser: 'dhri-curriculum', gitRepo: 'workshops', instUser: 'dhri-curriculum', instRepo: 'workshops' });

    let displayWorkshops = data.workshops.filter(workshop => workshop.type === 'file' && !workshop.name.startsWith('DHRIFT_') && !workshop.name.startsWith('README.md'));
    displayWorkshops = displayWorkshops.map(workshop => ({ name: workshop.name.replace('.md', '') }));

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setInstCreated(urlParams.get('instCreated') === 'true');
        setAuthComplete(urlParams.get('authComplete') === 'true');
        setInstName(urlParams.get('instUser'));
        setInstUrl(urlParams.get('instRepo'));
    }
        , []);

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
                        body: JSON.stringify(data)
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
                    body: JSON.stringify(data)
                });
            }
        });
    }

    useEffect(() => {
        function handle_auth_complete(event) {
            const data = JSON.parse(event.data);
            console.log(data);
            if (data.auth === 'complete') {
                setAuthComplete(true);
            }
        }
        const bc = new BroadcastChannel('auth');
        bc.onmessage = handle_auth_complete;
        return () => {
            bc.close();
        }
    }
        , []);

    const checkAuth = async () => {
        const cookieAPIURL = APIURL + 'cookie_test';
        const response = await fetch(cookieAPIURL, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            setAuthComplete(true);
        }
        else {
            permRequest();
        }
    }

    const checkAuthSection = (
        <div>
            <h2>Check Authentication</h2>
            <p>Click the button below to check if you are authenticated with GitHub.</p>
            <Button onClick={checkAuth}>Check Authentication</Button>
        </div>
    );


    const permRequest = async () => {
        const APIURL = 'https://github.com/login/oauth/authorize?scope=repo, read:user&client_id=b5be98ebcdc9cdf67526&state=DHRIFT';
        window.authWindow = window.open(APIURL, 'authWindow', 'width=600,height=600', 'rel=opener');
        window.authWindow.focus();
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        // checkAuth();
        createInstitute();
    }


    const createInstitute = async () => {
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
            console.log('No images to add');
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
        const createAPIURL = APIURL + 'create_institute';
        const response = await fetch(createAPIURL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ formDataForGithub })
        });
        if (response.ok) {
            // const data = await response.json();
            setInstCreated(true);
            // setInstUrl(data.instUrl);
            // setInstName(data.instName);
            uploadFiles(imagesToSend);
        }
        else {
            console.log('Error creating institute');
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
            <p>The following form can be used to generate a landing page for organizing and leading workshops based on DHRIFT’s menu of workshops. By completing the fields below, you will produce a web page that can be used to organize a digital humanities learning event, which might include a single workshop on one day or scale to a multi-day event with multiple instructors, workshops, and even locations. For examples, please see the DHRIFT Gallery. Once generated, the resulting page will display the information you provide below.</p>

            <h2>Getting Started</h2>
            <p>The wizard will require you to log into your GitHub account, and the generated page will live as a github page in your git-hub account; however, all of the workshops you add will continue to be hosted on the DHRIFT site.</p>
            <p>The information you provide below will be stored in a file in your repository, and the resulting page will be hosted on GitHub Pages.</p>
            <p>
                NOTE: You may use this page to update previous information on your DHRIFT landing page; however, this form currently overwrites all of the content on any previous DHRIFT page you may have saved in the same location.
                What you will need:
                Basic information about your institute
                Dates and times for workshops and events
                Names of instructors and helpers
                A github account and all of your login information on hand

                For more information about how to make the most out of your DHRIFT landing page, please see our documentation here… wherever we do that. </p>


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

    const registrationDescription = (
        <div>
            <h2>Participant Application and / or Registration Information</h2>
            <p>You can customize your DHRIFT landing page to include links to an application or registration page. DHRIFT does not include a registration page. We recommend that you use another service, such as a Google form or Zoom registration; however, you can turn this section on or off here. Any information provided in this section will appear directly below the event description.</p>
        </div>
    );

    const registrationFormSection = (
        <div>
            <h2>Registration Information</h2>
            <p>Enter the URL for your registration page below. This will be displayed on your DHRIFT landing page.</p>
            <TextField label="Registration Link" type="text" name="registerLink" value={formData.registerLink} onChange={handleInputChange} />
            <TextField label="Registration Text" type="text" name="registerText" value={formData.registerText} onChange={handleInputChange} />
        </div>
    );

    const checkboxtoHaveRegistration = (
        <div>
            <input type="checkbox" name="haveRegistration" checked={formData.haveRegistration} onChange={handleInputChange} />
            <label>Include Registration Information</label>
            {formData.haveRegistration && registrationFormSection}
        </div>
    );

    const instCreatedSuccess = (
        <div>
            <h2>Success!</h2>
            <p>Your institute has been created. You can view it <a href={`../../inst/?instUser=${instName}&instRepo=${instUrl}`}>here</a>.</p>
        </div>
    );

    const formatSection = (
        <div>
            <h2>Format</h2>
            <p>What is the format of your event?</p>
            <input type="radio" name="format" value="online" checked={formData.format === 'online'} onChange={handleInputChange} />
            <label>Online</label>
            <input type="radio" name="format" value="hybrid" checked={formData.format === 'hybrid'} onChange={handleInputChange} />
            <label>Hybrid</label>
            <input type="radio" name="format" value="in-person" checked={formData.format === 'in-person'} onChange={handleInputChange} />
            <label>In-Person</label>
        </div>
    );

    const locationSection = function () {
        if (formData.format === 'online') {
            return (
                <Stack
                    spacing={2}>
                    <h2>Location</h2>
                    <p>Enter the URL for your online platform below. This will be displayed on your DHRIFT landing page.</p>
                    <TextField label="Online Platform Link" type="text" name="onlinePlatformLink" value={formData.onlinePlatformLink}
                        style={{
                            width: '400px',
                            marginRight: '10px',
                            marginBottom: '10px'
                        }}
                        onChange={handleInputChange} />
                </Stack>
            );
        }
        if (formData.format === 'hybrid') {
            return (
                <Stack spacing={2}>
                    <h2>Location</h2>
                    <p>Enter the URL for your online platform below. This will be displayed on your DHRIFT landing page.</p>
                    <TextField label="Online Platform Link" type="text" name="onlinePlatformLink" value={formData.onlinePlatformLink}
                        style={{ width: '400px' }}
                        onChange={handleInputChange} />
                    <p>Enter the venue and address for your event below. This will be displayed on your DHRIFT landing page.</p>
                    <TextField label="Venue" type="text" name="venue" value={formData.venue} onChange={handleInputChange} />
                    <TextField label="Address" type="text" name="address" value={formData.address} onChange={handleInputChange} />
                </Stack>
            );
        }
        else {
            return (
                <Stack spacing={2}>
                    <h2>Location</h2>
                    <p>Enter the venue and address for your event below. This will be displayed on your DHRIFT landing page.</p>
                    <TextField label="Venue" type="text" name="venue" value={formData.venue}
                        style={{
                            width: '400px',
                            marginRight: '10px'
                        }}
                        onChange={handleInputChange} />
                    <TextField label="Address" type="text" name="address" value={formData.address}
                        style={{
                            width: '400px',
                            marginBottom: '10px'
                        }}
                        onChange={handleInputChange} />
                </Stack>
            );
        }
    }

    const eventDescriptionSection = (
        <Stack
            spacing={2}>
            <TextField label="Event Title" type="text" name="event" value={formData.event}
                style={{ width: '400px' }}
                onChange={handleInputChange} />
            <TextField label="Hero Description" type="text" name="heroDescription" value={formData.herodescription}
                onChange={handleInputChange} />
            <TextField label="Description" type="text" name="description" value={formData.description}
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

    const sessionsSection = (
        <Stack spacing={2}>
            <h4>Sessions</h4>
            {formData.sessions.map((session, index) => (
                <div
                    style={{ border: '1px solid black', padding: '10px', margin: '10px' }}
                    key={index}>
                    <h4>Session {index + 1}</h4>
                    <Stack spacing={2}
                        direction={'row'}>
                        <TextField label="Date" type="date" value={session.date} onChange={(e) => handleArrayFieldChange('sessions', index, 'date', e.target.value)} />
                        <TextField label="Time" type="time" value={session.time} onChange={(e) => handleArrayFieldChange('sessions', index, 'time', e.target.value)} />
                        <TextField label="Title" type="text" value={session.title} onChange={(e) => handleArrayFieldChange('sessions', index, 'title', e.target.value)}
                            style={{ width: '400px' }}
                        />
                    </Stack>
                    <br />
                    <Stack spacing={2}>
                        <TextField label="Description" type="text" value={session.description} onChange={(e) => handleArrayFieldChange('sessions', index, 'description', e.target.value)} multiline rows={4}
                        />
                        <FormControl>
                            <TextField
                                select
                                label="Workshop"
                                value={session.workshop}
                                style={{ width: '400px' }}
                                onChange={(e) => handleArrayFieldChange('sessions', index, 'workshop', e.target.value)}
                            >
                                {displayWorkshops && displayWorkshops.map((workshop, i) => (
                                    <MenuItem key={i} value={workshop.name}>{workshop.name}</MenuItem>
                                ))}
                                <MenuItem value={''}>None</MenuItem>
                            </TextField>
                        </FormControl>
                        <Stack
                            direction={'row'}
                            spacing={2}
                            style={{ marginBottom: '10px' }}
                        >

                            <TextField label="Location" type="text" value={session.location} onChange={(e) => handleArrayFieldChange('sessions', index, 'location', e.target.value)}
                                style={{ width: '400px' }}
                            />
                        </Stack>
                    </Stack>

                    {session.instructors && session.instructors.map((instructor, i) => (
                        <>
                            <div
                                key={'instructor' + i}
                                style={{
                                    display: 'flex', flexDirection: 'row', justifyContent: '', alignItems: 'flex-start', marginTop: '10px',
                                    marginBottom: '10px'
                                }}
                            >
                                <TextField label={`Instructor ${i + 1}`} type="text" value={instructor.name}
                                    style={{
                                        width: '400px',
                                        marginRight: '10px'
                                    }}
                                    onChange={(e) => handleArrayFieldChange('sessions', index, 'instructors', e.target.value, 'name', i)}
                                />
                                <TextField label={`Instructor ${i + 1} Email`} type="email" value={instructor.email}
                                    style={{ width: '400px' }}
                                    onChange={(e) => handleArrayFieldChange('sessions', index, 'instructors', e.target.value, 'email', 1)} />
                                {session.instructors.length > 1 && (
                                    <Button type="button" onClick={() => handleRemove('instructors', i, index)}><Remove /></Button>
                                )}
                            </div>
                        </>
                    ))}
                    <Button type="button" onClick={() => handleAdd('instructors', index)}>
                        <Add />
                    </Button>
                    {session.helpers && session.helpers.map((helper, i) => (
                        <>
                            <div key={'helper' + i}>
                                <TextField label={`Helper ${i + 1}`} type="text" value={helper.name}
                                    style={{
                                        width: '400px',
                                        marginRight: '10px'
                                    }}
                                    onChange={(e) => handleArrayFieldChange('sessions', index, 'helpers', e.target.value, 'name', i)} />
                                <TextField label={`Helper ${i + 1} Email`} type="email" value={helper.email}
                                    style={{ width: '400px' }}
                                    onChange={(e) => handleArrayFieldChange('sessions', index, 'helpers', e.target.value, 'email', i)} />
                                <Button type="button" onClick={() => handleRemove('helpers', i, index)}><Remove /></Button>
                            </div>
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


    // const changeRepoSection = (
    //     <div>
    //         <h2>Change Repository</h2>
    //         <p>Enter the GitHub user and repository where your workshops are stored.</p>
    //         <TextField label="GitHub User" type="text" name="workshopsuser" value={formData.workshopsuser} onChange={handleInputChange} />
    //         <TextField label="GitHub Repository" type="text" name="workshopsrepo" value={formData.workshopsrepo} onChange={handleInputChange} />
    //     </div>
    // );



    return (
        <>
            {instCreated &&
                instCreatedSuccess
            }
            {/* {!instCreated && !authComplete && getAuthenticationSection}
            {!instCreated && !authComplete && checkAuthSection} */}
            {authComplete &&
                <>
                    {heroImageUpload}
                </>
            }
            {!instCreated && (
                <>
                    <Header title={'Dhrift'} instUser={'dhri-curriculum'} instRepo={'dhrift-site-template'}
                        gitUser={'dhri-curriculum'} gitRepo={'workshops'}
                    />
                    <Container>
                        <div
                            className='form'
                        >
                            {formExplanation}
                            {registrationDescription}
                            {eventDescriptionSection}
                            {logoUpload}
                            {heroImageUpload}
                            <>
                                {checkboxtoHaveRegistration}
                                {formatSection}
                                {locationSection()}
                                <TextField label="Date Start" type="date" name="dateStart" value={formData.dateStart} onChange={handleInputChange}
                                    style={{ marginRight: '10px' }}
                                />
                                <TextField label="End Date" type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} />

                                {organizersSection}
                                {sessionsSection}

                                Show all workshops?
                                <input type="checkbox" name="showWorkshops" checked={formData.showworkshops} onChange={handleInputChange} />
                                <Button onClick={handleSubmit}>Create Institute</Button>
                            </>
                        </div>
                    </Container>
                </>
            )}
        </>
    );
}
