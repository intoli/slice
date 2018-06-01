import assert from 'assert';
import { spawn } from 'child_process';
import path from 'path';
import readline from 'readline';

import SliceArray from '../src/';


const generateTests = (runTest) => (
  new Promise((resolve, revoke) => {
    const executable = path.resolve(__dirname, 'generate_tests.py');
    const options = {
      stdio: ['ignore', 'pipe', 'ignore'],
    };
    const process = spawn(executable, [], options);
    const readlineInterface = readline.createInterface({
      input: process.stdout,
    });
    readlineInterface.on('close', resolve);
    readlineInterface.on('line', (line) => {
      const testData = JSON.parse(line);
      runTest(testData);
    });
  })
);


describe('SliceArray Integration Tests', async () => {
  await generateTests(({
    error,
    extracted,
    index,
    initial,
    slice,
  }) => {
    it(`should run test #${index}`, () => {
      try {
        const initialSliceArray = new SliceArray(...initial);
        const extractedUsingString = initialSliceArray[slice];
        console.log(typeof extractedUsingString, typeof extracted);
        console.log(extractedUsingString, extracted);
        assert.deepEqual(extractedUsingString, extracted);
        // If we made it this far, there should have been no Python error.
        assert(error == null);
      } catch (e) {
        if (!error || error.code === 'ERR_ASSERTION') {
          throw e;
        }
      }
    });
  });
});
