import React from 'react';

function ShimmerPlaceHolder() {
  return (
    <div className="container flex flex-col px-4 mx-auto space-y-4">
      <div className="w-1/2 h-4 my-8 background-shimmer" />
      <div className="w-1/3 h-4 my-8 background-shimmer" />
      <div className="w-1/4 h-4 my-8 background-shimmer" />
    </div>
  );
}

export default ShimmerPlaceHolder;
