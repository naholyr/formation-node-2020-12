/* eslint-env jest */

export const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn();
  return res;
};

export const mockRequest = ({ body = {}, session = {}, params = {} } = {}) => {
  const req = { body, session, params };
  return req;
};

export const mockReqRes = (options) => ({
  req: mockRequest(options),
  res: mockResponse(options),
});
