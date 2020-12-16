/**
 * @module
 */
import DetailsHandlerDef from '@septima/septima-search/src/js/details/DetailsHandlerDef'

export default class gc2InfoProvider extends DetailsHandlerDef {

    constructor(options) {
        let defaultOptions = {
            buttonText: "Om",
            more: true
        }
        super(Object.assign(defaultOptions, options))
        this.isApplicableFunction = this.isApplicable
        this.handlerFunction = this.myhandler

        //Default fields
        this.fields = {}
        this.fields.matrikulaere_foreninger = ["gid", "administrator"]
        this.fields.stoej = ["gid", "isov1", "isov2"]
        this.fields.tingbog_servitutter = ["dokid", "servituttekst", "servituttype"]

        //Read fields from options
        if (typeof options !== 'undefined' && typeof options.fields !== 'undefined')
            if (typeof options.fields.matrikulaere_foreninger !== 'undefined')
                this.fields.matrikulaere_foreninger = options.fields.matrikulaere_foreninger
        if (typeof options.fields.stoej !== 'undefined')
            this.fields.stoej = options.fields.stoej
        if (typeof options.fields.tingbog_servitutter !== 'undefined')
            this.fields.tingbog_servitutter = options.fields.tingbog_servitutter
    }

    isApplicable(result) {
        return (result.source === "furesoe")
    }

    async myhandler(result) {


        let items = []


        if (result.typeId === "tingbog_servitutter")
            for (let field of this.fields.tingbog_servitutter) {
                let item = await this.create_tingbog_servitutter_Item(result, field)
                if (typeof item !== 'undefined') {
                    items.push(item)
                }
            }

        if (result.typeId === "matrikulaere_foreninger")
            for (let field of this.fields.matrikulaere_foreninger) {
                let item = await this.create_matrikulaere_foreninger_Item(result, field)
                if (typeof item !== 'undefined') {
                    items.push(item)
                }
            }
        if (result.typeId === "stoej")
            for (let field of this.fields.stoej) {
                let item = await this.create_stoej_Item(result, field)
                if (typeof item !== 'undefined') {
                    items.push(item)
                }
            }
        return items

    }

    create_tingbog_servitutter_Item(result, field) {
        let props = result.data.properties
        if (field === 'dokid')
            return {
                type: 'labelvalue',
                label: 'Dokid',
                value: props.dokid
            }
        if (field === 'historiskid')
            return {
                type: 'labelvalue',
                label: 'Historisk id',
                value: props.historiskid
            }
        else if (field === 'servituttekst')
            return {
                type: 'labelvalue',
                label: 'Servituttekst',
                value: props.servituttekst || 'Ikke angivet'

            }
        if (field === 'servituttype')
            return {
                type: 'labelvalue',
                label: 'Servituttype',
                value: props.servituttype
            }
        if (field === 'tingdato')
            return {
                type: 'labelvalue',
                label: 'Tingdato',
                value: props.tingdato
            }
        if (field === 'paategndato')
            return {
                type: 'labelvalue',
                label: 'Påtegnet dato',
                value: props.paategndato
            }
        if (field === 'ogsaalystpaa')
            return {
                type: 'labelvalue',
                label: 'Også lyst på',
                value: props.ogsaalystpaa
            }
        if (field === 'dokfilnavn')
            return {
                type: 'link',
                linkTitle: 'Se Dokument',
                link: props.dokfilnavn
            }
        if (field === 'digitalservitut')
            return {
                type: 'labelvalue',
                label: 'Digital servitut',
                value: props.digitalservitut
            }
        if (field === 'paatalecvr')
            return {
                type: 'labelvalue',
                label: 'Påtale CVR',
                value: props.paatalecvr
            }
        if (field === 'paataleberettiget')
            return {
                type: 'labelvalue',
                label: 'Påtale berettiget',
                value: props.paataleberettiget
            }

        else if (field === 'label')
            return {
                type: 'labelvalue',
                label: 'Label',
                value: props.label || 'Ikke angivet'

            }
        else if (field === 'note')
            return {
                type: 'labelvalue',
                label: 'Note',
                value: props.note || 'Ikke angivet'

            }
            else if (field === 'fra_side')
            return {
                type: 'labelvalue',
                label: 'Fra side',
                value: props.fra_side || 'Ikke angivet'

            }
            else if (field === 'til_side')
            return {
                type: 'labelvalue',
                label: 'Til side',
                value: props.til_side || 'Ikke angivet'

            }
            else if (field === 'bruger')
            return {
                type: 'labelvalue',
                label: 'Bruger',
                value: props.bruger || 'Ikke angivet'

            }
            else if     (field === 'oprettet_dato')
            return {
                type: 'labelvalue',
                label: 'Oprettet',
                value: props.oprettet_dato || 'Dato ikke angivet'

            }
        return
    }

