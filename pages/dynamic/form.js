import Header from '../../components/Header';
import { useEffect, useState } from "react";
// import { FormControl, InputLabel, Input, Button } from '@mui/material';
// import { TextField, Container, Stack } from '@mui/material';
import { Stack, TextField, Button, Container } from '@mui/material';

export default function Form() {
    const [instCreated, setInstCreated] = useState(false);
    const [instUrl, setInstUrl] = useState('');
    const [instName, setInstName] = useState('');
    const [formData, setFormData] = useState({
        organizername: 'Lisa Rhody',
        institution: 'CUNY Graduate Center',
        event: 'Learn.',
        herodescription: 'DHRIFT curriculum have been developed, used, and tested in classrooms at over twenty colleges and universities. DHRIFT provides sites for your technical intensives and workshops that help you to teach technical topics effectively. DHRIFT is created by humanists, for humanists. We value inclusivity and openness in the design of our curriculum and platform.',
        description: 'DHRIFT can be customized to your pedagogical needs.',
        registerlink: 'https://app.dhrift.org/inst/?instUser=GC-DRI&instRepo=GCDRI24Schedule',
        registertext: 'See a Demonstration Institute',
        venue: 'Graduate Center',
        address: '365 5th Ave, New York, NY 10016',
        language: 'en',
        dateStart: '2023-01-01',
        endDate: '2023-01-01',
        instructors: [{ name: 'Steve Zweibel' }, { name: 'Leanne Fan' }],
        helpers: [{ name: 'Zachary Lloyd' }],
        emails: 'example@example.com',
        workshopsuser: 'dhri-curriculum',
        workshopsrepo: 'workshops',

        sessions: [
            {
                date: '2023-03-01',
                time: '09:00',
                title: 'Welcome to the DHRI',
                description: 'This is the first day of the DHRI. We will introduce ourselves and the DHRI, and discuss the goals of the institute.',
                workshop: '',
                location: 'The Graduate Center, CUNY',
                instructors: ['Stephen Zweibel']
            },
            {
                date: '2023-03-01',
                time: '11:00',
                title: 'Introduction to the Command Line',
                description: 'This workshop will introduce you to the command line, a text-based interface for interacting with your computer. We will cover basic commands, file management, and navigating the file system.',
                workshop: 'command-line',
                location: 'The Graduate Center, CUNY',
                instructors: ['']
            },
        ],
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setInstCreated(urlParams.get('instCreated') === 'true');
        setInstName(urlParams.get('instUser'));
        setInstUrl(urlParams.get('instRepo'));
    }
        , []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // serialize form data 
        // send to github
        const formDataForGithub = {
            ...formData,
            sessions: formData.sessions.map(session => ({
                ...session,
                instructors: session.instructors.map(instructor => ({ name: instructor }))
            })),
            instructors: formData.instructors.map(instructor => ({ name: instructor.name })),
            helpers: formData.helpers.map(helper => ({ name: helper.name })),
            origin: window.location.origin
        };
        // convert to base64
        const converted = Buffer.from(JSON.stringify(formDataForGithub)).toString('base64');
        const permRequest = 'https://github.com/login/oauth/authorize?scope=repo, read:user&client_id=b5be98ebcdc9cdf67526&state=' + converted;
        window.location.href = permRequest
    }


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleAdd = (field) => {
        const newItem = field === 'sessions' ? { date: '', time: '', title: '', description: '', workshop: '', location: '', instructors: [''] } : { name: '' };
        setFormData({
            ...formData,
            [field]: [...formData[field], newItem]
        });
    };

    const handleRemove = (field, index) => {
        const list = [...formData[field]];
        list.splice(index, 1);
        setFormData({
            ...formData,
            [field]: list
        });
    };

    const handleArrayFieldChange = (field, index, key, value) => {
        const updatedItems = formData[field].map((item, i) =>
            index === i ? { ...item, [key]: value } : item
        );
        setFormData({
            ...formData,
            [field]: updatedItems
        });
    };

    return (
        <>
            <Header title={'Dhrift'} instUser={'dhri-curriculum'} instRepo={'dhrift-site-template'}
                gitUser={'dhri-curriculum'} gitRepo={'workshops'}
            />
            <Container>
                <h1>Create your own DHRIFT Institute</h1>
                {instCreated &&
                    instCreatedSuccess
                }
                {!instCreated && (
                    <form>
                        <Stack spacing={2}>
                            <TextField label="Register Text" type="text" name="registerText" value={formData.registerText} onChange={handleInputChange} />
                            <TextField label="Venue" type="text" name="venue" value={formData.venue} onChange={handleInputChange} />
                            <TextField label="Address" type="text" name="address" value={formData.address} onChange={handleInputChange} />
                            <TextField label="Language" type="text" name="language" value={formData.language} onChange={handleInputChange} />
                            <TextField label="Date Start" type="date" name="dateStart" value={formData.dateStart} onChange={handleInputChange} />
                            <TextField label="End Date" type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} />
                            {formData.instructors.map((instructor, index) => (
                                <div key={index}>
                                    <TextField label={`Instructor ${index + 1}`} type="text" value={instructor.name} onChange={(e) => handleArrayFieldChange('instructors', index, 'name', e.target.value)} />
                                    {formData.instructors.length > 1 && (
                                        <Button type="button" onClick={() => handleRemove('instructors', index)}>Remove Instructor</Button>
                                    )}
                                </div>
                            ))}
                            <Button onClick={() => handleAdd('instructors')} variant='contained' >Add Instructor</Button>
                            {formData.helpers.map((helper, index) => (
                                <div key={index}>
                                    <TextField label={`Helper ${index + 1}`} type="text" value={helper.name} onChange={(e) => handleArrayFieldChange('helpers', index, 'name', e.target.value)} />
                                    {formData.helpers.length > 1 && (
                                        <Button type="button" onClick={() => handleRemove('helpers', index)}>Remove Helper</Button>
                                    )}
                                </div>
                            ))}
                            <Button onClick={() => handleAdd('helpers')} variant='contained' >Add Helper</Button>
                            <TextField label="Emails" type="email" name="emails" value={formData.emails} onChange={handleInputChange} />
                            <TextField label="Workshops User" type="text" name="workshopsUser" value={formData.workshopsUser} onChange={handleInputChange} />
                            <TextField label="Workshops Repo" type="text" name="workshopsRepo" value={formData.workshopsRepo} onChange={handleInputChange} />
                            {formData.sessions.map((session, index) => (
                                <div key={index}>
                                    <h4>Session {index + 1}</h4>
                                    <Stack spacing={2}>
                                    <TextField label="Date" type="date" value={session.date} onChange={(e) => handleArrayFieldChange('sessions', index, 'date', e.target.value)} />
                                    <TextField label="Time" type="time" value={session.time} onChange={(e) => handleArrayFieldChange('sessions', index, 'time', e.target.value)} />
                                    <TextField label="Title" type="text" value={session.title} onChange={(e) => handleArrayFieldChange('sessions', index, 'title', e.target.value)} />
                                    <TextField label="Description" type="text" value={session.description} onChange={(e) => handleArrayFieldChange('sessions', index, 'description', e.target.value)} />
                                    {formData.sessions.length > 1 && (
                                        <Button type="button" onClick={() => handleRemove('sessions', index)}>Remove Session</Button>
                                    )}
                                    </Stack>
                                </div>
                            ))}
                            <Button type="button" onClick={() => handleAdd('sessions')}>Add Session</Button>
                            <Button type="submit" onClick={handleSubmit}>Create Institute</Button>
                        </Stack>
                    </form>
                )}
            </Container>
        </>
    );
}

