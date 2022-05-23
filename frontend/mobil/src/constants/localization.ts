import LocalizedStrings from 'react-native-localization'

export const Strings = new LocalizedStrings({
  hu: {
    splash: {
      recycleBin: 'Közösségi\nRecycle Bin',
    },
    login: {
      title: 'Bejelentkezés',
      recycleBin: 'Közösségi\nRecycle Bin',
      email: 'Email cím',
      password: 'Jelszó',
      login: 'Bejelentkezés',
      dontHaveAccount: 'Még nincs fiókod?',
      signUp: 'Regisztrájl',
    },
    signUp: {
      title: 'Regisztráció',
      email: 'Email cím',
      name: 'Név',
      password: 'Jelszó',
      passwordAgain: 'Jelszó megerősítés',
      signUp: 'Regisztráció',
      alreadyHaveAccount: 'Már van fiókod?',
      login: 'Jelentkezz be',
    },
    map: {
      title: '',
      empty: 'Nincs megjeleníthető gyűjtőhely',
    },
    info: {
      title: 'Hulladék kisokos',
    },
    addLocation: {
      title: 'Új hulladékgyűjtő',
      name: 'Hely neve',
      address: 'Cím',
      zipCode: 'Irányító szám',
      city: 'Város',
      streetAddress: 'Utca, házszám',
      wasteType: 'Leadható hulladék típusok',
      add: 'Hozzáad',
    },
    editLocation: {
      title: 'Módosítás',
      name: 'Hely neve',
      address: 'Cím',
      zipCode: 'Irányító szám',
      city: 'Város',
      streetAddress: 'Utca, házszám',
      wasteType: 'Leadható hulladék típusok',
      comment: 'Megjegyzés',
      modify: 'Módosítás',
      delete: 'Törlés',
    },
    filter: {
      title: 'Szűrés',
      done: 'Alkalmaz',
    },
    errors: {
      empty: 'A mező kitöltése kötelező',
      invalidEmail: 'Nem megfelelő formátumú email cím',
      differentPasswords: 'A két jelszó nem egyforma',
    },
    alert: {
      error: 'Hiba történt!',
      success: 'Siker',
      emailAlreadyInUse: 'Az email cím már használatban van',
      tryLater: 'Kérjük próbálja meg újra',
      addSuccess: 'Hozzáadási kérelme sikeresen elküldve',
      editSuccess: 'Módosítási kérelme sikeresen elküldve',
      deleteSuccess: 'Törlési kérelme sikeresen elküldve',
      ok: 'Oké',
    },
  },
})
