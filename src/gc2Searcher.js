/**
 * @module
 */
import ResultType from "@septima/septima-search/src/js/ResultType"
import Searcher from "@septima/septima-search/src/js/searchers/Searcher"


/**
 *
 * @extends module:js/searchers/Searcher
 * @example <caption>YAML Declaration: <a href='../examples/fkgsearcher/'>Example</a></caption>
  _type: Septima.Search.FkgSearcher
  _options:
    minimumShowCount: 3

    targets:
      - t_5710_born_skole_dis_t
 * @example <caption> JS options: </caption>
 options = {

  };
 * @example <caption>js client:</caption>
 * // Include septimaSearch
 * <script type="text/javascript" src="http://search.cdn.septima.dk/{version}/septimasearch.min.js"/>
 * controller.addSearcher(new Septima.Search.FkgSearcher(options))
 *
 * @example <caption>ES6:</caption>
 * import FkgSearcher from './searchers/FkgSearcher'
 * controller.addSearcher(new FkgSearcher(options))
 */


export default class gc2Searcher extends Searcher {
  /**
   *
   * @param {Object} options FkgSearcher expects these properties:

   * @api
   */
  constructor(options = {}) {

    let defaultOptions = {
      host: "https://furesoe.mapcentia.com/api/v1/sql/furesoe"
    }

    super(Object.assign(defaultOptions, options))
    this.source = "furesoe"

    if (options.source) 
      this.source = options.source
 
    this.targets = ['matrikulaere_foreninger']
    this.host = "https://furesoe.mapcentia.com/api/v1/sql/furesoe"   
    if (typeof options !== 'undefined' && typeof options.targets !== 'undefined')
      this.targets = options.targets
    
    if (typeof options !== 'undefined' && typeof options.host !== 'undefined')
      this.host = options.host
 
    
    this.types = {
      "matrikulaere_foreninger": new ResultType({id: "matrikulaere_foreninger", singular: "Forening", plural: "Foreninger", queryBehaviour: "search", featuretype:"_01_fysisk_plan_og_naturbeskyt.matrikulaere_foreninger"}),
      "tingbog_servitutter": new ResultType({id: "tingbog_servitutter", singular: "Servitut", plural: "Servitutter", queryBehaviour: "search", featuretype:"_00_grundkort.vw_tingbog_servitutter_udbredelse"}),
      "stoej": new ResultType({id: "stoej", title: "${feature.properties.isov1} - ${feature.properties.isov2} dBXX", singular: "Støjmåling", plural: "Støjmålinger", queryBehaviour: "search", featuretype:"_09_miljoebeskyttelse.vejstoej"})

 
    }

    this.registerType(this.source, this.types.matrikulaere_foreninger)
    this.registerType(this.source, this.types.tingbog_servitutter)
    this.registerType(this.source, this.types.stoej)

  }

  async completeResult(result) {
    if (result.isComplete) {
      return result
    } else {
      let gotResult = await this.get(result.id, result.typeId)
      result.geometry = gotResult.geometry
      result.data = gotResult.data
      result.isComplete = true
      return result
    }
  }


  async fetchData(query, caller) {
    const queryResult = this.createQueryResult()
    

    let fetchPromises = []

    //Process fetch promises
    let featuresArray = await Promise.all(fetchPromises)
    for ( let features of featuresArray ) 
      if (features.length === 1)
        this.addFeatureToQueryResult(features[0], queryResult)


    caller.fetchSuccess(queryResult)
  }
  
  async get(id, type) {
    let queryResult = this.createQueryResult()
    //let featuretype = this.types.matrikulaere_foreninger.values.featuretype
    let featuretype =this.types[type].values.featuretype
    let features = await this.fetch_gc2_ById(id,featuretype)
    if (features.length === 1)
      this.addFeatureToQueryResult(features[0], queryResult)    
    let results = queryResult.getResults()
    if (results.length === 1)
      return results[0]
  }
  
