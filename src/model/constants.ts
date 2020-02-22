import { HelpType, HelpFilter, Location, FlagFiltersState } from './types'

export const HelpFilters: HelpFilter[] = [
  {
    helpTypes: [HelpType.EMOTIONS],
    id: 0,
    name: 'Natychmiastowa pomoc',
    label: 'ins',
    stateVar: 'instantHelp'
  },
  {
    helpTypes: [HelpType.EMOTIONS],
    id: 1,
    name: 'Psycholog',
    label: 'th',
    stateVar: 'therapist'
  },
  {
    helpTypes: [HelpType.EMOTIONS],
    id: 2,
    name: 'Psychiatra',
    label: 'psy',
    stateVar: 'psychiatrist'
  },
  {
    helpTypes: [HelpType.EMOTIONS, HelpType.LAW],
    id: 3,
    name: 'Organizacja',
    label: 'org',
    stateVar: 'organization'
  },
  {
    helpTypes: [HelpType.LAW],
    id: 4,
    name: 'Porada prawna',
    label: 'ask',
    stateVar: 'lawHelp'
  },
  {
    helpTypes: [HelpType.LAW],
    id: 5,
    name: 'Prawnik',
    label: 'law',
    stateVar: 'lawyer'
  }
]

export const HelpFiltersForType: Record<HelpType, HelpFilter[]> = {
  [HelpType.EMOTIONS]: HelpFilters.filter(f => f.helpTypes.includes(HelpType.EMOTIONS)),
  [HelpType.LAW]: HelpFilters.filter(f => f.helpTypes.includes(HelpType.LAW)),
  [HelpType.NONE]: HelpFilters,
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

export const idToCity = (id: number) => {
  return Cities.find(c => c?.id == id)
}

export const helpFiltersArrayToState = (array: boolean[]): FlagFiltersState => {
  var obj: FlagFiltersState = {}
  for(var i = 0; i < array.length; i++) {
    obj = Object.assign({}, obj, {[HelpFilters[i].stateVar]: array[i]})
  }
  return obj
}
