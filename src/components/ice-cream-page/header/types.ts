import { IceCreamBaseType } from "@/enums"

export interface HeaderProps {
    iceCreamName: string
    editMode: boolean
    iceCreamId: string
    ballsNumber: number
    baseType: IceCreamBaseType
}
