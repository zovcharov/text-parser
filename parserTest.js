const parser = require('./parser/index');

const testText = 'About John… If John goes home in monday at 10pm, I`ll be happy!';
const testTextWithHtmlTags = '<div style="font-size: 14px; line-height: 21px; color: #e4e4e4" data-some1="some1" data-some2="some2">Какой-то текст</div>'

parser(testText, {
    ignoreWords: ['if', 'in', 'at', 'be', 'll'],
    minLength: 2,
}).then(res => {
    console.log(res)
})

parser(testTextWithHtmlTags).then(res => {
    console.log(res)
})

/*parser(testText, (err, res) => {
    console.log(res);
})

parser(
    testText,
    {
        ignoreWords: ['if']
    },
    (err, res) => {
        console.log(res);
    }
)*/