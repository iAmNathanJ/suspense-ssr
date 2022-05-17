import React, { lazy, Suspense } from 'react';

const HydrationCache = lazy(() => import('../data/HydrationCache'))

export default function Html({ children, title }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="favicon.ico" />
        <link rel="stylesheet" href="/main.css" />
        <title>{title}</title>
      </head>
      <body>
        <div id="app">{children}</div>
        <Suspense fallback={null}>
          <HydrationCache />
        </Suspense>
        <script src="/client.js" type="module" />
      </body>
    </html>
  );
}
