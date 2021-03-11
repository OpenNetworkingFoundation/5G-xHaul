/********************************************************************************************************
 * Name: UML to YANG Mapping Tool
 * Copyright 2015 CAICT (China Academy of Information and Communication Technology (former China Academy of Telecommunication Research)). All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 *
 * This tool is developed according to the mapping rules defined in onf2015.261_Mapping_Gdls_UML-YANG.08 by OpenNetworkFoundation(ONF) IMP group.
 *
 * file: \model\yang\module.js
 *
 * The above copyright information should be included in all distribution, reproduction or derivative works of this software.
 *
 ****************************************************************************************************/
function Util(str){

}
Util.yangifyName = function(str) {
    return str
        .replace( /([a-z])([A-Z])/g, '$1-$2' ) // insert dashes
        .replace( /([0-9]+)/g, '-$1' )
        .replace( /([0-9]+)([A-Z])/g, '$1-$2' )
        //.replace( /([A-Z])([A-Z])/g, '$1-$2' )
        .toLowerCase()                         // lowercase everything
        .replace( /^[_-]/, '')                    // remove leading underscore
        .replace( /:_/g, ':')                  // and leading underscores in path segments
        .replace( /_/g, '-')              // convert underscore and period to dash
        //.replace( /(^-)/g, '')
        .replace( /-{2}/g, '-')
        .replace( /([0-9])\.-([0-9])/g, '$1.$2');
};
Util.typeifyName = function(str) {
    return str
        .replace( /([a-z])([A-Z])/g, '$1-$2' ) // insert dashes
        .replace( /([0-9]+)/g, '-$1' )
        .replace( /([0-9]+)([A-Z])/g, '$1-$2' )
        .toLowerCase()                         // lowercase everything
        .replace( /^[_-]/, '')                    // remove leading underscore
        .replace( /:_/g, ':')                  // and leading underscores in path segments
        .replace( /_/g, '-')              // convert underscore and period to dash
        //.replace( /(^-)/g, '')
        .replace( /-{2}/g, '-')
        .replace( /([0-9])\.-([0-9])/g, '$1.$2');
};

Util.handleNamespacePrefix = function(path, prefixes) {
    
    var result = path;
    if (typeof prefixes === 'array') {
        Object.keys(prefixes).forEach(function(key) {
            // replace example: "/IpInterface:" by "/ipif:" and also leading "ipInterface:" by "ipif:"
            result = result.replace(new RegExp("^" + key + ":", "g"), prefixes[key] + ":");
            result = result.replace(new RegExp("/" + key + ":", "g"), "/" + prefixes[key] + ":");
        });
    }
    
    // [sko] hack, works for now, but not sure what would be the right logic ;(
    var searchList = ['name,uuid', 'uuid,name'];
    searchList.forEach(function(search) {
        if (result.indexOf(search) !== -1) {
            console.warn("[WARN]", "Please check", result)
            result = result.replace(search, 'uuid');
        }
    });
    return result;
}

module.exports = Util;