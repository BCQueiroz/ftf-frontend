import { TagInfo } from "./tagInfo"

export class LocalInfo {
    idLocal: number = 0
    cdNumberAddress: string = ""
    dhBeginDay: string = ""
    dhEndDay: string = ""
    nmAddress: string = ""
    nmCity: string = ""
    nmLocal: string = ""
    dsWorkshift: string = ""
    isSaved: boolean = false
    tagList: Array<TagInfo> = []
}