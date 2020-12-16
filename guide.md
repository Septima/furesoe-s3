# Guide: How to create external Septima Search Server types  

### tl;dr  

Your package must `export default` a populated ClassRegistry ([See index.js](index.js))

### Steps

Create an npm project e.g:  
`npm init s3-mysearchers  `

#### package.json
To extend Septima Search: The minimal devDependencies:   
```js
  "devDependencies": {
    "@septima/septima-search": "v.vv.vv"
  }
```  

To use modules that are included in S3 by default, include septima-search-server  
```js
  "devDependencies": {
    "@septima/septima-search": "v.vv.vv",
    "@septima/septima-search-server":"v.vv.vv"
  }
```  

This is an example package.json which, in addition to mandatory content, includes some scripts to build and test an api.md page  
```js
{
  "name": "s3-mysearchers",
  "version": "1.0.0",
  "main": "index.js",
  "description": "Some nice searchers",
  "author": "Klavs Pihlkjær",
  "license": "Copyright (c) 2013-2020 Septima P/S",
  "devDependencies": {
    "@septima/septima-search": "5.11.10",
    "@septima/septima-search-server":"0.9.6",
    "rimraf": "^3.0.0",
    "jsdoc": "3.6.3",
    "jsdoc-to-markdown": "^5.0.3",
    "local-web-server": "3.0.7"
  },
  "scripts": {
    "generate-jsdoc": "rimraf doc && jsdoc -c jsdoc/conf.json -d doc",
    "generate-apimd": "jsdoc2md --files src/*.js > api.md",
    "serve-jsdoc": "ws --directory ./doc -p 7002"
  }
}  
```  

#### Your export  
You must export a a populated ClassRegistry  
```js
import MySearcher from "./src/MySearcher"
import ClassRegistry from "@septima/septima-search/src/js/ClassRegistry"

const myTypes = new ClassRegistry()

myTypes.addClass(MySearcher, "s3-mysearchers/MySearcher")

export default myTypes
```  
