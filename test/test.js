const { expect } = require('chai');

// Test Suite 'describe('suit name', callback)' --- CAN be nested
describe('npm test', () => {
  // Declare variables and/or requires
  let example;

  // Before Action (when all specs use the same code)
  // Could use 'beforeEach()' when it needs to be re-ran before every spec
  before(() => example = true);

  // Test Spec (aka Unit Test) 'it('spec description', callback)'
  it('\'npm test\'should run the tests', () => expect(example).to.be.ok);
                                            // Expected result 'expect()' --- (Better just one for clarity when error)

  // Can leave specs without a function to mark as pending
  // Can also mark as pending by putting an 'x' before 'it()', also works with 'Test Suites'
  xit('this test should be marked as pending');

  // After Action (when all specs are done)
  // Could use 'afterEach()' when it needs to be re ran after every spec
  after(() => console.log('Finished the suite'));
});

// WATCH
// Run 'mocha --watch ./test/testfile.js ./code/codefile.js'