import Header from "../../components/Header";
import { useState } from "react";
import { Container } from "@mui/material";

export default function Form() {
    const [user, setUser] = useState("");
    const [repo, setRepo] = useState("");
    const [file, setFile] = useState("");
    const [organizerName, setOrganizerName] = useState("");
    const [institution, setInstitution] = useState("");
    const [event, setEvent] = useState("");
    const [description, setDescription] = useState("");
    const [registerLink, setRegisterLink] = useState("");
    const [venue, setVenue] = useState("");
    const [address, setAddress] = useState("");
    const [language, setLanguage] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [instructors, setInstructors] = useState("");
    const [helpers, setHelpers] = useState("");
    const [emails, setEmails] = useState("");
    const [workshopsUser, setWorkshopsUser] = useState("");
    const [workshopsRepo, setWorkshopsRepo] = useState("");
    const [sessions, setSessions] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(repo, file)
        //   get username from repo url 

    }


    return (
        <>
            <Header />
            <Container>
                <form action="/submit-form" method="POST" onSubmit={handleSubmit} className="form">
                    <label htmlFor="organizername">Organizer Name:</label>
                    <input type="text" id="organizername" name="organizername" value={organizerName} onChange={(e) => setOrganizerName(e.target.value)} />

                    <label htmlFor="institution">Institution:</label>
                    <input type="text" id="institution" name="institution" value={institution} onChange={(e) => setInstitution(e.target.value)} />

                    <label htmlFor="event">Event:</label>
                    <input type="text" id="event" name="event" value={event} onChange={(e) => setEvent(e.target.value)} />

                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" rows="5" cols="50" value={description} onChange={(e) => setDescription(e.target.value)} />

                    <label htmlFor="registerlink">Registration Link:</label>
                    <input type="text" id="registerlink" name="registerlink" value={registerLink} onChange={(e) => setRegisterLink(e.target.value)} />

                    <label htmlFor="venue">Venue:</label>
                    <input type="text" id="venue" name="venue" value={venue} onChange={(e) => setVenue(e.target.value)} />

                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />

                    <label htmlFor="language">Language:</label>
                    <input type="text" id="language" name="language" value={language} onChange={(e) => setLanguage(e.target.value)} />

                    <label htmlFor="datestart">Start Date:</label>
                    <input type="date" id="datestart" name="datestart" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

                    <label htmlFor="enddate">End Date:</label>
                    <input type="date" id="enddate" name="enddate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

                    <label htmlFor="instructors">Instructors:</label>
                    <input type="text" id="instructors" name="instructors" value={instructors} onChange={(e) => setInstructors(e.target.value)} />

                    <label htmlFor="helpers">Helpers:</label>
                    <input type="text" id="helpers" name="helpers" value={helpers} onChange={(e) => setHelpers(e.target.value)} />

                    <label htmlFor="emails">Emails:</label>
                    <input type="text" id="emails" name="emails" value={emails} onChange={(e) => setEmails(e.target.value)} />

                    <label htmlFor="workshopsuser">Workshops User:</label>
                    <input type="text" id="workshopsuser" name="workshopsuser" value={workshopsUser} onChange={(e) => setWorkshopsUser(e.target.value)} />

                    <label htmlFor="workshopsrepo">Workshops Repo:</label>
                    <input type="text" id="workshopsrepo" name="workshopsrepo" value={workshopsRepo} onChange={(e) => setWorkshopsRepo(e.target.value)} />

                    <label htmlFor="sessions">Sessions:</label>
                    <textarea id="sessions" name="sessions" rows="10" cols="50" value={sessions} onChange={(e) => setSessions(e.target.value)} />
                </form>
            </Container>
        </>
    );
}

