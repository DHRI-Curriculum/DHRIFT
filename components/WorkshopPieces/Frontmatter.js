import ConvertMarkdown from './ConvertMarkdown';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useMemo } from 'react';
import { colorPalettes, getThemeKey } from '../../utils/theme';

// Random number between min and max
const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max));
const pick = (arr) => arr[randInt(0, arr.length)];

export default function Frontmatter({
  currentFile,
  setCurrentPage,
  secondPageLink,
}) {
  const data = currentFile?.data || {};
  const title = data.title;
  const coverTitle = data['cover title'];
  const description = data.description;
  const authors = data.authors || [];
  const editors = data.editors || [];
  const instructors = data.instructors || [];
  const estimatedTime = data['estimated time'];
  const learningObjectives = data['learning objectives'] || [];
  const prerequisites = data.prerequisites || {};
  const readings = data.readings || [];
  const ethicalConsiderations = data['ethical considerations'] || [];
  const projects = data.projects || {};
  const resources = data.resources || {};
  const goals = data.goals || [];
  const theme = data.theme || 'teal'; // Workshop authors set theme in frontmatter

  const hasCredits = authors.length > 0 || editors.length > 0 || instructors.length > 0;

  const handleStartClick = () => {
    if (setCurrentPage) setCurrentPage(2);
  };

  // Helper to render markdown content
  const renderMarkdown = (content) => {
    if (!content) return null;
    return ConvertMarkdown({ content });
  };

  // Render a simple list of strings
  const renderStringList = (items) => {
    if (!items || items.length === 0) return null;
    return (
      <ul className="fm-list">
        {items.map((item, i) => {
          if (typeof item === 'string') {
            return <li key={`item-${item.slice(0, 30)}-${i}`}>{renderMarkdown(item)}</li>;
          }
          // Handle objects with just description (like goals)
          if (item?.description) {
            return <li key={`desc-${item.description.slice(0, 30)}-${i}`} className="fm-list-header">{renderMarkdown(item.description)}</li>;
          }
          return null;
        })}
      </ul>
    );
  };

  // Render prerequisites - handles both arrays and objects
  const renderPrerequisites = () => {
    // Handle arrays
    if (Array.isArray(prerequisites)) {
      if (prerequisites.length === 0) return null;
      return (
        <div className="fm-prereq-grid">
          {prerequisites.map((prereq, i) => {
            // String item
            if (typeof prereq === 'string') {
              return (
                <div key={`prereq-${prereq.slice(0, 30)}-${i}`} className="fm-prereq-card">
                  <p className="fm-prereq-desc">{renderMarkdown(prereq)}</p>
                </div>
              );
            }
            // Object item
            const title = prereq?.name || prereq?.title || `Prerequisite ${i + 1}`;
            const isRequired = prereq?.required;
            const isRecommended = prereq?.recommended;
            return (
              <div key={`prereq-${title}-${i}`} className={`fm-prereq-card ${isRequired ? 'required' : ''} ${isRecommended ? 'recommended' : ''}`}>
                <div className="fm-prereq-header">
                  <h4>{title}</h4>
                  {isRequired && <span className="fm-badge fm-badge-required">Required</span>}
                  {isRecommended && <span className="fm-badge fm-badge-recommended">Recommended</span>}
                </div>
                {prereq?.description && (
                  <p className="fm-prereq-desc">{renderMarkdown(prereq.description)}</p>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    // Handle objects (keyed by name)
    const prereqKeys = Object.keys(prerequisites);
    if (prereqKeys.length === 0) return null;

    return (
      <div className="fm-prereq-grid">
        {prereqKeys.map((key) => {
          const prereq = prerequisites[key];
          // String value
          if (typeof prereq === 'string') {
            return (
              <div key={key} className="fm-prereq-card">
                <div className="fm-prereq-header">
                  <h4>{key}</h4>
                </div>
                <p className="fm-prereq-desc">{renderMarkdown(prereq)}</p>
              </div>
            );
          }
          const isRequired = prereq?.required;
          const isRecommended = prereq?.recommended;
          return (
            <div key={key} className={`fm-prereq-card ${isRequired ? 'required' : ''} ${isRecommended ? 'recommended' : ''}`}>
              <div className="fm-prereq-header">
                <h4>{key}</h4>
                {isRequired && <span className="fm-badge fm-badge-required">Required</span>}
                {isRecommended && <span className="fm-badge fm-badge-recommended">Recommended</span>}
              </div>
              {prereq?.description && (
                <p className="fm-prereq-desc">{renderMarkdown(prereq.description)}</p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Render projects/resources - handles both arrays and objects
  const renderLinkedItems = (items) => {
    if (!items) return null;

    // Handle arrays
    if (Array.isArray(items)) {
      if (items.length === 0) return null;
      return (
        <div className="fm-linked-grid">
          {items.map((item, i) => {
            // String item
            if (typeof item === 'string') {
              return (
                <div key={`linked-${item.slice(0, 30)}-${i}`} className="fm-linked-card">
                  <p>{renderMarkdown(item)}</p>
                </div>
              );
            }
            // Object item with name/title, description, link
            const title = item?.name || item?.title || `Item ${i + 1}`;
            return (
              <div key={`linked-${title}-${i}`} className="fm-linked-card">
                <h4>
                  {item?.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer">{title}</a>
                  ) : title}
                </h4>
                {item?.description && (
                  <p>{renderMarkdown(item.description)}</p>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    // Handle objects (keyed by name)
    const keys = Object.keys(items);
    if (keys.length === 0) return null;

    return (
      <div className="fm-linked-grid">
        {keys.map((key) => {
          const item = items[key];
          // Item could be a string or object
          if (typeof item === 'string') {
            return (
              <div key={key} className="fm-linked-card">
                <h4>{key}</h4>
                <p>{renderMarkdown(item)}</p>
              </div>
            );
          }
          return (
            <div key={key} className="fm-linked-card">
              <h4>
                {item?.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">{key}</a>
                ) : key}
              </h4>
              {item?.description && (
                <p>{renderMarkdown(item.description)}</p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Generate random visual properties (fresh on each render)
  const generativeStyles = useMemo(() => {
    const themeKey = getThemeKey(theme);
    const palette = colorPalettes[themeKey];

    return {
      '--fm-primary': pick(palette.primary),
      '--fm-primary-2': pick(palette.primary),
      '--fm-accent': pick(palette.accent),
      '--fm-dark': pick(palette.dark),
      '--fm-gradient-angle': `${randInt(100, 170)}deg`,
      '--fm-pattern-rotation': `${randInt(-15, 15)}deg`,
      '--fm-pattern-scale': rand(0.8, 1.4),
      '--fm-glow-x': `${randInt(10, 90)}%`,
      '--fm-glow-y': `${randInt(10, 60)}%`,
      '--fm-glow-size': `${randInt(20, 45)}%`,
      '--fm-glow2-x': `${randInt(20, 80)}%`,
      '--fm-glow2-y': `${randInt(40, 90)}%`,
      '--fm-glow2-size': `${randInt(15, 35)}%`,
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps = generate once on mount

  const themeKey = getThemeKey(theme);
  const patternType = useMemo(() => randInt(0, 4), []);

  return (
    <div className="fm">
      {/* Hero */}
      <section className={`fm-hero fm-hero--${themeKey}`} style={generativeStyles}>
        <div className="fm-hero-glow" />
        <div className="fm-hero-glow fm-hero-glow--secondary" />
        <div className={`fm-hero-pattern fm-hero-pattern--${patternType}`} />
        <div className="fm-hero-content">
          <h1 className="fm-title">{coverTitle || title}</h1>
          {description && <p className="fm-description">{description}</p>}
          <Link href={secondPageLink || '#'} onClick={handleStartClick} className="fm-cta">
            Start Workshop <ArrowForwardIcon />
          </Link>
        </div>
      </section>

      {/* Credits */}
      {hasCredits && (
        <section className="fm-credits">
          {authors.length > 0 && (
            <div className="fm-credit-group">
              <span className="fm-credit-label">Authors</span>
              <span className="fm-credit-names">{authors.join(', ')}</span>
            </div>
          )}
          {instructors.length > 0 && (
            <div className="fm-credit-group">
              <span className="fm-credit-label">Instructors</span>
              <span className="fm-credit-names">{instructors.join(', ')}</span>
            </div>
          )}
          {editors.length > 0 && (
            <div className="fm-credit-group">
              <span className="fm-credit-label">Editors</span>
              <span className="fm-credit-names">{editors.join(', ')}</span>
            </div>
          )}
          {estimatedTime && (
            <div className="fm-credit-group">
              <span className="fm-credit-label">Time</span>
              <span className="fm-credit-names">{Array.isArray(estimatedTime) ? estimatedTime.join(', ') : estimatedTime}</span>
            </div>
          )}
        </section>
      )}

      {/* Body */}
      <div className="fm-body">
        {/* Prerequisites */}
        {(Array.isArray(prerequisites) ? prerequisites.length > 0 : Object.keys(prerequisites).length > 0) && (
          <section className="fm-section">
            <h2 className="fm-section-title">Prerequisites</h2>
            {renderPrerequisites()}
          </section>
        )}

        {/* Learning Objectives or Goals */}
        {(learningObjectives.length > 0 || goals.length > 0) && (
          <section className="fm-section">
            <h2 className="fm-section-title">
              {learningObjectives.length > 0 ? 'Learning Objectives' : 'Goals'}
            </h2>
            {renderStringList(learningObjectives.length > 0 ? learningObjectives : goals)}
          </section>
        )}

        {/* Readings */}
        {readings.length > 0 && (
          <section className="fm-section">
            <h2 className="fm-section-title">Readings</h2>
            {renderStringList(readings)}
          </section>
        )}

        {/* Ethical Considerations */}
        {ethicalConsiderations.length > 0 && (
          <section className="fm-section">
            <h2 className="fm-section-title">Ethical Considerations</h2>
            {renderStringList(ethicalConsiderations)}
          </section>
        )}

        {/* Projects */}
        {(Array.isArray(projects) ? projects.length > 0 : Object.keys(projects).length > 0) && (
          <section className="fm-section">
            <h2 className="fm-section-title">Projects</h2>
            {renderLinkedItems(projects)}
          </section>
        )}

        {/* Resources */}
        {(Array.isArray(resources) ? resources.length > 0 : Object.keys(resources).length > 0) && (
          <section className="fm-section">
            <h2 className="fm-section-title">Resources</h2>
            {renderLinkedItems(resources)}
          </section>
        )}

        {/* Bottom CTA */}
        <section className="fm-bottom-cta">
          <Link href={secondPageLink || '#'} onClick={handleStartClick} className="fm-cta fm-cta-large">
            Start Workshop <ArrowForwardIcon />
          </Link>
        </section>
      </div>
    </div>
  );
}
