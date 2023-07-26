const assert = require('node:assert');
const test = require('node:test');


test('dummy', (_) => {
    // This test passes because it does not throw an exception.
    assert.strictEqual(1, 1);
});

