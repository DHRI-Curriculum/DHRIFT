import { useState, useEffect } from 'react';
import useSWRImmutable from 'swr/immutable';
import matter from 'gray-matter';
import Link from 'next/link';
import { createGitHubFetcher } from '../utils/github';

// Category colors based on programming language/topic
const getCategoryColor = (language) => {
  const categories = {
    python: { bg: 'var(--dhrift-teal)', text: '#1B1621', label: 'Python' },
    jupyter: { bg: 'var(--dhrift-teal)', text: '#1B1621', label: 'Jupyter' },
    r: { bg: '#4A90A4', text: '#fff', label: 'R' },
    javascript: { bg: '#F0DB4F', text: '#1B1621', label: 'JavaScript' },
    computer: { bg: 'var(--dhrift-gold)', text: '#1B1621', label: 'Command Line' },
    html: { bg: '#E44D26', text: '#fff', label: 'HTML/CSS' },
    sql: { bg: '#336791', text: '#fff', label: 'SQL' },
    git: { bg: '#F05032', text: '#fff', label: 'Git' },
    default: { bg: 'var(--dhrift-brown)', text: '#fff', label: 'Workshop' },
  };
  return categories[language?.toLowerCase()] || categories.default;
};

export default function WorkshopCard({ workshop, gitUser, gitRepo, instUser, instRepo }) {
  const [parsedWorkshop, setParsedWorkshop] = useState(null);

  // Build URL for fetching workshop content
  const builtURL = workshop?.url?.split('?')[0];

  const fetcher = createGitHubFetcher({ decodeBase64: true });
  const { data } = useSWRImmutable(builtURL, fetcher);

  useEffect(() => {
    if (data) {
      try {
        setParsedWorkshop(matter(data));
      } catch (err) {
        // Silently fail - workshop card just won't render
      }
    }
  }, [data]);

  // Don't render if not published or missing data
  if (!parsedWorkshop?.data?.title) return null;
  if (parsedWorkshop.data.published === false) return null;
  if (parsedWorkshop.data.published !== 'true' && parsedWorkshop.data.published !== undefined && parsedWorkshop.data.published !== null) {
    // Allow undefined/null (defaults to published) or explicit 'true'
    if (parsedWorkshop.data.published === false || parsedWorkshop.data.published === 'false') return null;
  }

  const { title, description, programming_language, 'cover title': coverTitle, 'estimated time': estimatedTime } = parsedWorkshop.data;
  const category = getCategoryColor(programming_language);
  const displayTitle = coverTitle || title;
  const truncatedDesc = description?.length > 180 ? description.substring(0, 180) + '...' : description;
  const timeDisplay = Array.isArray(estimatedTime) ? estimatedTime[0] : estimatedTime;

  const workshopLink = `./v2?user=${gitUser}&repo=${gitRepo}&file=${workshop.name.split('.')[0]}&branch=v2&instUser=${instUser}&instRepo=${instRepo}`;

  return (
    <Link href={workshopLink} className="workshop-card">
      <article className="workshop-card-inner">
        {/* Category accent bar */}
        <div className="workshop-card-accent" style={{ backgroundColor: category.bg }} />

        {/* Content */}
        <div className="workshop-card-content">
          {/* Category badge */}
          <div className="workshop-card-meta">
            <span
              className="workshop-card-category"
              style={{ backgroundColor: category.bg, color: category.text }}
            >
              {category.label}
            </span>
            {timeDisplay && (
              <span className="workshop-card-time">{timeDisplay}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="workshop-card-title">{displayTitle}</h3>

          {/* Description */}
          {truncatedDesc && (
            <p className="workshop-card-description">{truncatedDesc}</p>
          )}

          {/* Footer with CTA */}
          <div className="workshop-card-footer">
            <span className="workshop-card-cta">
              Start learning
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
