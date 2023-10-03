import React, { Fragment, useState, useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LaunchIcon from '@mui/icons-material/Launch';

export default function Schedule({
  schedule,
  // workshops 
}) {

  const [activeAccordion, setActiveAccordion] = useState(null);
  const formattedDate = (date) => {

    const dateObj = new Date(date);
    const modifiedDate = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * -60000)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return modifiedDate.toLocaleDateString('en-US', options);
  };

  // group events by date
  const eventsByDate = schedule.reduce((acc, event) => {
    const date = formattedDate(event.date);
    // if(event.workshop !== undefined) {
    //   // search for the workshop in the workshops array by slug 
    //   event.slug =  workshops.find((workshop) => workshop.slug === event.workshop).slug;
    // }
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {});



  // if a tab is equal to the current day, it is the default open tab, otherwise the first tab is default open
  useEffect(() => {
    const today = formattedDate(new Date());
    if (eventsByDate[today]) {
      setActiveAccordion(today);
    } else {
      setActiveAccordion(Object.keys(eventsByDate)[0]);
    }
  }, []);


  const handleAccordionChange = (event, date) => {
    setActiveAccordion(date);
    // close accordion if it's already open
    if (activeAccordion === date) {
      setActiveAccordion(null);
    }
  };

  return (
    <Fragment>
      <div className=''>
        <h1>Schedule</h1>
        <div className="accordion">
          {Object.keys(eventsByDate).map((date) => (
            <Accordion
              square={true}
              key={date}
              expanded={date === activeAccordion}
              onChange={(event) => handleAccordionChange(event, date)}
              sx={{
                boxShadow: 'none',
                marginBottom: '40px',
                '&:before': {
                  display: 'none',
                },
              }}
            >
              <AccordionSummary className='schedule-item'
                sx={{
                  boxShadow: 'none',
                  border: 'none',
                }}
                expandIcon={<ExpandMore />}>
                <h2 className="accordion-summary">{date}</h2>
              </AccordionSummary>
              <AccordionDetails>
                <div className="accordion-details">
                  {eventsByDate[date].map((event, index) => (
                    <div key={index}>
                      <h3>{event.title}
                        {event.slug &&
                          <LaunchIcon className="launch-icon"
                            // onClick={() => window.open(`/workshops/${event.slug}`)} 
                            style={{
                              cursor: 'pointer',
                              paddingTop: '5px',
                            }}
                          />
                        }
                      </h3>
                      <p className='time'>{event.time}</p>
                      <p>{event.description}</p>
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </Fragment>
  );
}