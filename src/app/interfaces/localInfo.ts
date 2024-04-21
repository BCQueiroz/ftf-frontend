import { LocalAdditionalInfo } from "./localAdditionalInfo"

export class LocalInfo {
    idLocal: number = 0
    cdNumberAddress: string = ""
    dhBeginDay: string = ""
    dhEndDay: string = ""
    nmAddress: string = ""
    nmCity: string = ""
    nmLocal: string = ""
    dsWorkshift: string = ""
    localAdditionalInfo: LocalAdditionalInfo = new LocalAdditionalInfo()
}