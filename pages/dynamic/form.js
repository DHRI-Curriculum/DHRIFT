import { useState } from "react";

export default function Form() {
    const [user, setUser] = useState("");
    const [repo, setRepo] = useState("");
    const [file, setFile] = useState("");

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


    return (
        <form onSubmit={handleSubmit}>
             <label>
                GitHub username:
                <input
                    type="text"
                    value={username}
                    onChange={e => setRepo(e.target.value)}
                    required
                />
            </label>
            <label>
                GitHub repo:
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
    );
}