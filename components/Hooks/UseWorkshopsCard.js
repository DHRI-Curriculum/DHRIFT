import Card from '@mui/material/Card';
import { CardActionArea, CardContent, CardMedia } from '@mui/material';
import useSWRImmutable from "swr/immutable";
import { useState, useEffect } from "react";
import matter from "gray-matter";
import TrianglifyBasic from '../Backgrounds';
import { createGitHubFetcher } from '../../utils/github';

export default function UseWorkshopCard({ workshop, gitUser, gitRepo, instUser, instRepo }) {
    const [parsedWorkshop, setParsedWorkshop] = useState(null);
    const [src, setSrc] = useState(null);

    // Remove query params from URL
    const builtURL = workshop.url.split('?')[0];

    const fetcher = createGitHubFetcher({ decodeBase64: true });
    const { data } = useSWRImmutable(builtURL, fetcher);

    useEffect(() => {
        if (data) {
            try {
                setParsedWorkshop(matter(data));
            } catch (err) {
                // Silently fail - card just won't render
            }
        }
    }, [data]);

    const coverimage = parsedWorkshop?.data?.coverimage;
    const randomNum = Math.floor(Math.random() * 7) + 1;

    useEffect(() => {
        if (coverimage) {
            setSrc(`https://raw.githubusercontent.com/${gitUser}/${gitRepo}/main/${coverimage}`);
        } else {
            setSrc(`${process.env.NEXT_PUBLIC_ASSET_PREFIX || ''}/images/img${randomNum}.jpg`);
        }
    }, [coverimage, gitUser, gitRepo, randomNum]);

    const workshopLink = `./dynamic?user=${gitUser}&repo=${gitRepo}&file=${workshop.name.split('.')[0]}&instUser=${instUser}&instRepo=${instRepo}`;

    // Don't render unpublished workshops
    if (parsedWorkshop?.data?.published === false) {
        return null;
    }

    const isPublished = parsedWorkshop?.data?.published === 'true' || !parsedWorkshop?.data?.published;
    if (!parsedWorkshop?.data?.title || !parsedWorkshop?.data?.description || !isPublished) {
        return null;
    }

    const title = parsedWorkshop.data['cover title'] || parsedWorkshop.data.title;
    const description = parsedWorkshop.data.description?.length > 200
        ? parsedWorkshop.data.description.substring(0, 200) + '...'
        : parsedWorkshop.data.description;

    return (
        <Card className='workshop-card legacy-card'>
            <CardActionArea className='legacy-card-action' href={workshopLink}>
                <div>
                    <CardMedia
                        component={TrianglifyBasic}
                        alt={title}
                    />
                </div>
                <CardContent className='legacy-card-content'>
                    <p className='centered'>{title}</p>
                    <h3>{parsedWorkshop.data.title}</h3>
                    <p className='description'>{description}</p>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
