var jsmo = require('../index')

var testContent = [
    {p: [{}, 'test paragraph 1']},
    {p: [{}, 'test paragraph 2']}
]

var testDoc = {
    'html': [
        { class: 'outer-class' },
        [
            {body: [
                { id:'body-id', class: ['fee', 'fi', 'fo'] },
                testContent
            ]}
        ]
    ]
}

var markup = jsmo.compile(testDoc, null)
console.log(markup)