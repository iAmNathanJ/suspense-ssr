/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import Html from './Html';
import App from "../app/App";
import { CommentProvider } from "../data/CommentProvider";
import { fetchComments } from '../data/fetch-comments';
import { ABORT_DELAY } from "./delays";

export default function render(url, res) {
  // This is how you would wire it up previously:
  //
  // res.send(
  //   '<!DOCTYPE html>' +
  //   renderToString(
  //     <DataProvider data={data}>
  //       <App />
  //     </DataProvider>,
  //   )
  // );

  // The new wiring is a bit more involved.
  res.socket.on("error", (error) => {
    console.error("Fatal", error);
  });
  let didError = false;

  // data for server
  // also gets serialized in HTML for client to read
  const comments = fetchComments();

  const stream = renderToPipeableStream(
    <CommentProvider data={comments}>
      <Html title="Hello">
        <App />
      </Html>
    </CommentProvider>,
    {
      onShellReady() {
        // If something errored before we started streaming, we set the error code appropriately.
        res.statusCode = didError ? 500 : 200;
        res.setHeader("Content-type", "text/html");
        stream.pipe(res);
      },
      onError(x) {
        didError = true;
        console.error(x);
      }
    }
  );
  // Abandon and switch to client rendering if enough time passes.
  // Try lowering this to see the client recover.
  setTimeout(() => stream.abort(), ABORT_DELAY);
};
