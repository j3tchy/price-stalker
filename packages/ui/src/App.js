import React, { useState } from 'react';

import Form from './components/Form/Form';

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

  const handleSubmit = event => {
    event.preventDefault();

    fetch('http://localhost:5000/api/scrapers', {
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
          <p>Table</p>
        </div>
      </div>
    </div>
  );
};

export default App;
