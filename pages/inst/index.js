import { useEffect, useState } from 'react'
import useSWR from 'swr'
import jsyaml from 'js-yaml'
import WorkshopsView from '../../components/WorkshopsView';
import Schedule from '../../components/Schedule';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import heroImage from '../../public/images/learn.jpg';
import Header from '../../components/Header';
import Head from 'next/head';
const { format } = require("date-fns");
import { Fade } from '@mui/material';

export default function Institute(props) {

    props.setWorkshopMode(false)
    const [builtURL, setBuiltURL] = useState(null);
    const [parsedYAML, setParsedYAML] = useState(null);
    const [sessions, setSessions] = useState(null);
    const [shouldFetch, setShouldFetch] = useState(false);
    const [date, setDate] = useState(null);

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
                // var dateStart = parse(parsedYAML.datestart)
                // var dateEnd = parse(parsedYAML.enddate)
                // make the dates look nice, long month names, etc
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

    return (
        <>
            <Header title={parsedYAML && parsedYAML.event} instUser={props.instGitUser} instRepo={props.instGitRepo}
                gitUser={props.gitUser} gitRepo={props.gitRepo}
            />
            <Fade in={parsedYAML && parsedYAML.event} timeout={500}>
                <Container
                    disableGutters={true}
                    maxWidth={'md'}
                    sx={{
                        display: 'flex',
                        marginLeft: {
                            md: '0px',
                        },
                    }}
                >
                    <Head>
                        <title>{parsedYAML && parsedYAML.event}</title>
                    </Head>

                    <div className="inst">
                        {
                            <>
                                <div className='inst-hero'
                                    style={{
                                        height: '600px',
                                        width: '100vw',
                                        position: 'relative',
                                        backgroundSize: 'cover',
                                        backgroundPosition: '50% 50%',
                                        backgroundImage: `url(${heroImage.src})`,
                                        // paddingLeft: '100px',
                                    }}>
                                    <div className='inst-hero-overlay'>
                                        <div> {
                                            parsedYAML && <h1>{parsedYAML.event}</h1>
                                        }
                                            {
                                                parsedYAML && parsedYAML.datestart && parsedYAML.enddate &&
                                                <h2>{date}</h2>
                                            }
                                            {

                                                parsedYAML && <p>{parsedYAML.venue}</p>
                                            }

                                        </div>
                                        <div>

                                            {
                                                parsedYAML && <div className='inst-hero-description'>
                                                    <p>{parsedYAML.herodescription}</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='inst-description'>
                                    {parsedYAML && <p>{parsedYAML.description}</p>}
                                    {
                                        parsedYAML && parsedYAML.registerlink &&
                                        // <a href={parsedYAML.registerlink}>Register</a>
                                        <p><Button
                                            className='button button-bark'
                                            href={parsedYAML.registerlink}
                                        >{
                                                parsedYAML && parsedYAML.registertext ? parsedYAML.registertext : 'Register'}
                                        </Button></p>
                                    }
                                </div>
                            </>
                        }
                        <div className='schedule'>
                            {sessions &&
                                <Schedule schedule={sessions}
                                    {...props}
                                />}
                        </div>
                        <div className='inst-workshops'>
                            <h1>Workshops</h1>
                            {parsedYAML &&
                                <WorkshopsView gitUser={props.gitUser} gitRepo={props.gitRepo} instUser={props.instGitUser} instRepo={props.instGitRepo} />
                            }
                        </div>
                    </div>
                </Container>
            </Fade>
        </>
    )
}