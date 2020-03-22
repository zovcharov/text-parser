const parser = require('./parser/index');

const testText = 'About John… If John goes home in monday at 10pm, I`ll be happy!';
const testTextWithHtmlTags = '<div style="font-size: 14px; line-height: 21px; color: #e4e4e4" data-some1="some1" data-some2="some2">Some text</div>';

describe('Tests for parser in Promise mode', () => {
    it('>> should return Promise without callback', () => {
        const result = parser('Some test string');
        expect(result instanceof Promise).toBeTruthy();
    });

    it('>> test without configuration', () => {
        const result = parser(testText);
        const expectedResult = {
            keywords: {
                about: 1,
                john: 2,
                goes: 1,
                home: 1,
                monday: 1,
                '10pm': 1,
                happy: 1,
                if: 1,
                in: 1,
                at: 1,
                be: 1,
                ll: 1,
                i: 1,
            }
        };

        result.then(res => {
            expect(res).toEqual(expectedResult);
        });
    })

    it('>> test with ignored word', () => {
        const result = parser(testText, {
            ignoreWords: ['if', 'in', 'at', 'be', 'll', 'home', 'monday', 'happy', 'home', 'goes'],
        });
        const expectedResult = {
            keywords: {
                about: 1,
                john: 2,
                '10pm': 1,
                i: 1,
            }
        };

        result.then(res => {
            expect(res).toEqual(expectedResult);
        });
    })

    it('>> test with minimal word length', () => {
        const result = parser(testText, {
            minLength: 5,
        });
        const expectedResult = {
            keywords: {
                about: 1,
                monday: 1,
                happy: 1,
            }
        };

        result.then(res => {
            expect(res).toEqual(expectedResult);
        })
    })

    it('>> test with offset', () => {
        const result = parser('Text with offset', {
            offset: 2,
        });
        const expectedResult = {
            keywords: {
                xt: 1,
                with: 1,
                offset: 1,
            }
        };

        result.then(res => {
            expect(res).toEqual(expectedResult);
        });
    });

    it('>> test with html markup', () => {
        const result = parser(testTextWithHtmlTags);
        const expectedResult = {
            keywords: {
                some: 1,
                text: 1,
            }
        };

        result.then(res => {
            expect(res).toEqual(expectedResult);
        });
    });
});

describe('Tests for parser in callback mode', () => {
    it('>> test without configuration', () => {
        const expectedResult = {
            keywords: {
                about: 1,
                john: 2,
                goes: 1,
                home: 1,
                monday: 1,
                '10pm': 1,
                happy: 1,
                if: 1,
                in: 1,
                at: 1,
                be: 1,
                ll: 1,
                i: 1,
            }
        };
        parser(testText, (error, res) => {
            expect(res).toEqual(expectedResult);
        });
    });

    it('>> test with ignored word', () => {
        const expectedResult = {
            keywords: {
                about: 1,
                john: 2,
                '10pm': 1,
                i: 1,
            }
        };
        parser(
            testText, 
            {
                ignoreWords: ['if', 'in', 'at', 'be', 'll', 'home', 'monday', 'happy', 'home', 'goes'],
            },
            (error, res) => {
                expect(res).toEqual(expectedResult);
            }
        );
    })

    it('>> test with minimal word length', () => {
        const result = parser(testText, {
            minLength: 5,
        });
        const expectedResult = {
            keywords: {
                about: 1,
                monday: 1,
                happy: 1,
            }
        };

        parser(
            testText, 
            {
                minLength: 5,
            },
            (error, res) => {
                expect(res).toEqual(expectedResult);
            }
        );
    })

    it('>> test with offset', () => {
        const expectedResult = {
            keywords: {
                xt: 1,
                with: 1,
                offset: 1,
            }
        };

        parser(
            'Text with offset', 
            {
                offset: 2,
            },
            (error, res) => {
                expect(res).toEqual(expectedResult);
            }
        );
    });

    it('>> test with html markup', () => {
        const expectedResult = {
            keywords: {
                some: 1,
                text: 1,
            }
        };

        parser(
            testTextWithHtmlTags,
            (error, res) => {
                expect(res).toEqual(expectedResult);
            }
        );
    });
});

describe('Tests with errors', () => {
    it ('>> test for wrong input params', () => {
        try {
            parser();
        } catch (err) {
            expect(err.name).toBe('InputParamError');
        }
    });

    it ('>> test for wrong config params', () => {
        try {
            parser('Text', { offset: 'Wrong Offset Type' });
        } catch (err) {
            expect(err.name).toBe('ConfigParamError');
        }
    });
});