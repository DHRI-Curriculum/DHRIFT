import { useEffect, useState } from 'react';
import useSWR from 'swr';
import jsyaml from 'js-yaml';
import WorkshopsView from '../../components/WorkshopsView';
import Schedule from '../../components/Schedule';
import Header from '../../components/Header';
import Head from 'next/head';
import { format } from 'date-fns';
import { Fade } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import heroImage from '../../public/images/learn.jpg';

export default function Institute(props) {

    props.setWorkshopMode(false)
    const [builtURL, setBuiltURL] = useState(null);
    const [parsedYAML, setParsedYAML] = useState(null);
    const [sessions, setSessions] = useState(null);
    const [shouldFetch, setShouldFetch] = useState(false);
    const [date, setDate] = useState(null);
    const [showAbout, setShowAbout] = useState(true);

    let headers;

    if (process.env.NEXT_PUBLIC_GITHUBSECRET !== 'false') {
        headers = new Headers(
            {
                'Content-Type': 'application/json',
                'authorization': `token ${process.env.NEXT_PUBLIC_GITHUBSECRET}`
            });
    } else {
        headers = new Headers(
            {
                'Content-Type': 'application/json',
            });
    }

    const fetcher = (headers) => (...args) => fetch(...args, {
        headers: headers,
        method: 'GET',
    }).then(
        res => res.json()
    ).then(
        // decode from base64
        res => Buffer.from(res.content, 'base64').toString()
    )

    useEffect(() => {
        setBuiltURL(`https://api.github.com/repos/${props.instGitUser}/${props.instGitRepo}/contents/config.yml`)
        if (props.instGitUser && props.instGitRepo) {
            setShouldFetch(true)
        }
    }, [props.instGitUser, props.instGitRepo])

    const { data: config, isLoading, error } = useSWR(shouldFetch ? builtURL : null, fetcher(headers),
        { revalidateOnFocus: false, revalidateOnReconnect: false, revalidateIfStale: false })

    useEffect(() => {
        if (config) {
            setParsedYAML(jsyaml.load(config))
        }
    }, [config])

    function formatDate(date, utcOffsetHrs) {
        const baseTzOffset = utcOffsetHrs * 60;
        const tzOffset = date.getTimezoneOffset();
        const d = new Date(date.valueOf() + (baseTzOffset + tzOffset) * 60 * 1000);
        return format(d, 'MMMM do, yyyy');
    }

    useEffect(() => {
        if (parsedYAML) {
            console.log(parsedYAML)
            setSessions(parsedYAML.sessions)
            props.setGitUser(parsedYAML.workshopsuser)
            props.setGitRepo(parsedYAML.workshopsrepo)
            if (parsedYAML.datestart && parsedYAML.enddate) {
                const cleanDateStart = formatDate(new Date(parsedYAML.datestart), 0)
                const cleanDateEnd = formatDate(new Date(parsedYAML.enddate), 0)
                // if the dates are the same, just show one
                if (cleanDateStart === cleanDateEnd) {
                    setDate(cleanDateStart)
                } else {
                    setDate(`${cleanDateStart} - ${cleanDateEnd}`)
                }
            }
        }
    }, [parsedYAML])

    const about = (
        <>
            <div>
                {parsedYAML && parsedYAML.organizers &&
                parsedYAML.organizers.some(organizer => organizer.name !== '') &&
                    <>
                        <h3>Organizers</h3>
                        <ul>
                            {parsedYAML.organizers.map((organizer) => {
                                if (organizer.name !== '') {
                                    if (organizer.email) {
                                        return <li key={`org-${organizer.name}`}>{organizer.name} - <a href={`mailto:${organizer.email}`}>{organizer.email}</a></li>
                                    }
                                    else {
                                    return <li key={`org-${organizer.name}`}>{organizer.name}</li>
                                    }
                                }
                            })}
                        </ul>
                    </>
                }
                {parsedYAML && parsedYAML.sponsors &&
                parsedYAML.sponsors.some(sponsor => sponsor.name !== '') &&
                    <>
                        <h3>Sponsors</h3>
                        <ul>
                            {parsedYAML.sponsors.map((sponsor) => {
                                if (sponsor.name !== '') {
                                    return <React.Fragment key={`sponsor-${sponsor.name}`}>
                                        <li><a href={sponsor.link}>{sponsor.name}</a></li>
                                        {sponsor.notes && <p>{sponsor.notes}</p>}
                                    </React.Fragment>
                                }
                            })}
                        </ul>
                    </>
                }
                {parsedYAML && parsedYAML.location &&
                    <>
                        <h3>Location</h3>
                        <p>{parsedYAML.location}</p>
                    </>
                }
                {parsedYAML && parsedYAML.contact && 
                parsedYAML.contact.some(contact => contact.name !== '') &&
                    <>
                        <h3>Contacts</h3>
                        {parsedYAML.contact.map((contact, index) => {
                            console.log(contact)
                            if (contact.name !== '') {
                                return <>
                                    <h4>{contact.name}</h4>
                                    {contact.email && <p>Email: <a href={`mailto ${contact.email}`}>{contact.email}</a></p>}
                                </>
                            }
                        }
                        )}
                    </>
                }
                {parsedYAML && parsedYAML.datestart && parsedYAML.enddate &&
                    <>
                        <h3>Dates</h3>
                        <p>{date}</p>
                    </>
                }
                {parsedYAML && parsedYAML.venue &&
                <>
                    <h3>Venue</h3>
                    <p>{parsedYAML.venue}</p>
                </>
                }

                {parsedYAML && parsedYAML.longDescription &&
                    <>
                        <h3>Description</h3>
                        <p>{parsedYAML.longDescription}</p>
                    </>
                }
            </div>
        </>
    )

    const aboutAccordion = (
        <div className="accordion">
            <Accordion className="inst-accordion">
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="inst-accordion-summary"
                    expandIcon={<ExpandMore />}
                >
                    <h2 className="inst-accordion-title">Details</h2>
                </AccordionSummary>
                <AccordionDetails className="inst-accordion-details">
                    {about}
                </AccordionDetails>
            </Accordion>
        </div>
    )

    const inst = (
        <>
            <div className="inst-description">
                {parsedYAML && <p>{parsedYAML.description}</p>}
                {parsedYAML && (parsedYAML.registerlink || parsedYAML.registerLink) && (
                    <Link
                        href={parsedYAML.registerlink || parsedYAML.registerLink}
                        className="button button-bark"
                    >
                        {parsedYAML.registertext || parsedYAML.registerText || 'Register'}
                    </Link>
                )}
            </div>
            {parsedYAML && (parsedYAML.DHRIFTfrontpage === false || !parsedYAML.DHRIFTfrontpage) && aboutAccordion}
            {sessions && parsedYAML && parsedYAML.showSchedule !== false &&
                sessions.some(session => session.title !== '') && (
                <div className="schedule">
                    <Schedule schedule={sessions} {...props} />
                </div>
            )}
            {parsedYAML && (parsedYAML.showWorkshops !== false) && (
                <div className="inst-workshops">
                    <h1>Workshops</h1>
                    <WorkshopsView
                        gitUser={props.gitUser}
                        gitRepo={props.gitRepo}
                        instUser={props.instGitUser}
                        instRepo={props.instGitRepo}
                    />
                </div>
            )}
        </>
    )


    const instContainer = (
        <Fade in={Boolean(parsedYAML)}>
            <div className="inst-container">
                <Head>
                    <title>{parsedYAML?.event || 'DHRIFT'}</title>
                </Head>

                <div className="inst">
                    <div
                        className="inst-hero"
                        style={{ backgroundImage: `url(${heroImage.src})` }}
                    >
                        <div className="inst-hero-text">
                            <div>
                                {parsedYAML && <h1>{parsedYAML.event}</h1>}
                                {parsedYAML?.datestart && parsedYAML?.enddate && (
                                    <h2>{date}</h2>
                                )}
                                {parsedYAML?.venue && <p>{parsedYAML.venue}</p>}
                            </div>
                            {parsedYAML?.herodescription && (
                                <div className="inst-hero-description">
                                    <p>{parsedYAML.herodescription}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    {inst}
                </div>
            </div>
        </Fade>
    )

    return (
        <>
            <Header title={parsedYAML && parsedYAML.event} instUser={props.instGitUser} instRepo={props.instGitRepo}
                gitUser={props.gitUser} gitRepo={props.gitRepo}
            />
            {instContainer}
        </>
    )
}