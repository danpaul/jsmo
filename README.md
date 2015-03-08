# JSMO

## About
JSMO is a sort of silly experiment to try to implement a Javascript to HTML specification and compiler. The specification uses the following rules:

### Tags
* Each html tag is an object with one key/value pair.
* The value of this tag object is an array.
* The first element of this array is an object.
  * This object defines the tag's attributes.
* The second element of the array is either an array or a string.
  * If it is an array it defines the tag's children.
  * If it is a string, it is considered literal markup and gets included into the markup directly.
* If a string is used as the second element of the array, an optional third element may be given which is an array which defines the elements children (this would normally be the second element of the array).

## Examples

```Javascript
var jsmo = require('./index')

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
```

Yields:
```HTML
<!doctype html><html class="outer-class"><body id="body-id" class="fee fi fo"><p>test paragraph 1</p><p>test paragraph 2</p></body></html>
```