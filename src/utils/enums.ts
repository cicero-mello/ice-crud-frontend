export const getLastEnumValue = <T extends object>(enumObj: T): number => (
    Math.max(
        ...Object.values(enumObj).filter(v => typeof v === 'number') as number[]
    )
)
