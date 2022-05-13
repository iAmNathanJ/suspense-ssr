/**
 * Adapted from
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import {createContext, useContext, useId} from 'react';
import {suspendable} from './suspendable';

// Note: this file does not demonstrate a real data fetching strategy.
// We only use this to simulate data fetching happening on the server
// while the cache is populated on the client. In a real app, you would
// instead use a data fetching library or Server Components for this.

export const DataContext = createContext(null);

export function DataProvider({children, data, fallback}) {
  const id = useId();

  let payload;

  if (isServer()) {
    payload = suspendable(data);
  } else {
    try {
      const cached = document.querySelector(`[data-hydration="${id}"]`).textContent;
      payload = suspendable(JSON.parse(cached));
    } catch {
      console.log(`data didn't make it in time on the server. need to fetch client side.`);

      // this will break hydration
      payload = suspendable(fallback);
    }
  }

  return <DataContext.Provider value={{ id, data: payload }}>{children}</DataContext.Provider>;
}

export function useData() {
  const { id, data } = useContext(DataContext);

  return {
    id,
    data: data?.suspended
  };
}

function isServer() {
  return typeof window === 'undefined'
}
