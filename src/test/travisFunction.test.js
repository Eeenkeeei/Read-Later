import {calculate} from "../js/travisFunction";

test('calc', () => {
    const result = calculate();
    expect(result).toBe(4);
})