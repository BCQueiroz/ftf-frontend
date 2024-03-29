import { TagInfo } from "./tagInfo"


export interface LocalAdditionalInfo{
    nmLocal: string
    dsPhone: string
    dsAddress: string
    dsSite: string
    dsAproxPrice: string
    dsLocal: string
    dsWorkdays: Array<string>
    tagList: Array<TagInfo>
}