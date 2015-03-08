_ = require('underscore')

var jsmo = {}

jsmo.test = function(obj){
    console.log(obj)
}

jsmo.compile = function(element, data, isOuter){

    var key = _.keys(element)[0]
    var markup = ''

    if( typeof(isOuter) === 'undefined' ){
        markup += '<!doctype html>'
    }

    markup += jsmo.getOpenTag(element, key)

    var children = element[key][1]

    if( jsmo.isString(element[key][1]) ){
        markup += element[key][1]
        if( element[key][2] ){
            children = element[key][2]
        } else {
            children = []
        }
    }

    _.each(children, function(child){
        markup += jsmo.compile(child, null, false)
    })

    return markup + jsmo.getCloseTag(key)

}

jsmo.getCloseTag = function(key){
    return '</' + key + '>'
}

jsmo.getOpenTag = function(element, key){

    var tag = '<' + key

    if( !_.isEmpty(element[key][0]) ){
        tag += ' ' + jsmo.getProperties(element[key][0])
    }

    return tag + '>'    
}

jsmo.getProperties = function(properties){

    var propertyString = ''
    var first = true

    _.each(properties, function(v, k){
        if( first ){
            first = false
        } else {
            propertyString += ' '
        }

        propertyString += k + '="'
        if( _.isArray(v) ){
            var firstB = true
            _.each(v, function(element){
                if( firstB ){ firstB = false
                } else { propertyString += ' ' }
                propertyString += element
            })
        } else {
            propertyString += v
        }
        propertyString += '"'
    })

    return propertyString
}

jsmo.isString = function(element){
    return( typeof element == 'string' || element instanceof String)
}

module.exports = jsmo