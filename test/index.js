var jsmo = require('../index')
var _ = require('underscore')

var users = [
    {name: 'Joe', age: '33'},
    {name: 'Jane', age: '44'}
]

var templateData = {
    title: 'This is the site title.'
}

var headContent = [
    {title: function(d){ return d.title }}
    // alternate form:
    // {title: [{}, function(d){ return d.title }]}
]

var bodyContent = [
    {p: [{id: 'first-paragraph'}, 'test paragraph 1']},

    {p: 'test paragraph 2'},
    // alternate form:
    // {p: [{}, 'test paragraph 2']},

    {div: [{}, function(){
        return 'This is some div content.'
    }]},
    {div: [{id: 'user-section'}, function(){
        return _.map(users, function(user){
            return {p: [{class: 'user'}, user.name + ' is ' + user.age + '.']}
        })
    }]},
    function(){
        // this gets in-lined and executed on the client side
        console.log('Client side script.')
        console.log(document.getElementById('first-paragraph').innerHTML)
    }
]

var testDoc = {
    'html': [
        { class: 'outer-class' },
        [
            {head: [{}, headContent]},
            {body: [
                { id:'body-id', class: ['class-one', 'class-two'] },
                bodyContent
            ]}
        ]
    ]
}

var markup = jsmo.compile(testDoc, templateData)
console.log(markup)