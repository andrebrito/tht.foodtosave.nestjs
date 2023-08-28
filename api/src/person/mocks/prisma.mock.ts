export const prismaMock = {
  person: {
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    findUnique: jest.fn().mockResolvedValue({}),
    findMany: jest.fn().mockResolvedValue([{}]),
    delete: jest.fn().mockResolvedValue({}),
    count: jest.fn().mockResolvedValue(0),
  },
};
