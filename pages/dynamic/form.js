import Header from '../../components/Header';
import { useEffect, useState } from "react";
import { Container } from '@mui/material';
import { Octokit } from '@octokit/rest';
import { Button } from '@mui/material';

export default function Form() {
    const [octokit, setOctokit] = useState(null);
    const [token, setToken] = useState(null);
    const [formData, setFormData] = useState({
        organizerName: '',
        DHRIFTfrontpage: false,
        institution: '',
        event: '',
        heroDescription: '',
        description: '',
        registerLink: '',
        registerText: '',
        venue: '',
        address: '',
        language: '',
        emails: ['', ''],
        workshopsUser: '',
        workshopsRepo: '',
        instructors: [{ name: '' }],
  helpers: [{ name: '' }],
  sessions: [{ date: '', time: '', title: '', description: '', workshop: '', location: '',  instructors: [''] }],
      });
    

    useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setToken(urlParams.get('token'));
    setOctokit(new Octokit({
        auth: token
    }));
    }
    , [token]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const permRequest =  'https://github.com/login/oauth/authorize?scope=repo&client_id=b5be98ebcdc9cdf67526&state='+ {formData};
        window.location.href = permRequest;
    }


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const githubForm = (
<form onSubmit={handleSubmit}>
      <div>
        <label>Organizer Name:</label>
        <input type="text" name="organizerName" value={formData.organizerName} onChange={handleInputChange} />
      </div>
      <div>
        <label>DHRIFT Front Page:</label>
        <input type="checkbox" name="DHRIFTfrontpage" checked={formData.DHRIFTfrontpage} onChange={handleInputChange} />
      </div>
      <div>
        <label>Institution:</label>
        <input type="text" name="institution" value={formData.institution} onChange={handleInputChange} />
      </div>
      <div>
        <label>Event:</label>
        <input type="text" name="event" value={formData.event} onChange={handleInputChange} />
      </div>
      <div>
        <label>Hero Description:</label>
        <textarea name="heroDescription" value={formData.heroDescription} onChange={handleInputChange} />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange} />
      </div>
      <div>
        <label>Register Link:</label>
        <input type="url" name="registerLink" value={formData.registerLink} onChange={handleInputChange} />
      </div>
      <div>
        <label>Register Text:</label>
        <input type="text" name="registerText" value={formData.registerText} onChange={handleInputChange} />
      </div>
      <div>
        <label>Venue:</label>
        <input type="text" name="venue" value={formData.venue} onChange={handleInputChange} />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
      </div>
      <div>
        <label>Language:</label>
        <input type="text" name="language" value={formData.language} onChange={handleInputChange} />
      </div>
      <div>
        <label>Date Start:</label>
        <input type="date" name="dateStart" value={formData.dateStart} onChange={handleInputChange} />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} />
      </div>
      <div>
        <label>Instructors (comma-separated):</label>
        <input type="text" name="instructors" value={formData.instructors} onChange={handleInputChange} />
      </div>
      <div>
        <label>Helpers (comma-separated):</label>
        <input type="text" name="helpers" value={formData.helpers} onChange={handleInputChange} />
      </div>
      <div>
        <label>Emails (comma-separated):</label>
        <input type="text" name="emails" value={formData.emails} onChange={handleInputChange} />
      </div>
      <div>
        <label>Workshops User:</label>
        <input type="text" name="workshopsUser" value={formData.workshopsUser} onChange={handleInputChange} />
      </div>
      <div>
        <label>Workshops Repo:</label>
        <input type="text" name="workshopsRepo" value={formData.workshopsRepo} onChange={handleInputChange} />
      </div>
      <div>
        <label>Sessions (JSON format):</label>
        <textarea name="sessions" value={formData.sessions} onChange={handleInputChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
        );


    return (
        <>
        <Header title={'Dhrift'} instUser={'dhri-curriculum'} instRepo={'dhrift-site-template'}
            gitUser={'dhri-curriculum'} gitRepo={'workshops'}
            />
        <Container>
        <h1>Create your own DHRIFT Institute</h1>
        {githubForm}
        {/* {token!=null ? <p>connected</p> :
        
    } */}
        
        </Container>
        </>
    );
}