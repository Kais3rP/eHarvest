

const handleAsyncRejections = (fn) => (...args) => {
    const controllerFunction = fn(...args);
    const next = args[args.length - 1];
    return Promise.resolve(controllerFunction).catch(next);
  };
  const editRouter = ({ router, method, path, middleware, handler }) => {
    const wrappedHandler = handleAsyncRejections(handler);
    return router[method](path, ...middleware, wrappedHandler);
  };
  module.exports = editRouter;
