/**
 * @module
 */
import DetailsHandlerDef from '@septima/septima-search/src/js/details/DetailsHandlerDef'
import icons from "@septima/septima-search/src/js/resources/icons"
import {fetch2} from "@septima/septima-search/src/js/utils"
import DetailItemsList from "@septima/septima-search/src/js/details/DetailItemsList"

/**
 * Shows some demo details for a Dawa Adress
 * @example <caption>YAML Declaration:</caption>
  dawasearcher:
    _type: Septima.Search.DawaSearcher
    detailhandlers:
      - _type: s3-demomodules/foreningerForAdresse
        _options:
          header: "Demo details provider"
 * @api
 **/

class foreningerForAdresse extends DetailsHandlerDef {
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
    this.handlerFunction = this.myhandler
  }

  isApplicable(result) {
    return ( (result.source === "Dawa" && (result.typeId === "adresse") ||  (result.source === "Kortforsyningen" && (result.typeId === "matrikelnumre")) ) )
  }


  
  async myhandler(result) {

    let options = {}
    let url = `https://furesoe.mapcentia.com/api/v1/sql/furesoe?q=select * FROM _01_fysisk_plan_og_naturbeskyt.matrikulaere_foreninger WHERE st_intersects(st_transform(the_geom,25832),st_setsrid(ST_GeomFromGeoJSON(\'${JSON.stringify(result.geometry)}\'),25832))`
    let response = await fetch2(url, options)
    let features =  response.features
    var detailItems = []
    
    let detailItemsList = new DetailItemsList({
      itemType: "labelvalue",
      header: "Foreninger",
      infoItemsHeaders: [
        {type: "labelvalue", label: "Administrator"},
        {type: "labelvalue", label: "Type"},
        {type: "labelvalue", label: "Formand"},
        {type: "labelvalue", label: "Adresse"},
        {type: "labelvalue", label: "Email"},
        {type: "labelvalue", label: "Telefon"},
        {type: "labelvalue", label: "CVR"}

    ]
      
    })

    features.map(function (f){

      detailItemsList.append({
        type: "labelvalue",
        value: f.properties.forening,
        infoItems: [
          {type: "labelvalue", value: f.properties.administrator || 'Ikke angivet'},
          {type: "labelvalue", value: f.properties.type_mg},
          {type: "labelvalue", value: f.properties.formand_navn},
          {type: "labelvalue", value: f.properties.formand_adresse},
          {type: "labelvalue", value: f.properties.formand_mail},
          {type: "labelvalue", value: f.properties.formand_telefonnr},
          {type: "labelvalue", value: f.properties.cvrnr}
          

        ]
      })


    });
    detailItems.push(detailItemsList.asItem())
        return detailItems
  }

}
export default foreningerForAdresse

