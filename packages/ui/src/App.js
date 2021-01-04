import React, { useState, useEffect } from 'react';

import Form from './components/Form/Form';
import Table from './components/Table/Table';
import Button from './components/Button';

import { API } from './constants/routes';

import createFormBody from './utils/form';

const INITIAL_FORM_STATE = {
  retailer: '',
  product: '',
  price: '',
  element: '',
  url: '',
};

const App = () => {
  const [formValues, setFormValues] = useState(INITIAL_FORM_STATE);
  const [scrapers, setScrapers] = useState([]);

  useEffect(() => {
    fetch(API.API_SCRAPERS)
      .then(res => res.json())
      .then(({ data }) => setScrapers(data));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    fetch(API.API_SCRAPERS, {
      method: 'POST',
      body: createFormBody(formValues),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(setFormValues(INITIAL_FORM_STATE))
      .catch(err => console.error(`Unable to create scraper: ${err}`));
  };

  const handleChange = event => {
    setFormValues({
      ...formValues,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleScrapeWebsites = () => {
    fetch(API.API_FORCE_SCRAPERS)
      .then(res => res.json())
      .then(data => data);
  };

  const handleCronScrape = () => {
    fetch(API.API_CRON_SCRAPERS)
      .then(res => res.json())
      .then(data => data);
  };

  return (
    <div className="container mx-auto">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Form
            formState={formValues}
            handleSubmit={e => handleSubmit(e)}
            handleChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <Table data={scrapers} />
          <Button
            handleClick={() => handleScrapeWebsites()}
          >
            Scrape Websites
          </Button>
          <Button
            handleClick={() => handleCronScrape()}
          >
            Initialize cron
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
