import { useState } from "react";

export default function Form() {
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

        // get file contents from github api
        // fetch(`https://api.github.com/repos/${username}/${repoName}/contents/${fileName}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         // console.log(data)
        //         // decode base64 encoded file contents
        //         const decoded = atob(data.content);
        //         console.log(decoded)
        //     })
    }


    return (
        <form onSubmit={handleSubmit}>
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