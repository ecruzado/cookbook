import React from 'react';
import FilterLink from './FilterLink';

export const ListFilter = () => (
  <div className="row center-align">
    <ul className="pagination">
      <FilterLink filter="SHOW_ALL">
        ALL
      </FilterLink>
      <FilterLink filter="SHOW_PASTAS">
        PASTAS
      </FilterLink>
      <FilterLink filter="SHOW_SALADS">
        SALADS
      </FilterLink>
      <FilterLink filter="SHOW_MEAT">
        MEAT
      </FilterLink>
      <FilterLink filter="SHOW_DESSERTS">
        DESSERTS
      </FilterLink>
    </ul>
  </div>
);