import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function Workshop({ workshop, index }) {

  return (
    <Card key={index}
      className='menu-card'>
      <Link href={`/workshops/${workshop.slug}`} passHref>
        <CardContent className='card-content'>
          <h1 className='overlay'>{workshop.title}</h1>
          <div className='workshop-info'>
            <ul className='objectives'>
              {workshop['learning objectives'] && workshop['learning objectives'].map((objective, index) => {
                if (typeof (objective) === 'object') return null
                if (index > 1) return null
                return (
                  <li key={index} className='objective'>
                    {objective}
                  </li>
                )
              })}
            </ul>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
