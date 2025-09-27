import React from 'react';

const CategoryFilters = () => {
  return (
    <div className="p-4 w-full flex space-x-2">
      <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 border border-blue-200 rounded-full hover:bg-blue-200">
        #업무
      </button>
      <button className="px-4 py-2 text-sm font-medium text-green-600 bg-green-100 border border-green-200 rounded-full hover:bg-green-200">
        #운동
      </button>
      <button className="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-100 border border-purple-200 rounded-full hover:bg-purple-200">
        #자기계발
      </button>
    </div>
  );
};

export default CategoryFilters;
