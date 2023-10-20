/**
 * @jest-environment jsdom
 */

test('testing if jests jsdom works', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
});