/// <reference types="jest" />
import { getDeinflections } from './deinflect';

export type DeinflectionTest = {
  input: string;
  output: string[];
  description: string;
};

export function runTests(tests: DeinflectionTest[]) {
  test.each(tests)('$description', ({ input, output }) => {
    /** the deinflection result can deliver more result which might be invalid,
     * this might not be a problem since we won't find them in a dictionary anyway **/
    const deinflected = getDeinflections(input);

    const notFound = output.filter((expected) =>
      !deinflected.includes(expected)
    );

    if (notFound.length > 0) {
      console.error(
        `Could not find ${notFound.join(',')} inside of ${deinflected.join(
          ','
        )}`
      );
    }

    expect(notFound).toHaveLength(0);
  });
}
