import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ data }) => (
  <table className="table-auto w-full mt-3">
    <thead>
      <tr>
        <th className="px-4 py-2 text-left uppercase text-gray-700 font-bold text-xs">Retailer</th>
        <th className="px-4 py-2 text-left uppercase text-gray-700 font-bold text-xs">Price</th>
      </tr>
    </thead>
    <tbody>
      {data.map((product) => (
        <tr key={product._id}>
          <td className="border px-4 py-2 text-xs text-gray-700">
            <a href={product.url}>{product.retailer}</a>
          </td>
          <td className="border px-4 py-2 text-xs text-gray-700">{product.price}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      retailer: PropTypes.string,
      price: PropTypes.number,
    }),
  ),
};

Table.defaultProps = {
  data: [],
};

export default Table;
