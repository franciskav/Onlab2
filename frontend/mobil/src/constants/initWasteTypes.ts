import {MainType} from '../model/wasteTypes'

export const initTypes: MainType[] = [
  {
    mainType: 'Általános hulladék',
    isChecked: false,
    types: [
      {
        type: 'kommunális',
        isChecked: false,
      },
      {
        type: 'lom',
        isChecked: false,
      },
    ],
  },
  {
    mainType: 'Újrahasznosítható hulladék',
    isChecked: false,
    types: [
      {
        type: 'papír',
        isChecked: false,
      },
      {
        type: 'műanyag',
        isChecked: false,
      },
      {
        type: 'fém',
        isChecked: false,
      },
      {
        type: 'üveg',
        isChecked: false,
      },
      {
        type: 'komposzt',
        isChecked: false,
      },
    ],
  },
  {
    mainType: 'Veszélyes illetve speciális kezelést igénylő hulladék',
    isChecked: false,
    types: [
      {
        type: 'elektromos és elektronikai hulladék',
        isChecked: false,
      },
      {
        type: 'fénycsövek és világítótestek',
        isChecked: false,
      },
      {
        type: 'száraz elem és akkumulát',
        isChecked: false,
      },
      {
        type: 'gépjármű akkumulátor',
        isChecked: false,
      },
      {
        type: 'sitt',
        isChecked: false,
      },
      {
        type: 'gumiabroncs',
        isChecked: false,
      },
      {
        type: 'fáradt olaj',
        isChecked: false,
      },
    ],
  },
]
