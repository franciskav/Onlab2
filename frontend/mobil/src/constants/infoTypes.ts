import {MainWasteType} from '../model/wasteTypes'

export const WasteTypes: MainWasteType[] = [
  {
    mainType: 'Általános hulladék',
    description: 'Nem lebomló, nem veszélyes hulladékok.',
    types: [
      {
        type: 'Kommunális',
        description:
          'A lakókörnyezetünkben található, nem lebomló, nem veszélyes hulladék.',
      },
      {
        type: 'Lom',
        description:
          'Veszélyes hulladékot nem tartalmazó lom (nagydarabos hulladék).',
      },
    ],
  },
  {
    mainType: 'Újrahasznosítható hulladék',
    description:
      'Minden újrahasznosítható hulladék kizárólag szennyeződés nélkül hasznosítható újra. Ezért minden üveget, dobozt ki kell tisztítani, mielőtt a szelektív hulladékgyűjtőbe dobná.',
    types: [
      {
        type: 'Papír',
        description:
          'Például: újságok, folyóiratok, füzetek, könyvek, hullámpapír, csomagolópapír, papírdoboz, kartondoboz.',
      },
      {
        type: 'Műanyag',
        description:
          'Kizárólag ásványvizes és üdítős (PET) palackok és azok lecsavart kupakjai, műanyag flakonok (PP, HDPE) műanyag szatyrok, fóliák (LDPE) kizárólag csomagolási műanyagok. Tehát az 1, 2, 4, 5 jelzésű anyagok.',
      },
      {
        type: 'Fém',
        description:
          'Például: üdítős- és sörös dobozok, valamint konzervdobozok.',
      },
      {
        type: 'Üveg',
        description:
          'Kizárólag öblös üvegek, valamint a színes és fehér üvegek külön gyűjtve. Például: italos, befőttes és parfümös üvegek.',
      },
      {
        type: 'Komposzt',
        description:
          'Kerti zöldhulladék illetve konyhai hulladék. Fintos azonban, hogy kizárólag feldolgozatlan és növényi élelmiszer, valamint mindenféle vegyszertől mentes hulladék kerülhet komposztálásra.',
      },
    ],
  },
  {
    mainType: 'Veszélyes illetve speciális kezelést igénylő hulladék',
    description:
      'A veszélyes hulladékok közé környezetre, vagy élő szervezetekre ártalmas anyagok tartoznak.',
    types: [
      {
        type: 'Elektromos és elektronikai hulladék',
        description:
          'Például: mosógép, hűtőszekrény, mosogatógép, hajszárító, számítógép, nyomtató, monitor, mobiltelefon.',
      },
      {
        type: 'Fénycsövek és világítótestek',
        description: 'Minden világítótest.',
      },
      {
        type: 'Száraz elemek és kis akkumulátorok',
        description: 'Használt elem és akkumulátor.',
      },
      {
        type: 'Gépjármű akkumulátorok',
        description: 'Savas indítóakkumulátorok.',
      },
      {
        type: 'Sitt',
        description:
          'Veszélyes hulladékot nem tartalmazó építési-bontási hulladék.',
      },
      {
        type: 'Gumiabroncsok',
        description:
          'Csak személyautó, illetve kisteherautó abroncs (teherautó, mezőgazdasági gép abroncs nem).',
      },
      {
        type: 'Fáradt olaj',
        description: 'Konyhai használt olaj és annak flakonja.s',
      },
    ],
  },
]
