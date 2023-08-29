export const personServiceMock = {
  create: jest.fn().mockResolvedValue({}),
  findOne: jest.fn().mockResolvedValue({}),
  findAll: jest.fn().mockResolvedValue([{}]),
  remove: jest.fn().mockResolvedValue({}),
};
