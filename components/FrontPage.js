import Link from 'next/link'
import Masonry from '@mui/lab/Masonry';
import ConvertMarkdown from './ConvertMarkdown'

export default function FrontPage(currentFile, allFiles) {
  const excerpt = currentFile.excerpt
  const title = currentFile.title
  const dependencies = currentFile.dependencies || []
  const workshops = allFiles.workshops
  const installGuides = allFiles.guides
  const insights = allFiles.insights
  const authors = allFiles.authors


  const formattedDependencies = Object.keys(dependencies).map(key => {
    const items = dependencies[key]
    const addLinktoItems = Object.keys(items).map(key => {
      const item = items[key]
      // check if item is in workshops or insights or installGuides or authors
      const workshop = workshops.find(workshop => workshop.slug === key)
      const insight = insights.find(insight => insight.slug === key)
      const guide = installGuides.find(guide => guide.slug === key)
      // const author = authors.find(author => author.slug === key)
      const which = workshop ? workshop : ((insight ? insight : (guide ? guide : (author ? author : null))))

      const allItems = {
        [key]: {
          title: which.title,
          excerpt: item.excerpt,
          required: item.required,
          recommended: item.recommended,
          link: which ? `/${which.itemPath}` : '#'
        }
      }
      return {
        title: which.title,
        allItems
      }
    })
    return {
      title: key,
      items: addLinktoItems
    }
  })
  
  const formedDeps = formattedDependencies.map(dep => {
    return (
      <div className='frontpage-item dependency' key={dep.title}>
        <h2>{dep.title}</h2>
        <ul>
          {dep.items.map(item => {
            const workshopObject = item.allItems[Object.keys(item.allItems)[0]]
            // convert workshopObject.excerpt to html 
            const workshopHtmlExcerpt = ConvertMarkdown(workshopObject.excerpt)
            const required = workshopObject.required
            const recommended = workshopObject.recommended
            const requiredOrRecommended = required ? 'required' : recommended ? 'recommended' : ''
            return (
              <li key={workshopObject} className={requiredOrRecommended}>
                <Link href={workshopObject.link}>{item.title}</Link>
                <p>{workshopHtmlExcerpt}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  })

  // all objects in currentFile
  const allObjects = Object.keys(currentFile).map(key => {
    const item = currentFile[key]
    // if object name is 'dependencies' or 'workshops' or 'insights' or 'installations' or 'excerpt' or 'title' or 'cover_image', don't add to list
    if (key === 'dependencies' || key === 'workshops' || key === 'insights' || key === 'installations' || key === 'excerpt' || key === 'title' || key === 'cover_image' || key === 'content' || key === 'slug'
      || key === 'path' || key === 'itemPath') {
      return null
    }
    return {
      title: key,
      items: item
    }
  })

  const formattedObjects = allObjects.
    filter(item => item !== null).map(obj => {

      return (
        <div className="frontpage-item" key={obj.title}>
          <h2>{obj.title}</h2>
          <ul>
            {obj.items && Object.keys(obj.items).map(key => {
              const item = obj.items[key]
              // if there's a description, show it
              if (key === 'description') {
                const description = ConvertMarkdown(item)
                return (
                  <li key={key}>
                    <p>{description}</p>
                  </li>
                )
                }
              if (obj.title === 'authors') {
                const author = authors.find(author => author.title === item)
                let authorPath = `/authors/${author.slug}`
                let authorStatus = key.charAt(0).toUpperCase() + key.slice(1)
                return (
                  <li key={key} className='authors-list'>
                    <Link href={authorPath}>{item}</Link>
                    <li>{authorStatus}</li>
                  </li>
                )
              }
              if (obj.title === 'editors') {
                const editor = authors.find(author => author.title === item)
                let editorPath = `/authors/${editor.slug}`
                let editorStatus = key.charAt(0).toUpperCase() + key.slice(1)
                return (
                  <li key={key} className='authors-list'>
                    <Link href={editorPath}>{item}</Link>
                    <li>{editorStatus}</li>
                  </li>
                )
              }
              if (typeof item === 'string') {
                const itemHtml = ConvertMarkdown(item)
                return (
                  <li key={key} className='frontpage-list'>
                    {itemHtml}
                  </li>
                )
              }
              if (typeof item === 'object') {
                if (item.link) {
                  const itemHtml = ConvertMarkdown(item.excerpt)
                  return (
                    <li key={key}>
                      <a href={item.link}>{key}</a>
                      {<p>{itemHtml}</p>}
                    </li>
                  )
                }
                if (item.excerpt) {
                  const itemHtml = ConvertMarkdown(item.excerpt)
                  return (
                    <li key={key} className='authors-list'>
                      {key}
                      <p>{itemHtml}</p>
                    </li>
                  )
                }
                return (
                  <div>
                    {Object.keys(item).map(key => {
                      const term = ConvertMarkdown(item[key])
                      return (
                        <p key={key} className='frontpage-list'>{term}</p>
                      )})}
                  </div>
                )
              }
            })}
          </ul>
        </div>
      )
    })
  // check if formattedObjects or formattedDeps is empty, if so, return null
  const formatted = formattedObjects.length === 0 && formedDeps.length === 0 ? true : false

  return (
    <div className="frontpage">
      <h1>{title}</h1>
      {excerpt && <div className="excerpt">
        <p>{excerpt}</p></div>}
      {!formatted && <Masonry columns={{ sm: 1, md: 2 }} spacing={2}>
        {formedDeps}
        {/* {formedAuthor} */}
        {formattedObjects}
      </Masonry>}
    </div>
  )
}

