import { RadioImageItem } from "@/components/radio-image/types"
import { Avatar } from "@/enums"

const folder = "/avatars/"

const svgUrlByAvatar = new Map<Avatar, string>([
    [Avatar.AfroBusinessMan, folder + "afro-business-man.svg"],
    [Avatar.AfroBusinessWoman, folder + "afro-business-woman.svg"],
    [Avatar.AfroFemaleFarmer, folder + "afro-female-farmer.svg"],
    [Avatar.AfroFemaleGraduatedStudent, folder + "afro-female-graduated-student.svg"],
    [Avatar.AfroFemaleScientist, folder + "afro-female-scientist.svg"],
    [Avatar.AfroMaleFarmer, folder + "afro-male-farmer.svg"],
    [Avatar.AfroMaleGraduatedStudent, folder + "afro-male-graduated-student.svg"],
    [Avatar.AfroMaleScientist, folder + "afro-male-scientist.svg"],
    [Avatar.AfroMan, folder + "afro-man.svg"],
    [Avatar.AfroOldBusinessMan, folder + "afro-old-business-man.svg"],
    [Avatar.AfroOldBusinessWoman, folder + "afro-old-business-woman.svg"],
    [Avatar.AfroOldFemaleFarmer, folder + "afro-old-female-farmer.svg"],
    [Avatar.AfroOldMaleFarmer, folder + "afro-old-male-farmer.svg"],
    [Avatar.AfroOldMan, folder + "afro-old-man.svg"],
    [Avatar.AfroOldSportMan, folder + "afro-old-sport-man.svg"],
    [Avatar.AfroOldSportWoman, folder + "afro-old-sport-woman.svg"],
    [Avatar.AfroSportMan, folder + "afro-sport-man.svg"],
    [Avatar.AfroSportWoman, folder + "afro-sport-woman.svg"],
    [Avatar.AfroWoman, folder + "afro-woman.svg"],
    [Avatar.AfroYoungMan, folder + "afro-young-man.svg"],
    [Avatar.AfroYoungWoman, folder + "afro-young-woman.svg"],
    [Avatar.AsianOldMan, folder + "asian-old-man.svg"],
    [Avatar.AsianOldWoman, folder + "asian-old-woman.svg"],
    [Avatar.AsianYoungWoman, folder + "asian-young-woman.svg"],
    [Avatar.BusinessMan, folder + "business-man.svg"],
    [Avatar.BusinessWoman, folder + "business-woman.svg"],
    [Avatar.Clown, folder + "clown.svg"],
    [Avatar.Criminal, folder + "criminal.svg"],
    [Avatar.FemaleFarmer, folder + "female-farmer.svg"],
    [Avatar.FemaleGraduatedStudent, folder + "female-graduated-student.svg"],
    [Avatar.FemaleScientist, folder + "female-scientist.svg"],
    [Avatar.FireFighter, folder + "fire-fighter.svg"],
    [Avatar.Hoodie, folder + "hoodie.svg"],
    [Avatar.IndianWoman, folder + "indian-woman.svg"],
    [Avatar.MaleArtist, folder + "male-artist.svg"],
    [Avatar.MaleFarmer, folder + "male-farmer.svg"],
    [Avatar.MaleMuslim, folder + "male-muslim.svg"],
    [Avatar.MaleScientist, folder + "male-scientist.svg"],
    [Avatar.MuslimMan, folder + "muslim-man.svg"],
    [Avatar.OldBusinessMan, folder + "old-business-man.svg"],
    [Avatar.OldBusinessWoman, folder + "old-business-woman.svg"],
    [Avatar.OldFemaleFarmer, folder + "old-female-farmer.svg"],
    [Avatar.OldMaleFarmer, folder + "old-male-farmer.svg"],
    [Avatar.OldMan, folder + "old-man.svg"],
    [Avatar.OldSportMan, folder + "old-sport-man.svg"],
    [Avatar.OldSportWoman, folder + "old-sport-woman.svg"],
    [Avatar.OldWoman, folder + "old-woman.svg"],
    [Avatar.PartyMan, folder + "party-man.svg"],
    [Avatar.PartyWoman, folder + "party-woman.svg"],
    [Avatar.SportMan, folder + "sport-man.svg"],
    [Avatar.SportWoman, folder + "sport-woman.svg"],
    [Avatar.YoungMan, folder + "young-man.svg"],
])

export const nameByAvatar = new Map<Avatar, string>(
    Array.from(svgUrlByAvatar.entries()).map(([avatar, url]) => {
        const fileName = url.split("/").pop()?.replace(".svg", "") || ""
        const readableName = fileName
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        return [avatar, readableName]
    })
)

export const radioImageAvatars: RadioImageItem[] = Array.from(
    svgUrlByAvatar.entries()
).map(([avatar, svgUrl]) => ({
    imageName: nameByAvatar.get(avatar) ?? "",
    value: avatar,
    imageUrl: svgUrl
}))

export const getSvgUrlByAvatar = (avatar: Avatar): string => (
    svgUrlByAvatar.get(avatar) ?? ""
)