    create_stoej_Item(result, field) {
        let props = result.data.properties
        if (field === 'gid')
            return {
                type: 'labelvalue',
                label: 'gid',
                value: props.gid
            }
        else if (field === 'isov1')
            return {
                type: 'labelvalue',
                label: 'Isov1 (dB)',
                value: props.isov1 || 'Ikke angivet'

            }
        else if (field === 'isov2')
            return {
                type: 'labelvalue',
                label: 'Isov2 (dB)',
                value: props.isov2

            }

        return
    }
    create_matrikulaere_foreninger_Item(result, field) {
        let props = result.data.properties
        if (field === 'gid')
            return {
                type: 'labelvalue',
                label: 'gid',
                value: props.gid
            }
        else if (field === 'administrator')
            return {
                type: 'labelvalue',
                label: 'Administrator',
                value: props.administrator || 'Ikke angivet'

            }
        else if (field === 'formand')
            return {
                type: 'labelvalue',
                label: 'Formand',
                value: props.formand_navn

            }
        else if (field === 'formand_adresse')
            return {
                type: 'labelvalue',
                label: 'Adresse (formand)',
                value: props.formand_adresse
            }
        else if (field === 'formand_mail')
            return {
                type: 'labelvalue',
                label: 'Email (formand)',
                value: props.formand_mail

            }
        else if (field === 'formand_telefonnr')
            return {
                type: 'labelvalue',
                label: 'Telefon (formand)',
                value: props.formand_telefonnr

            }
        else if (field === 'type_mg')
            return {
                type: 'labelvalue',
                label: 'Type',
                value: props.type_mg

            }
        else if (field === 'weblink') {
            if (this.hasvalue(props.weblink)) {
                return {
                    type: 'link',
                    label: 'Weblink',
                    link: props.weblink || 'Ikke angivet',
                    linkTitle: 'Se hjemmeside'
                }
            }
            else {
                return {
                    type: 'labelvalue',
                    label: '    Weblink',
                    link: props.weblink || 'Ikke angivet'
                }
            }
        }
        else if (field === 'cvrnr')
            return {
                type: 'labelvalue',
                label: 'CVR',
                value: props.cvrnr

            }
        else if (field === 'overordnet')
            return {
                type: 'labelvalue',
                label: 'Overordnet',
                value: props.overordnet || 'Ikke angivet'

            }
        else if (field === 'medlemspligt')
            return {
                type: 'labelvalue',
                label: 'Medlemspligt',
                value: props.medlemspligt || 'Ikke angivet'

            }
        else if (field === 'medlemspligt_jf')
            return {
                type: 'labelvalue',
                label: 'Medlemspligt jf',
                value: props.medlemspligt_jf || 'Ikke angivet'

            }
        else if (field === 'link') {
            if (this.hasvalue(props.link)) {
                return {
                    type: 'link',
                    label: 'Medlemspligt Link',
                    link: props.link || 'Ikke angivet',
                    linkTitle: props.link
                }
            }
            else {
                return {
                    type: 'labelvalue',
                    label: 'Link jf',
                    link: props.link || 'Ikke angivet'
                }
            }
        }
        else if (field === 'dato_ajour')
            return {
                type: 'labelvalue',
                label: 'Dato ajour',
                value: props.dato_ajour || 'Ikke angivet'

            }
        return
    }
    hasvalue(item) {
        if (typeof item !== 'undefined') {
            if (item !== '' && item !== null)
                return true
        }
        return false
    }
}


