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
