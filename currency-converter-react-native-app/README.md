## Currency-Converter Mobile App

* This is a mobile app buitl with react-native that allows users to convert a currency amount into another currency.
* The app also allows user's to customize the app theme to various sources.
* The app uses [Fixer.io](htpp:fixer.io/)- as the API to get the conversion rates.

## Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start -- --reset-cache
# or
yarn start -- --reset-cache
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

##### Using Android Studio's `adb`

1. Make sure that you can run adb from your terminal.
2. Open Genymotion and navigate to `Settings -> ADB`. Select “Use custom Android SDK tools” and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

##### Using Genymotion's `adb`

1. Find Genymotion’s copy of adb. On macOS for example, this is normally `/Applications/Genymotion.app/Contents/MacOS/tools/`.
2. Add the Genymotion tools directory to your path (instructions for [Mac](http://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/), [Linux](http://www.computerhope.com/issues/ch001647.htm), and [Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/)).
3. Make sure that you can run adb from your terminal.

#### `npm run eject`

This will start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project.

**Warning:** Running eject is a permanent action (aside from whatever version control system you use). An ejected app will require you to have an [Xcode and/or Android Studio environment](https://facebook.github.io/react-native/docs/getting-started.html) set up.

## Customizing App Display Name and Icon

You can edit `app.json` to include [configuration keys](https://docs.expo.io/versions/latest/guides/configuration.html) under the `expo` key.

To change your app's display name, set the `expo.name` key in `app.json` to an appropriate string.

To set an app icon, set the `expo.icon` key in `app.json` to be either a local path or a URL. It's recommended that you use a 512x512 png file with transparency.

## Writing and Running Tests

This project is set up to use [jest](https://facebook.github.io/jest/) for tests. You can configure whatever testing strategy you like, but jest works out of the box. Create test files in directories called `__tests__` or with the `.test` extension to have the files loaded by jest. See the [the template project](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/App.test.js) for an example test. The [jest documentation](https://facebook.github.io/jest/docs/getting-started.html) is also a wonderful resource, as is the [React Native testing tutorial](https://facebook.github.io/jest/docs/tutorial-react-native.html).

## Environment Variables

You can configure some of Create React Native App's behavior using environment variables.

### Configuring Packager IP Address

When starting your project, you'll see something like this for your project URL:

```
exp://192.168.0.2:19000
```

The "manifest" at that URL tells the Expo app how to retrieve and load your app's JavaScript bundle, so even if you load it in the app via a URL like `exp://localhost:19000`, the Expo client app will still try to retrieve your app at the IP address that the start script provides.

In some cases, this is less than ideal. This might be the case if you need to run your project inside of a virtual machine and you have to access the packager via a different IP address than the one which prints by default. In order to override the IP address or hostname that is detected by Create React Native App, you can specify your own hostname via the `REACT_NATIVE_PACKAGER_HOSTNAME` environment variable:

Mac and Linux:

```
REACT_NATIVE_PACKAGER_HOSTNAME='my-custom-ip-address-or-hostname' npm start
```

Windows:
```
set REACT_NATIVE_PACKAGER_HOSTNAME='my-custom-ip-address-or-hostname'
npm start
```

The above example would cause the development server to listen on `exp://my-custom-ip-address-or-hostname:19000`.

## Data design
{
  themes: {
    primaryColor: String',
  },
  currencies: {
    baseCurrency: String,
    quoteCurrency: String,
    amount: Number,
    conversions: {
      [CURRENCY_STRING]: {
        isFetching: Boolean,
        date: String, // from api
        base: String, // from api
        rates: { // from api
          [CURRENCY_STRING]: Number,
          ...
        },
      }
    }
  }
}

## Data Design example
{
  "themes": {
    primaryColor: '#4F6D7A',
  },
  "currencies": {
    "baseCurrency": "USD",
    "quoteCurrency": "GBP",
    "amount": 100,
    "conversions": {
      "USD": {
        "isFetching": false,
        "base": "USD",
        "date": "2017-05-31",
        "rates": {
          "AUD": 1.3416,
          "BGN": 1.743,
          "BRL": 3.2515,
          "CAD": 1.3464,
          "CHF": 0.97104,
          "CNY": 6.813,
          "CZK": 23.547,
          "DKK": 6.6302,
          "GBP": 0.77858,
          "HKD": 7.7908,
          "HRK": 6.6068,
          "HUF": 273.77,
          "IDR": 13308,
          "ILS": 3.5431,
          "INR": 64.463,
          "JPY": 110.86,
          "KRW": 1118.4,
          "MXN": 18.765,
          "MYR": 4.281,
          "NOK": 8.4117,
          "NZD": 1.4071,
          "PHP": 49.77,
          "PLN": 3.7173,
          "RON": 4.0687,
          "RUB": 56.774,
          "SEK": 8.6942,
          "SGD": 1.3829,
          "THB": 34.07,
          "TRY": 3.5366,
          "ZAR": 13.133,
          "EUR": 0.89119
        }
      }
    }
  }
}
