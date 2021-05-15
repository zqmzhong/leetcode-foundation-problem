import { parseError } from '../src/index';

describe('chrome error stack test', () => {
    test('test no stack msg', () => {
        const chromeErrorStack: Error = {
            name: 'TypeError',
            message: 'Error raised',
            stack: 'at <anonymous>:1:11',
        };
        expect(parseError(chromeErrorStack)).toEqual({
            message: 'Error raised',
            stack: [],
        });
    });

    test('test single line', () => {
        const chromeErrorStack: Error = {
            name: 'TypeError',
            message: 'Error raised',
            stack: 'at bar http://192.168.31.8:8000/c.js:2:9',
        };

        expect(parseError(chromeErrorStack)).toEqual({
            message: 'Error raised',
            stack: [
                {
                    line: 2,
                    column: 9,
                    filename: 'http://192.168.31.8:8000/c.js',
                },
            ],
        });
    });

    test('test multi line', () => {
        const chromeErrorStack: Error = {
            name: 'TypeError',
            message: 'Error raised',
            stack: 'at bar http://192.168.31.8:8000/c.js:2:9\n\
            at foo http://192.168.31.8:8000/b.js:4:15\n\
            at calc http://192.168.31.8:8000/a.js:4:3\n\
            at <anonymous>:1:11\n\
            at http://192.168.31.8:8000/a.js:22:3',
        };

        expect(parseError(chromeErrorStack)).toEqual({
            message: 'Error raised',
            stack: [
                {
                    line: 2,
                    column: 9,
                    filename: 'http://192.168.31.8:8000/c.js',
                },
                {
                    line: 4,
                    column: 15,
                    filename: 'http://192.168.31.8:8000/b.js',
                },
                {
                    line: 4,
                    column: 3,
                    filename: 'http://192.168.31.8:8000/a.js',
                },
                {
                    line: 22,
                    column: 3,
                    filename: 'http://192.168.31.8:8000/a.js',
                },
            ],
        });
    });
});

describe('firefox error stack test', () => {
    test('test no stack msg', () => {
        const chromeErrorStack: Error = {
            name: 'TypeError',
            message: 'Error raised',
            stack: '<anonymous>:1:11',
        };
        expect(parseError(chromeErrorStack)).toEqual({
            message: 'Error raised',
            stack: [],
        });
    });

    test('test single line', () => {
        const chromeErrorStack: Error = {
            name: 'TypeError',
            message: 'Error raised',
            stack: 'bar@http://192.168.31.8:8000/c.js:2:9',
        };

        expect(parseError(chromeErrorStack)).toEqual({
            message: 'Error raised',
            stack: [
                {
                    line: 2,
                    column: 9,
                    filename: 'http://192.168.31.8:8000/c.js',
                },
            ],
        });
    });

    test('test multi line', () => {
        const chromeErrorStack: Error = {
            name: 'TypeError',
            message: 'Error raised',
            stack: 'bar@http://192.168.31.8:8000/c.js:2:9\n\
                foo@http://192.168.31.8:8000/b.js:4:15\n\
                calc@http://192.168.31.8:8000/a.js:4:3\n\
                <anonymous>:1:11\n\
                http://192.168.31.8:8000/a.js:22:3',
        };

        expect(parseError(chromeErrorStack)).toEqual({
            message: 'Error raised',
            stack: [
                {
                    line: 2,
                    column: 9,
                    filename: 'http://192.168.31.8:8000/c.js',
                },
                {
                    line: 4,
                    column: 15,
                    filename: 'http://192.168.31.8:8000/b.js',
                },
                {
                    line: 4,
                    column: 3,
                    filename: 'http://192.168.31.8:8000/a.js',
                },
                {
                    line: 22,
                    column: 3,
                    filename: 'http://192.168.31.8:8000/a.js',
                },
            ],
        });
    });
});
