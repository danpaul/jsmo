_ = require('underscore')

var jsmo = {}


/**
* Takes JSMO object (object following JSMO spec)
*/
jsmo.compile = function(element, data, isOuter){

    if( _.isFunction(element) ){
        return '<script>(' + String(element) + ')();</script>'
    }

    var key = _.keys(element)[0]
    var markup = ''


    if( typeof(isOuter) === 'undefined' ){
        markup += '<!doctype html>'
    }

    markup += jsmo.getOpenTag(element, key)

    if( _.isFunction(element[key]) ){
        var secondElement = element[key](data)
    } else if( _.isString(element[key]) ) {
        var secondElement = element[key]
    } else {
        var secondElement = element[key][1]
    }

    if( element[key][1] && _.isFunction(element[key][1]) ){
        secondElement = element[key][1](data)
    }

    var children = secondElement

    if( _.isString(secondElement) ){
        markup += secondElement
        if( !_.isString(element[key]) && element[key][2] ){
            children = element[key][2]
        } else {
            children = []
        }
    }

    _.each(children, function(child){
        markup += jsmo.compile(child, data, false)
    })

    return markup + jsmo.getCloseTag(key)

}

/**
* Returns closing tag
*/
jsmo.getCloseTag = function(key){
    return '</' + key + '>'
}

/**
* Takes full object and key (tag)
* Returns tag with atributes
*/
jsmo.getOpenTag = function(element, key){

    var tag = '<' + key

    if( !_.isFunction(element[key]) &&
        !_.isString(element[key]) &&
        !_.isEmpty(element[key][0]) ){

        tag += ' ' + jsmo.getProperties(element[key][0])
    }

    return tag + '>'    
}

/**
* Parses tag attributes
*/
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

module.exports = jsmo