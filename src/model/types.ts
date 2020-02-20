

export interface FiltersState {
  filtersShown: boolean,
  city: Location,
  helpType: HelpType,
  flags: {
    psychiatrist: boolean,
    therapist: boolean,
    instantHelp: boolean,
    organization: boolean,
    lawHelp: boolean,
    lawyer: boolean
  }
}

export interface AppState {
  filters: FiltersState
}

export enum HelpType {
  NONE = 'none', EMOTIONS = 'emotions', LAW = 'law'
}

export type Location = City | null

export interface City {
  id: number,
  name: string,
}

export interface HelpSubType {
  id: number,
  name: string,
  label: string
}

export const HelpSubTypes: Record<HelpType, HelpSubType[]> = {
  'emotions': [
    {
      id: 0,
      name: 'Natychmiastowa pomoc',
      label: 'ins'
    },
    {
      id: 1,
      name: 'Psycholog',
      label: 'th'
    },
    {
      id: 2,
      name: 'Psychiatra',
      label: 'psy'
    },
    {
      id: 3,
      name: 'Organizacja',
      label: 'org'
    }
  ],
  'law': [
    {
      id: 4,
      name: 'Porada prawna',
      label: 'ask'
    },
    {
      id: 5,
      name: 'Prawnik',
      label: 'law'
    },
    {
      id: 6,
      name: 'Organizacja',
      label: 'org'
    },
  ],
  'none': [

  ]
}

export const AllSubTypes = HelpSubTypes.emotions.concat(HelpSubTypes.law)

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

export const idToCity = (id: number) => {
  return Cities.find(c => c?.id == id)
}
