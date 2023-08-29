export const redisServiceMock = {
  set: jest.fn().mockResolvedValue({}),
  get: jest.fn().mockResolvedValue({}),
  delete: jest.fn().mockResolvedValue({}),
};
