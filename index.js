import ItemsForAddressProvider from "./src/ItemsForAddressProvider"
import byggeSagerforAddresseJordstykke from "./src/byggeSagerforAddresseJordstykke"
import foreningerForAdresse from "./src/foreningerForAdresse"
import gc2Searcher from "./src/gc2Searcher"
import gc2InfoProvider from "./src/gc2InfoProvider"

import ClassRegistry from "@septima/septima-search/src/js/ClassRegistry"

const demoTypes = new ClassRegistry("s3-furesoe.")

demoTypes.setTypes({
  ItemsForAddressProvider: {
    classdesc: "Shows some demo details for a Dawa Adress"
  },
  byggeSagerforAddresseJordstykke: {
    classdesc: "Shows byggesager for a Dawa Adress"
  },
  foreningerForAdresse: {
    classdesc: "Shows foreninger for a Dawa Adress"
  },
  gc2Searcher: {
    classdesc: "Shows foreninger for a Dawa Adress"
  },
  gc2InfoProvider: {
    classdesc: "Shows foreninger for a Dawa Adress"
  }


})

demoTypes.addClass(ItemsForAddressProvider, "ItemsForAddressProvider")
demoTypes.addClass(byggeSagerforAddresseJordstykke, "byggeSagerforAddresseJordstykke")
demoTypes.addClass(foreningerForAdresse, "foreningerForAdresse")
demoTypes.addClass(gc2Searcher, "gc2Searcher")
demoTypes.addClass(gc2InfoProvider, "gc2InfoProvider")

export default demoTypes
