# s3-demomodules
A demo plugin package for Septima Search Server  

An example of how to package and document external Septima Search Server types

[Guide: How to create external Septima Search Server types](guide.md)

## This package  

This package installs _ItemsForAddressProvider_ as a details provider for Dawa Adresses

### Install

`npm install --production https://github.com/Septima/s3-demomodules.git --save`
https://docs.npmjs.com/files/package.json#git-urls-as-dependencies

### Usage

Include as detailshandler for a Dawa Searcher.  

**Example** *(YAML Declaration:)*  
```js
  dawasearcher:
    _type: Septima.Search.DawaSearcher
    detailhandlers:
      - _type: s3-demomodules/ItemsForAddressProvider
        _options:
          header: "Demo details provider"
```  

All options are optional. Please see [the API](api.md)