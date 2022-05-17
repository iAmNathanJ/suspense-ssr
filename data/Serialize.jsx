import React from 'react';

export function Serialze({ id, data }) {
  return (
    <script
      type="text/json"
      data-hydration={id}
      dangerouslySetInnerHTML={{
        __html: `${JSON.stringify(data)}`
      }}
    />
  );
}
