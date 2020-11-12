import React from 'react';
import PropTypes from 'prop-types';

const formConfig = [
  {
    id: 'retailer',
    label: 'Retailer',
  }, {
    id: 'product',
    label: 'Product',
  }, {
    id: 'price',
    label: 'Price',
  }, {
    id: 'url',
    label: 'Website Address',
  }, {
    id: 'element',
    label: 'Element',
  },
];

const Form = ({ handleSubmit, handleChange, formState }) => (
  <form onSubmit={e => handleSubmit(e)} className="mt-5">
    {formConfig.map(field => (
      <div className="mb-3" key={field.id}>
        <label htmlFor={field.id} className="block mb-2 uppercase text-gray-700 font-bold text-xs">{field.label}</label>
        <input value={formState[field.id]} onChange={e => handleChange(e)} className="border rounded py-2 px-3 w-full" type="text" id={field.id} name={field.id} />
      </div>
    ))}

    <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" type="submit">Create Scraper</button>
  </form>
);

Form.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  formState: PropTypes.shape({
    retailer: PropTypes.string,
    product: PropTypes.string,
    price: PropTypes.string,
    element: PropTypes.string,
  }),
};

Form.defaultProps = {
  handleSubmit: () => null,
  handleChange: () => null,
  formState: {},
};

export default Form;
