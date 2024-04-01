import Header from '../../components/Header';
import { useEffect, useState } from "react";
import { Octokit } from '@octokit/rest';
import { Button } from '@mui/material';

export default function Form() {
    const [user, setUser] = useState("");
    const [repo, setRepo] = useState("");
    const [file, setFile] = useState("");

    useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log(token);
    }
    , []);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(repo, file)
        //   get username from repo url 
        const username = repo.split('/')[3];
        // get repo name from repo url
        const repoName = repo.split('/')[4];
        // get file name from file input but remove 'md' extension if it exists
        const fileName = file.endsWith('.md') ? file.slice(0, -3) : file;
        // redirect to /dynamic/?user=${username}&repo=${repoName}&file=${fileName}
        window.location.href = `/dynamic/?user=${username}&repo=${repoName}&file=${fileName}`
    }

    // const testSubmit = async () => {
    //     const response = await octokit.rest.repos.createForAuthenticatedUser({
    //         name: 'hello-world',
    //         description: 'This is your first repository',
    //     });
    //     console.log(response);
    // }

    const testSubmit = async () => {
        const permRequest =  'https://github.com/login/oauth/authorize?scope=repo&client_id=b5be98ebcdc9cdf67526&state=%7B%22owner%22%3A%20%22smythp%22%7D';
        window.location.href = permRequest;
    }



    return (
        <>
        <Header />
        <form onSubmit={handleSubmit}>
             {/* <label>
                GitHub username:
                <input
                    type="text"
                    value={user}
                    onChange={e => setUser(e.target.value)}
                    required
                />
            </label> */}
            <label>
                GitHub repo url:
                <input
                    type="url"
                    value={repo}
                    onChange={e => setRepo(e.target.value)}
                    required
                />
            </label>
            <label>
                markdown filename:
                <input
                    type="text"
                    value={file}
                    onChange={e => setFile(e.target.value)}
                    required
                />
            </label>
            <input type="submit" value="Submit" />
        </form>
        
        <Button variant="contained" onClick={testSubmit}>Submit</Button>

        </>
    );
}