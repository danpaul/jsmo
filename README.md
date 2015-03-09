# JSMO

## About
JSMO is a sort of silly experiment to try to implement a Javascript to HTML specification and compiler. The specification uses the following rules:

### Tags
* Each html tag is an object with one key/value pair.
* The value of this tag object is an array.
* The first element of this array is an object.
  * This object defines the tag's attributes.
* The second element of the array is an array, a string or a function returning an array or a string.
  * If it is a function, that function will get called and the reuturn value will get compiled
  * If it is an array it defines the tag's children.
  * If it is a string, it is considered literal markup and gets included into the markup directly.
* If a string is used as the second element of the array, an optional third element may be given which is an array which defines the elements children (this would normally be the second element of the array).
* If a function is used instead of an object for the tag, that function gets inlined as a client-side function.

## Example

```Javascript
var jsmo = require('./index')
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
```

Formatted output:
```HTML
<!doctype html>
<html class="outer-class">
    <head>
        <title>This is the site title.</title>
    </head>
    <body id="body-id" class="class-one class-two">
        <p id="first-paragraph">test paragraph 1</p>
        <p>test paragraph 2</p>
        <div>This is some div content.</div>
        <div id="user-section">
            <p class="user">Joe is 33.</p>
            <p class="user">Jane is 44.</p>
        </div>
        <script>(function (){
            // this gets in-lined and executed on the client side
            console.log('Client side script.')
            console.log(document.getElementById('first-paragraph').innerHTML)
            })();
        </script>
    </body>
</html>
```