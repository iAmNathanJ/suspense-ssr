/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { lazy, Suspense } from 'react';

const HydrationCache = lazy(() => import('./HydrationCache'))

export default function Html({ assets, children, title }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="favicon.ico" />
        <link rel="stylesheet" href={assets["main.css"]} />
        <title>{title}</title>
      </head>
      <body>
        <div id="app">{children}</div>
        <script
          dangerouslySetInnerHTML={{
            __html: `assetManifest = ${JSON.stringify(assets)};`
          }}
        />
        <Suspense fallback={null}>
          <HydrationCache />
        </Suspense>
        <script src="/client.js" type="module" />
      </body>
    </html>
  );
}
