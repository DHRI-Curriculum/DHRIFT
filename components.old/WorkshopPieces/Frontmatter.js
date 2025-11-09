import ConvertMarkdown from './ConvertMarkdown';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import FrontmatterFeature from './FrontmatterFeature';
import Link from 'next/link';

export default function Frontmatter(currentFile, setCurrentPage, setCurrentContent, pages, instUser, instRepo, workshopTitle, pageTitles, currentPage, router,
  secondPageLink
) {

  const description = currentFile.data.description
  const title = currentFile.data.title
  const prerequisites = currentFile.data.prerequisites || []

  const formattedDependencies = Object.keys(prerequisites).map(key => {
    const items = prerequisites[key]
    const addLinktoItems = Object.keys(items).map(key => {
      const item = items[key]
      const allItems = {
        title: key,
        description: item.description,
        required: item.required,
        recommended: item.recommended,
        // link: which ? `/${which.itemPath}` : '#'
      }
      return allItems
    })
    return addLinktoItems[0]
  })

  const formedDeps =
    formattedDependencies.map(dep => {
      const workshopObject = dep
      const workshopHtmldescription = ConvertMarkdown({ content: workshopObject.description })
      const required = workshopObject.required
      const recommended = workshopObject.recommended
      const requiredOrRecommended = required ? 'required' : recommended ? 'recommended' : ''
      return (
        <div className='frontmatter-item dependency' key={dep.title}>
          <h3>{dep.title}</h3>
          <p className={requiredOrRecommended}>
            {/* <Link href={workshopObject.link}>{item.title}</Link> */}
            <p>{workshopHtmldescription}</p>
          </p>
        </div>
      )
    })

  // all objects in currentFile
  const allObjects = Object.keys(currentFile.data).map(key => {
    const item = currentFile.data[key]
    const excludedKeys = ['prerequisites', 'workshops', 'insights', 'installations', 'description',
      'title', 'cover_image', 'content', 'slug', 'path', 'itemPath', 'programming_language',
      'cover title', 'authors', 'editors', 'instructors', 'long_pages']
    if (excludedKeys.includes(key)) { return null }
    return {
      title: key,
      items: item
    }
  })

  const formattedObjects = allObjects.
    filter(item => item !== null).map(obj => {
      if (typeof obj.items === 'string') {
        const itemHtml = ConvertMarkdown({ content: obj.items })
        return (
          <div key={obj.title} className='frontmatter-item'>
            <h3>{obj.title}</h3>
            <p>{itemHtml}</p>
          </div>
        )
      }
      return (
        <div className="frontmatter-item" key={obj.title}>
          <h3>{obj.title.charAt(0).toUpperCase() + obj.title.slice(1)}</h3>
          <ul>
            {obj.items && Object.keys(obj.items).map(key => {
              const item = obj.items[key]
              // console.log(item)
              // if there's a description, show it
              if (key === 'description') {
                const description = ConvertMarkdown({content: item})
                return (
                  <li key={key}>
                    <p>{description}</p>
                  </li>
                )
              }
              if (key === 'projects') {
                // console.log(item)
              }
              if (typeof item === 'string') {
                const itemHtml = ConvertMarkdown({content: item})
                return (
                  <li key={key} className='frontmatter-list'>
                    {itemHtml}
                  </li>
                )
              }
              if (typeof item === 'object' && item !== null) {
                if (item?.link || item['workshop prerequisites']) {
                  const itemHtml = ConvertMarkdown({content: item.description})
                  return (
                    <li key={key}>
                      <a href={item.link}>{key}</a>
                      {<p>{itemHtml}</p>}
                    </li>
                  )
                }
                if (item?.description) {
                  const itemHtml = ConvertMarkdown({content: item.description})
                  return (
                    <p key={key} >{itemHtml}</p>
                  )
                }
                try {
                  return (
                    <div key={key}>
                      {Object.keys(item).map(key => {
                        // console.log(key)
                        const term = ConvertMarkdown({content: item[key].description})
                        return (
                          <div key={key}>
                            <h3><a href={item[key].link}>{key}</a></h3>
                            <p key={key} className='frontmatter-list'>{term}</p>
                          </div>
                        )
                      })}
                    </div>
                  )
                } catch (error) {
                  console.log(error)
                }
              }
            })}
          </ul>
        </div>
      )
    })

  // check if formattedObjects or formattedDeps is empty, if so, return null
  const route = instRepo && instUser ? `/inst/?instUser=${instUser}&instRepo=${instRepo}` : '/'
  return (
    <div className="frontmatter">
      <div className="frontmatter-hero">
        {/* <div className='frontmatter-hero-breadcrumbs'>
          <Breadcrumbs>
            <Link href={route}>
              <HomeIcon
                sx={{
                  color: 'white',
                  zIndex: 1000,
                  position: 'relative',
                  marginTop: '32px',
                }}
                className='home-icon' />
            </Link>
            {workshopTitle &&
              <p className='crumb'>{workshopTitle}</p>}
          </Breadcrumbs>
        </div> */}
        <h1>{title}</h1>
        {description &&
          <>
            <p className='description'>{description}</p><br />
            <Link href={secondPageLink}
              onClick={() => {
                setCurrentPage(2);
              }}>
              <Button className='button button-white'>
                Start the Workshop
              </Button>
            </Link>
          </>
        }
      </div>
      {formedDeps.length > 0 && <div className="frontmatter-item dependencies">
        <h2>Prerequisites</h2>
        <ul>
          {formedDeps}
        </ul>
      </div>}
      {formattedObjects.length > 0 && <div className="frontmatter-item">
        <ul>
          {formattedObjects}
        </ul>
      </div>}
      <Button className='button button-bark'>
        <Link href={secondPageLink}
          onClick={() => {
            setCurrentPage(2);
          }}>
          Start the Workshop
        </Link>
      </Button>
      <FrontmatterFeature
        authors={currentFile.data.authors}
        instructors={currentFile.data.instructors}
        editors={currentFile.data.editors}
        title={workshopTitle}
        coverTitle={currentFile.data['cover title']}
      />
    </div>
  )
}