// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    // Initialize Firebase
  firebase: {
    apiKey: 'AIzaSyAWuZPqs2qkfFGBszOCwa2tORkC_Di7AH0',
    authDomain: 'fitnes-app-2.firebaseapp.com',
    databaseURL: 'https://fitnes-app-2.firebaseio.com',
    projectId: 'fitnes-app-2',
    storageBucket: 'fitnes-app-2.appspot.com',
    messagingSenderId: '207179105473'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
