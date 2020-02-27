import { HelpType, FlagFiltersState, Location } from '../model/types';
import { SampleInstitutions } from '../model/constants';

export class InstitutionService {
  public fetchInstitutions(
    helpType: HelpType,
    helpFilters: FlagFiltersState,
    city: Location,
    search: string,
    start: number,
    end: number
  ) {
    return SampleInstitutions.slice(start, end)
  }

  public fetchInstitutionCount(
    helpType: HelpType,
    helpFilters: FlagFiltersState,
    city: Location,
    search: string
  ) {
    return SampleInstitutions.length
  }
}
