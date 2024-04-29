import React from 'react';
import { useLocation } from 'react-router-dom';
import Product from './Product'; // Assuming Product component is in the same directory

const ParentComponent = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const Id = params.get('Id'); // Get the 'Id' query parameter from the URL

  console.log('Route Params in ParentComponent:', Id);

  return (
    <div>
      {/* Render the Product component and pass the Id parameter */}
      <Product Id={Id} />
    </div>
  );
};

export default ParentComponent;


