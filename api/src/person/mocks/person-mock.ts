export const personServiceMock = {
  create: jest.fn().mockResolvedValue({}),
  findOne: jest.fn().mockResolvedValue({}),
  findMany: jest.fn().mockResolvedValue([{}]),
  delete: jest.fn().mockResolvedValue({}),
};
