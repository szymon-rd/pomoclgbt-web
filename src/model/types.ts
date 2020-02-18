export interface AppState {
  city: Location,
  helpType: HelpType
}

export enum HelpType {
  NONE, EMOTIONS, LAW
}

export type Location = String | null

export const Cities = ["Kraków, Małopolskie", "Gdańsk, Pomorskie", "Poznań, Wielkopolskie", "Warszawa, Mazowieckie", "Lublin, Lubelskie"]
