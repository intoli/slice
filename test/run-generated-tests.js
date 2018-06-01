import assert from 'assert';
import { spawn } from 'child_process';
import path from 'path';
import readline from 'readline';

import { SliceArray } from '../src/';


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


const runAllTests = () => (
  generateTests(({
    error,
    extracted,
    final,
    index,
    initial,
    insert,
    slice,
  }) => {
    console.log(`Running test #${index}`);
    try {
      // Read access.
      const initialSliceArray = SliceArray.from(initial);
      const extractedUsingString = initialSliceArray[slice];
      assert.deepEqual(extractedUsingString, extracted);
      const extractedUsingDoubleBrackets = eval(
        `initialSliceArray[[${slice.replace(/:/g, ',')}]]`
      );
      assert.deepEqual(extractedUsingDoubleBrackets, extracted);

      // Write access.
      if (insert) {
        const finalUsingString = SliceArray.from(initial);
        finalUsingString[slice] = insert;
        assert.deepEqual(finalUsingString, final);
        const finalUsingDoubleBrackets = SliceArray.from(initial);
        eval(
          `finalUsingDoubleBrackets[[${slice.replace(/:/g, ',')}]] = insert`
        );
        assert.deepEqual(finalUsingDoubleBrackets, final);
      }

      // If we made it this far, there should have been no Python error.
      assert(error == null);
    } catch (e) {
      if (!error || error.code === 'ERR_ASSERTION') {
        console.log('Extracted:', JSON.stringify(extracted));
        console.log('Final:', JSON.stringify(final));
        console.log('Initial:', JSON.stringify(initial));
        console.log('Insert:', JSON.stringify(insert));
        console.log('Slice:', slice);
        throw e;
      }
    }
  })
);


export default runAllTests;

if (!module.parent) {
  runAllTests();
}
