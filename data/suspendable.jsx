import { useId } from "react";

export function useSuspendableData({data, fallback}) {
  const id = useId();

  let payload;

  if (isServer()) {
    payload = data;
  } else {
    try {
      const cached = document.querySelector(`[data-hydration="${id}"]`);
      payload = JSON.parse(cached.textContent);
    } catch {
      console.log(`data didn't make it in time on the server. need to fetch client side.`);

      // this will break hydration
      payload = fallback;
    }
  }

  return {id, data: suspendable(payload)};
}

export function suspendable(asyncOrSyncThing) {
  const dataPromise = deferred();

  Promise
    .resolve(asyncOrSyncThing)
    .then(dataPromise.resolve)
    .catch(dataPromise.reject);

  return {
    get suspended() {
      if (dataPromise.state === "fulfilled") {
        return dataPromise.value;
      }

      throw dataPromise;
    }
  }
}

function deferred() {
  let deferredProps;
  let state = "pending";
  let value;

  const promise = new Promise((resolve, reject) => {
    deferredProps = {
      async resolve(val) {
        await val;
        state = "fulfilled";
        value = val;
        resolve(val);
      },
      reject(reason) {
        state = "rejected";
        reject(reason);
      }
    };
  });

  Object.defineProperty(promise, "state", { get: () => state });
  Object.defineProperty(promise, "value", { get: () => value });

  return Object.assign(promise, deferredProps);
}

function isServer() {
  return typeof window === 'undefined'
}
