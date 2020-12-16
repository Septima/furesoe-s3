/**
 * @module
 */
import DetailsHandlerDef from '@septima/septima-search/src/js/details/DetailsHandlerDef'
import icons from "@septima/septima-search/src/js/resources/icons"
/**
 * Shows some demo details for a Dawa Adress
 * @example <caption>YAML Declaration:</caption>
  dawasearcher:
    _type: Septima.Search.DawaSearcher
    detailhandlers:
      - _type: s3-demomodules/ItemsForAddressProvider
        _options:
          header: "Demo details provider"
 * @api
 **/

class ItemsForAddressProvider extends DetailsHandlerDef {
  /**
   * @param {Object} options
   * @param {Object} [options.header] The title of the detail
   * @param {Object} [options.buttonImage] The image of the details
   * @param {Object} [options.more=true] Show as top-level detail
   **/

  constructor(options) {
    super({
      buttonText: options.header,
      buttonImage: icons.details.moreHeader,
      more: true
    })
    this.isApplicableFunction = this.isApplicable
    this.handlerFunction = this.handler
  }

  isApplicable(result) {
    return (result.source === "Dawa" && (result.typeId === "adresse"))
  }

  async handler(result) {
    //return items for the result
    //MUST be declared async
    console.log('hej111')
    var detailItems = []
    
    detailItems.push({
      type: 'textarea',
      text: "Details for " + result.title
    })
    detailItems.push({
      type: 'link',
      icon:icons.details.link,
      link: "https://www.google.dk/search?q=" + result.title,
      linkTitle: "Search Google for " + result.title
    })
    detailItems.push({
      type: "listheader",
      icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNjAuMTIzIDYwLjEyMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjAuMTIzIDYwLjEyMzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTU3LjEyNCw1MS44OTNIMTYuOTJjLTEuNjU3LDAtMy0xLjM0My0zLTNzMS4zNDMtMywzLTNoNDAuMjAzYzEuNjU3LDAsMywxLjM0MywzLDNTNTguNzgxLDUxLjg5Myw1Ny4xMjQsNTEuODkzeiIvPg0KCTxwYXRoIGQ9Ik01Ny4xMjQsMzMuMDYySDE2LjkyYy0xLjY1NywwLTMtMS4zNDMtMy0zczEuMzQzLTMsMy0zaDQwLjIwM2MxLjY1NywwLDMsMS4zNDMsMywzDQoJCUM2MC4xMjQsMzEuNzE5LDU4Ljc4MSwzMy4wNjIsNTcuMTI0LDMzLjA2MnoiLz4NCgk8cGF0aCBkPSJNNTcuMTI0LDE0LjIzMUgxNi45MmMtMS42NTcsMC0zLTEuMzQzLTMtM3MxLjM0My0zLDMtM2g0MC4yMDNjMS42NTcsMCwzLDEuMzQzLDMsM1M1OC43ODEsMTQuMjMxLDU3LjEyNCwxNC4yMzF6Ii8+DQoJPGNpcmNsZSBjeD0iNC4wMjkiIGN5PSIxMS40NjMiIHI9IjQuMDI5Ii8+DQoJPGNpcmNsZSBjeD0iNC4wMjkiIGN5PSIzMC4wNjIiIHI9IjQuMDI5Ii8+DQoJPGNpcmNsZSBjeD0iNC4wMjkiIGN5PSI0OC42NjEiIHI9IjQuMDI5Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==",
      title: "List"
    })
    detailItems.push({
      type: "result",
      result: result
    })
    detailItems.push({
      type: "labelvalue",
      icon: icons.result.defaultIcon,
      label: "Label",
      value: "Value"
    })
    detailItems.push({
      type: "labelvalue",
      label: "Label",
      value: "This entry has not got an icon"
    })
    detailItems.push({
      type: "image",
      label: "Set fra syd",
      value: "https://skraafoto.septima.dk/api/image_of_location?token=ef5e6494-4755-4d45-a5b5-8bbbd3fce265&x=709711.6898004238&y=6204311.79043664&epsg=25832&direction=s&width=512&height=300&radius=1000"
    })
    detailItems.push({
      type: "image",
      label: "Set fra vest",
      value: "https://skraafoto.septima.dk/api/image_of_location?token=ef5e6494-4755-4d45-a5b5-8bbbd3fce265&x=709711.6898004238&y=6204311.79043664&epsg=25832&direction=w&width=512&height=300&radius=1000"
    })
    detailItems.push({
      type: "image",
      label: "Set fra nord",
      value: "https://skraafoto.septima.dk/api/image_of_location?token=ef5e6494-4755-4d45-a5b5-8bbbd3fce265&x=709711.6898004238&y=6204311.79043664&epsg=25832&direction=n&width=512&height=300&radius=1000"
    })
    detailItems.push({
      type: "image",
      label: "Set fra øst",
      value: "https://skraafoto.septima.dk/api/image_of_location?token=ef5e6494-4755-4d45-a5b5-8bbbd3fce265&x=709711.6898004238&y=6204311.79043664&epsg=25832&direction=e&width=512&height=300&radius=1000"
    })



    return detailItems
  }

}
export default ItemsForAddressProvider
