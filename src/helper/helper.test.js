// test case to check the helper function
import {compareObjects} from './helper';
// test data starts here
const object1 ={"name" : "Murphy"}
const object2 ={"name" : "Andrew"}
// test data ends here
describe("compare objects", () => {
    test('compare result', (done) => {
      try {
      expect(compareObjects(object1, object2, "name")).toBe(1);
      done();
      }
      catch (error) {
        done(error);
      }
    });
   })