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

class bygningsreglementerForLokalplan extends DetailsHandlerDef {
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
    return ( result.typeId === "vedtagetlokalplan")
  }


  
  async myhandler(result) {

    let options = {}


    let planid = result.id // Planid er id på result
    let url = 'https://furesoe.mapcentia.com/api/v1/sql/furesoe?q=select NULLIF(bemaerkning, \'\') as bemaerkning,NULLIF(reglement_1,\'\') as reglement_1, NULLIF(reglement_2,\'\') as reglement_2,NULLIF(pdf_link3,\'\') as pdf_link3 from _01_fysisk_plan_og_naturbeskyt.lokalplan_vedtaget_reglement WHERE planid=' + planid

    let response = await fetch2(url, options)
    let features =  response.features
    var detailItems = []
    


    features.map(function (f){

    
     if  (f.properties.reglement_1 !== null  )  {
        detailItems.push({
            type: 'link',
            icon:icons.details.link,
            link:  `http://geodocs/pdf/Bygningsreglementer/${f.properties.reglement_1}.pdf`,
            linkTitle: `Bygningsreglement ${f.properties.reglement_1}`
          })
      }
 
      if (f.properties.reglement_2 !== null ) {
          detailItems.push({
            type: 'link',
            icon:icons.details.link,
            link:  `http://geodocs/pdf/Bygningsreglementer/${f.properties.reglement_2}.pdf`,
            linkTitle: `Bygningsreglement ${f.properties.reglement_2}`
          })    
        }
        if (f.properties.pdf_link3 !== null ) {
          detailItems.push({
            type: 'link',
            icon:icons.details.link,
            link:  `http://geodocs/pdf/Lokalplan_oevr_dok/${f.properties.pdf_link3}`,
            linkTitle: `${f.properties.pdf_link3}`
          })    
        }
      else {  
      detailItems.push({
        type: 'labelvalue',
        label: 'Bygningsreglement',
        value: 'Intet bygningsreglement – se lokalplan'

      }) 
    }
  

  
    });
        return detailItems
  }

}
export default bygningsreglementerForLokalplan

