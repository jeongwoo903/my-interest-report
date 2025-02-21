export function getStatusChecker<T>(promiseIn: Promise<T>) {
  let status = 'pending';
  let result: T;
  let error: Error;

  const promise = promiseIn
    .then(response => {
      status = 'success';
      result = response;
    })
    .catch(err => {
      status = 'error';
      error = err;
    });

  return () => ({ promise, status, result, error });
}

export function makeThrower<T>(promiseIn: Promise<T>) {
  const checkStatus = getStatusChecker(promiseIn);

  return function () {
    const { promise, status, result, error } = checkStatus();

    if (status === 'pending') throw promise;
    if (status === 'error') throw error;
    return result;
  };
}
