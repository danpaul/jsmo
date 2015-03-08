var jsmo = require('../index')
var _ = require('underscore')

var users = [
    {name: 'Joe', age: '33'},
    {name: 'Jane', age: '44'}
]

var testContent = [
    {p: [{id: 'first-paragraph'}, 'test paragraph 1']},
    {p: [{}, 'test paragraph 2']},
    {div: [{}, function(){
        return 'This is some div content.'
    }]},
    {div: [{id: 'user-section'}, function(){
        return _.map(users, function(user){
            return {p: [{class: 'user'}, user.name + ' is ' + user.age + '.']}
        })
    }]},
]

var testDoc = {
    'html': [
        { class: 'outer-class' },
        [
            {body: [
                { id:'body-id', class: ['class-one', 'class-two'] },
                testContent
            ]},
            function(){
                // this gets executed on the client side
                console.log('Client side script.')
                console.log(document.getElementById('first-paragraph').innerHTML)
            }
        ]
    ]
}

var markup = jsmo.compile(testDoc, null)
console.log(markup)