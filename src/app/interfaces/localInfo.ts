import { LocalAdditionalInfo } from "./localAdditionalInfo"

export class LocalInfo {
    idLocal: number = 0
    cdNumberAddress: string = ""
    dhBeginDay: string = ""
    dhEndDay: string = ""
    nmAddress: string = ""
    nmCity: string = ""
    nmLocal: string = ""
    localAdditionalInfo: LocalAdditionalInfo = new LocalAdditionalInfo()
}