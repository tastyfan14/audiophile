export const BREAKPOINTS = {
    Mobile: 375,
    MobileIn: 327,
    Laptop: 768,
    LaptopIn: 689,
    Desktop: 1440,
    DesktopIn: 1110,

    PreLaptop: 512, // Calculation formula: / 3, x 2
    PostMobile: 437, // Calculation formula: / 3, / 2, x 7 - 0.5
} as const

export const SHIPPING = 50
export const VAR_RATE = 0.2