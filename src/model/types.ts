export interface AppState {
  city: Location,
  helpType: HelpType
}

export enum HelpType {
  NONE = 'none', EMOTIONS = 'emotions', LAW = 'law'
}

export type Location = City | null

export interface City {
  id: number,
  name: string,
}

export const Cities: Location[] = [
  {
    id: 0,
    name: "Kraków"
  },
  {
    id: 1,
    name: "Gdańsk"
  },
  {
    id: 2,
    name: "Poznań"
  },
  {
    id: 3,
    name: "Lublin"
  }
]

export interface Action {
  type: String,
  payload: any
}
