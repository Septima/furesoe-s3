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
      - _type: s3-demomodules/byggeSagerforAddresseJordstykke
        _options:
          header: "Demo details provider"
 * @api
 **/

class byggeSagerforAddresseJordstykke extends DetailsHandlerDef {
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
    //return items for the result
    //MUST be declared async
    //let elav = result.data.properties.jordstykke.ejerlav.kode
    //let matnr = result.data.properties.jordstykke.matrikelnr
    let elav
    let matnr
    let options = {}
    console.log(result.typeId)
    if (result.typeId === "adresse"){
      elav = result.data.properties.jordstykke.ejerlav.kode
      matnr = result.data.properties.jordstykke.matrikelnr
    } else if (result.typeId === "matrikelnumre"){
    
       matnr=result.data.matrnr
       elav=result.data.elavskode
    }

    let url = `https://furesoe.mapcentia.com/api/v1/sql/furesoe?q=select * FROM _02_byggeri.byggesager WHERE  ejerlavskodeglobal =\'${elav}\' AND matrikelnr||trim(matrikelbogstav)=\'${matnr}\' ORDER BY aarstal DESC LIMIT 100` 
    
    let response = await fetch2(url, options)
    let features =  response.features
    var detailItems = []
    
    let detailItemsList = new DetailItemsList({
      itemType: "labelvalue",
      header: "Byggesager",
      infoItemsHeaders: [
        {type: "labelvalue", label: "Årstal"},
        {type: "labelvalue", label: "Journalnummer"},
        {type: "labelvalue", label: "Link"}
      ]
    })

    features.map(function (f){

      detailItemsList.append({
        type: "labelvalue",
        value: f.properties.sagsheadline,
        infoItems: [
          {type: "labelvalue", value: f.properties.aarstal},
          {type: "labelvalue", value: f.properties.journalnr},
          {type: "link", link: f.properties.url,linkTitle: "Se i Weblager"}

        ]
      })

      // detailItems.push({
      //   type: 'link',
      //   icon:icons.details.link,
      //   link: f.properties.url,
      //   linkTitle: f.properties.sagsheadline
      // })
    });
    detailItems.push(detailItemsList.asItem())
        return detailItems
  }

}
export default byggeSagerforAddresseJordstykke

