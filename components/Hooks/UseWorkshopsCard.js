import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import { CardContent } from '@mui/material';
import { CardMedia } from '@mui/material';
import useSWRImmutable from "swr/immutable";
import { useState, useEffect } from "react";
import matter from "gray-matter";

export default function UseWorkshopCard({ workshop, gitUser, gitRepo, instUser, instRepo, totalWorkshops }) {

    const [parsedWorkshop, setParsedWorkshop] = useState(null);

    let builtURL;
    // remove '?ref=main' from the end of the url
    builtURL = workshop.url.split('?')[0]

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
            try {
                var parsedData = matter(data)
                setParsedWorkshop(matter(data))
            }
            catch (err) {
                console.log('err', err)
                console.log('data', data)
            }
        }
    }, [data])

    const [src, setSrc] = useState(imageBuiltURL);
    var coverimage = parsedWorkshop?.data?.coverimage;
    var imageBuiltURL;
    if (coverimage) {
        imageBuiltURL = `https://raw.githubusercontent.com/${gitUser}/${gitRepo}/main/${coverimage}`
    }
    const randomNumberBetween1and7 = Math.floor(Math.random() * 7) + 1;
    useEffect(() => {
        if (coverimage) {
            setSrc(imageBuiltURL)
        }
        else {
            setSrc("/images/img" + randomNumberBetween1and7 + ".jpg")
        }
    }, [coverimage])

    const workshopLink = './dynamic?user=' + gitUser + '&repo=' + gitRepo + '&file=' + workshop.name.split('.')[0] + '&instUser=' + instUser + '&instRepo=' + instRepo;

    if(parsedWorkshop?.data?.published === false){
        console.log('not published', parsedWorkshop.data.title)
        return null;
    }
    return (
        <>
            {parsedWorkshop && parsedWorkshop.data.title && parsedWorkshop.data.description && (parsedWorkshop.data.published === 'true' || !parsedWorkshop.data.published) &&
                <div
                style={{
                    maxWidth: '100vw',
                }}
                >
                    <Card 
                                    style={{
                                        maxWidth: '100vw',
                                    }}
                    className='workshop-card'>
                        <CardActionArea 
                        style={{
                            height: '450px',
                            maxWidth: '100vw',
                        }}
                        href={workshopLink}>
                            <div
                            className='stylized-image-container'>
                            <CardMedia
                                component="img"
                                height="240"
                                image={src}
                                alt={parsedWorkshop.data['cover title'] || parsedWorkshop.data.title}
                            />
                            </div>
                            <CardContent
                                style={{
                                    padding: '0px',
                                    paddingTop: '10px',
                                }}
                            ><p className='centered'>{parsedWorkshop.data['cover title'] || parsedWorkshop.data.title}</p>
                                <h3>{parsedWorkshop.data.title}</h3>
                                <p
                                className='description'
                                >{parsedWorkshop?.data?.description?.length > 200 ? parsedWorkshop.data.description.substring(0, 200) + '...' : parsedWorkshop.data.description}</p>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            }
        </>
    )
}
