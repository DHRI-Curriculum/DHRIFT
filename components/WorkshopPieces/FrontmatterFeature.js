import { useEffect, useState } from 'react';


export default function FrontmatterFeature({ authors, teachers, editors, coverImage, title }) {

  const [src, setSrc] = useState(null);
  const randomNumberBetween1and7 = Math.floor(Math.random() * 7) + 1;
  useEffect(() => {
    if (coverImage) {
      setSrc(imageBuiltURL)
    }
    else {
      setSrc("/images/img" + randomNumberBetween1and7 + ".jpg")
    }
  }, [coverImage])

  return (
    <div className='frontmatter-feature'>
      <div>
        <div className='image-container'>
          <img
            src={src}
            width={500}
            alt={coverImage} />
        <p 
        className='centered'
        style={{
          top: '30%'
        }}
        >{title}</p>
        </div>

        {authors && authors.length > 0 && <div className='frontpage-feature-authors'>
          <h2>Authors</h2>
          <ul>
            {authors.map(author => {
              return (
                <li key={author}>
                  <a href={author.link}>{author}</a>
                </li>
              )
            })}
          </ul>
        </div>}
        {teachers && teachers.length > 0 && <div className='frontmatter-feature-teachers'>
          <h2>Teachers</h2>
          <ul>
            {teachers.map(teacher => {
              return (
                <li key={teacher}>
                  <a href={teacher.link}>{teacher}</a>
                </li>
              )
            })}
          </ul>
        </div>}
        {editors && editors.length > 0 && <div className='frontmatter-feature-editors'>
          <h2>Editors</h2>
          <ul>
            {editors.map(editor => {
              return (
                <li key={editor}>
                  <a href={editor.link}>{editor}</a>
                </li>
              )
            })}
          </ul>
        </div>}
      </div>
    </div>
  );
}