  addFeatureToQueryResult(feature, queryResult) {
    let typeId = this.featureToTypeId(feature)
    let title
    let description

   
  if (typeId==this.types.matrikulaere_foreninger.id) {
      title = feature.properties.forening
      description = `${feature.properties.forening}- ${feature.properties.type_mg}`
  }
  if (typeId==this.types.tingbog_servitutter.id) {
    title = feature.properties.label
    description = feature.properties.servituttype
}    
  if (typeId==this.types.stoej.id) {
    if (feature.properties.isov1 ==0)
      title = 'Under tærskel (<58 dB)'
    title = `${feature.properties.isov1} - ${feature.properties.isov2} dB`
    description = `Vejstøj 2018`
}   
    let geometry = feature.geometry
    let result = queryResult.addResult(this.source, typeId, title, description, geometry, feature)
    result.id = feature.properties.gid
    if (typeId==this.types.tingbog_servitutter.id)
    result.id = feature.properties.gid
    return result
  }

  featureToTypeId(feature) {
    let featureType = feature.properties.typename.split('.')[1]
    let type
    Object.entries(this.types).map(obj => {
      let thisType = obj[1]
      let ft = thisType.values.featuretype.split('.')[1]
      if (ft === featureType)
        type = thisType
    })
    return type.id
  }

  getTypenameFromTarget(target, types) {
    let typeName
    Object.entries(types).forEach(entry => {
      let resultType = entry[1]
      if (resultType.id === target)
        typeName = resultType.values.featuretype
    })
    return typeName
  }
  
  async sq(query) {
    let queryResult = this.createQueryResult()
    let fetchPromises = []
    let typeNamesAbekat = []
    let wkt = query.wkt
    

  
    if (this.targets.indexOf('matrikulaere_foreninger') > -1)
      typeNamesAbekat.push(this.getTypenameFromTarget('matrikulaere_foreninger', this.types))
    if (this.targets.indexOf('tingbog_servitutter') > -1)
      typeNamesAbekat.push(this.getTypenameFromTarget('tingbog_servitutter', this.types))
    
    if (this.targets.indexOf('stoej') > -1)
      typeNamesAbekat.push(this.getTypenameFromTarget('stoej', this.types))
    
    if (typeNamesAbekat.length > 0)
      fetchPromises.push(this.fetchFeatures(typeNamesAbekat.join(","), wkt))
    


    //Process fetch promises
    let featuresArray = await Promise.all(fetchPromises)
    for ( let features of featuresArray )
      for (let feature of features) {
        let result = this.addFeatureToQueryResult(feature, queryResult)
        result.distance = 0
      }
    return queryResult
  }



  async fetch_gc2_ById(id,featuretype) {
    let typename= featuretype.split('.')[1]
    let response
    console.log(`${this.host}?srs=25832&q=select \'${featuretype}\' as typename, * from ${featuretype} where dokid='${id}'`)
    if (typename ==="vw_tingbog_servitutter_udbredelse"){
      response = await this.fetch(`${this.host}?srs=25832&q=select \'${featuretype}\' as typename, * from ${featuretype} where gid='${id}'`)
    }
    else {
      response = await this.fetch(`${this.host}?srs=25832&q=select \'${featuretype}\' as typename, * from ${featuretype} where gid=${id}`)
    }
    if (response && response.features)
      return response.features
    else 
      return []
  }    
  async fetchFeatures(typename, wkt) {

    //let endPoint  = "https://fkg.mapcentia.com/api/v2/sql/fkg"
    let endPoint = this.host
    let q= `SELECT \'${typename}\' as typename, * FROM ${typename} WHERE st_intersects(the_geom,st_setsrid(st_geometryFromText('${wkt}'),25832))`
    if (typename==='_00_grundkort.vw_tingbog_servitutter_udbredelse')
      q= `SELECT \'${typename}\' as typename, the_geom as the_geom,gid,label,servituttekst,dokid,dokfilnavn FROM ${typename} WHERE st_intersects(the_geom,st_setsrid(st_geometryFromText('${wkt}'),25832))`
    let result
    result = await this.fetch(`${endPoint}?srs=25832&q=${q}`)

    return result.features
  }
}

