/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require("path");
const htmlfile = fs.readFileSync(path.resolve(__dirname, "../public/index.html"));

jest.dontMock("fs");

beforeEach(() => {
    document.documentElement.innerHTML = htmlfile.toString();
});

afterEach(() => {
    jest.resetModules();
});

// require("../public/index.html");
test('testing if jests jsdom works', () => {
    const element = document.getElementById('sticky-3');
    expect(element).not.toBeNull();
});