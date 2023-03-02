import React, { Fragment, useState, useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMore from '@material-ui/icons/ExpandMore';


export default function Schedule({ schedule }) {
  const [activeAccordion, setActiveAccordion] = useState(schedule[0].date);

  const formattedDate = (date) => {

    const dateObj = new Date(date);
    const modifiedDate = new Date( dateObj.getTime() - dateObj.getTimezoneOffset() * -60000 )
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return modifiedDate.toLocaleDateString('en-US', options);
  };

  // group events by date
  const eventsByDate = schedule.reduce((acc, event) => {
    const date = formattedDate(event.date);
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
      <div className='schedule'>
        <div className='sectionTitle'>Schedule</div>
        <div className="accordion">
          {Object.keys(eventsByDate).map((date) => (
            <Accordion
              key={date}
              expanded={date === activeAccordion}
              onChange={(event) => handleAccordionChange(event, date)}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <h2 className="accordion-summary">{date}</h2>
              </AccordionSummary>
              <AccordionDetails>
                <div className="accordion-details">
                  {eventsByDate[date].map((event, index) => (
                    <div key={index}>
                      <h2>{event.title}</h2>
                      <p>{event.time}</p>
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