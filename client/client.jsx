/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { hydrateRoot } from "react-dom/client";
import { DataProvider } from '../data/DataProvider';
import App from "../app/App";

const root = document.getElementById('app');

hydrateRoot(
  root,
  <DataProvider fallback={[]}>
    <App assets={window.assetManifest} />
  </DataProvider>
);
