import {compareObjects} from './helper';
const object1 ={"name" : "Murphy"}
const object2 ={"name" : "Andrew"}
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