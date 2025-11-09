'use client'

import {
  Box,
  Typography,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import type { WorkshopFrontmatter } from '@/types/workshop'

interface FrontmatterProps {
  frontmatter: WorkshopFrontmatter
}

/**
 * Frontmatter display component
 * Shows workshop metadata in an organized, collapsible format
 */
export function Frontmatter({ frontmatter }: FrontmatterProps) {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Title and Description */}
      <Typography variant="h3" component="h1" gutterBottom>
        {frontmatter.title}
      </Typography>

      {frontmatter.description && (
        <Typography variant="body1" color="text.secondary" paragraph>
          {frontmatter.description}
        </Typography>
      )}

      {/* Quick Info */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        {frontmatter['estimated time'] && (
          <Chip
            label={`⏱️ ${frontmatter['estimated time'].join(', ')}`}
            size="small"
            variant="outlined"
          />
        )}
        {frontmatter.programming_language && (
          <Chip
            label={`💻 ${frontmatter.programming_language}`}
            size="small"
            variant="outlined"
          />
        )}
        {frontmatter.authors && frontmatter.authors.length > 0 && (
          <Chip
            label={`✍️ ${frontmatter.authors.length} author${frontmatter.authors.length > 1 ? 's' : ''}`}
            size="small"
            variant="outlined"
          />
        )}
      </Box>

      {/* Collapsible Sections */}
      {frontmatter['learning objectives'] && frontmatter['learning objectives'].length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Learning Objectives</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {frontmatter['learning objectives'].map((objective, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`• ${objective}`} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {frontmatter.prerequisites && Object.keys(frontmatter.prerequisites).length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Prerequisites</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {Object.entries(frontmatter.prerequisites).map(([key, value]) => (
                <ListItem key={key}>
                  <ListItemText
                    primary={key}
                    secondary={
                      <>
                        {value.description}
                        {value.required && (
                          <Chip label="Required" size="small" color="error" sx={{ ml: 1 }} />
                        )}
                        {value.recommended && (
                          <Chip label="Recommended" size="small" color="warning" sx={{ ml: 1 }} />
                        )}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {frontmatter.authors && frontmatter.authors.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Authors & Contributors</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              {frontmatter.authors.length > 0 && (
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2">Authors:</Typography>
                  <Typography variant="body2">{frontmatter.authors.join(', ')}</Typography>
                </Box>
              )}
              {frontmatter.editors && frontmatter.editors.length > 0 && (
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2">Editors:</Typography>
                  <Typography variant="body2">{frontmatter.editors.join(', ')}</Typography>
                </Box>
              )}
              {frontmatter.instructors && frontmatter.instructors.length > 0 && (
                <Box>
                  <Typography variant="subtitle2">Instructors:</Typography>
                  <Typography variant="body2">{frontmatter.instructors.join(', ')}</Typography>
                </Box>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      )}

      {frontmatter.readings && frontmatter.readings.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Further Reading</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {frontmatter.readings.map((reading, index) => (
                <ListItem key={index}>
                  <ListItemText>
                    <Typography variant="body2">{reading}</Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {frontmatter.projects && Object.keys(frontmatter.projects).length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Related Projects</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {Object.entries(frontmatter.projects).map(([name, project]) => (
                <ListItem key={name}>
                  <ListItemText
                    primary={name}
                    secondary={
                      <>
                        {project.description}
                        {project.link && (
                          <>
                            {' - '}
                            <MuiLink href={project.link} target="_blank" rel="noopener">
                              View Project
                            </MuiLink>
                          </>
                        )}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {frontmatter.resources && Object.keys(frontmatter.resources).length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Resources</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {Object.entries(frontmatter.resources).map(([name, resource]) => (
                <ListItem key={name}>
                  <ListItemText
                    primary={name}
                    secondary={
                      <>
                        {resource.description}
                        {resource.link && (
                          <>
                            {' - '}
                            <MuiLink href={resource.link} target="_blank" rel="noopener">
                              View Resource
                            </MuiLink>
                          </>
                        )}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  )
}
