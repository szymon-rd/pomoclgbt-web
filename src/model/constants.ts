import { HelpType, HelpFilter, Location, FlagFiltersState, Institution } from './types'

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


export const SampleInstitutions: Institution[] = [
  {
    id: 'lam',
    name: 'Lambda Warszawa - Telefon Zaufania',
    label: 'Organizacja',
    description: "Jeśli potrzebujesz wsparcia; jeśli chciałabyś lub chciałbyś porozmawiać o trudnej sytuacji Twojej lub bliskiej osoby; jeśli czujesz, że rozmowa może okazać się potrzebna – skontaktuj się z nami.",
    contact: [
      {
        label: 'phone',
        address: 'tel:226285222',
        displayAddress: '22 628 52 22'
      },
      {
        label: 'website',
        address: 'http://lambdawarszawa.org/lambdawarszawa/aktualnosci/telefon-zaufania/',
        displayAddress: 'lambdawarszawa.org'
      }
    ]
  },
  {
    id: 'tec',
    name: 'Stowarzyszenie Tęczówka',
    label: 'Organizacja',
    description: "Działamy na rzecz osób LGBT+. Wspieramy lesbijki, gejów, osoby biseksualne, transpłciowe oraz wszystkie osoby nieheteronormatywne poprzez prowadzenie wsparcia psychologicznego i prawnego. Organizujemy grupy spotkaniowe oraz inne wydarzenia integrujące.",
    contact: [
      {
        label: 'website',
        address: 'https://teczowka.org.pl/pl/pomoc-psychologiczna',
        displayAddress: 'teczowka.org.pl'
      }
    ]
  },
  {
    id: 'kph',
    name: "Kampania przeciw homofobii",
    label: 'Organizacja',
    description: "Jeżeli doświadczasz dyskryminacji na tle orientacji seksualnej lub tożsamości/ekspresji płciowej, udzielimy Ci bezpłatnej pomocy prawnej i psychologicznej.",
    contact: [
      {
        label: 'website',
        address: 'https://kph.org.pl/pomoc/pomoc-psychologiczna/',
        displayAddress: 'kph.org.pl'
      }
    ]
  },
  {
    id: '1',
    name: 'Małgorzata Nowak',
    label: 'Psychoterapeutka',
    description: "Psychoterapeutka doświadczona w pracy z osobami transpłciowymi.",
    contact: [
      {
        label: 'phone',
        address: 'tel:123456789',
        displayAddress: '123 456 789'
      }
    ]
  }
]
