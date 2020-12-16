<a name="module_ItemsForAddressProvider"></a>

## ItemsForAddressProvider
A module for adding two values.


* [ItemsForAddressProvider](#module_ItemsForAddressProvider)
    * [~ItemsForAddressProvider](#module_ItemsForAddressProvider..ItemsForAddressProvider)
        * [new ItemsForAddressProvider(options)](#new_module_ItemsForAddressProvider..ItemsForAddressProvider_new)

<a name="module_ItemsForAddressProvider..ItemsForAddressProvider"></a>

### ItemsForAddressProvider~ItemsForAddressProvider
Shows some demo details for a Dawa Adress

**Kind**: inner class of [<code>ItemsForAddressProvider</code>](#module_ItemsForAddressProvider)  
**Api**:   
<a name="new_module_ItemsForAddressProvider..ItemsForAddressProvider_new"></a>

#### new ItemsForAddressProvider(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| [options.header] | <code>Object</code> |  | The title of the detail |
| [options.buttonImage] | <code>Object</code> |  | The image of the details |
| [options.more] | <code>Object</code> | <code>true</code> | Show as top-level detail |

**Example** *(YAML Declaration:)*  
```js
  dawasearcher:
    _type: Septima.Search.DawaSearcher
    detailhandlers:
      - _type: s3-demomodules/ItemsForAddressProvider
        _options:
          header: "Demo details provider"
```
