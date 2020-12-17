export const logMiddleware = async (req, res, next) => {
  await console.log(req.method, req.url);
  req.logged = true; // mark request as logged
  next();
};
