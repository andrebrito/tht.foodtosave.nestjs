/* eslint-disable @typescript-eslint/no-var-requires */
const NodeEnvironment = require('jest-environment-node').TestEnvironment;
const execSync = require('child_process').execSync;

class PrismaTestEnvironment extends NodeEnvironment {
  async setup() {
    try {
      execSync('yarn prisma migrate dev');
    } catch (e) {
      console.error(e);
    }

    return super.setup();
  }
}

module.exports = PrismaTestEnvironment;
