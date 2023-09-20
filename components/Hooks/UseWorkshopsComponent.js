import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import useSWRImmutable from "swr/immutable";
import { useState, useEffect } from "react";
import matter from "gray-matter";

export default function UseWorkshopComponent(workshop) {
    const [parsedWorkshop, setParsedWorkshop] = useState(null);

    let builtURL;
    // remove '?ref=main' from the end of the url
    builtURL = workshop.workshop.url.split('?')[0]

    let headers;
    if (process.env.NEXT_PUBLIC_GITHUBSECRET === 'true') {
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
    const { data, isLoading, error } = useSWRImmutable(builtURL, fetcher(headers),
        {
            onSuccess(data) {
                // console.log('data returned')
            },
            onFailure(err) {
                console.log('err', err)
                console.log('workshop.url', builtURL)
            }
        })
    useEffect(() => {
        if (data) {
            setParsedWorkshop(matter(data))
        }
    }, [data])

    console.log('parsedWorkshop', parsedWorkshop)
    return (
        <div>

            {parsedWorkshop &&
                <Box
                    sx={{
                        minWidth: 275,
                    }}>
                    <Card>
                        <CardContent>
                            <h2>{parsedWorkshop.data.title}</h2>
                            <div>{parsedWorkshop.data.description.length > 200 ? parsedWorkshop.data.description.substring(0, 200) + '...' : parsedWorkshop.data.description}</div>
                        </CardContent>
                        <CardActions>
                            <Button size="small"><a href={parsedWorkshop.data.url}>View Workshop</a></Button>
                        </CardActions>
                    </Card>
                </Box>
            }
        </div>
    )
}
