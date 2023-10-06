This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
npm start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
npm run android
```

### For iOS

```bash
npm run ios
```

# Project Setup

## Installing NativeWind

### Step 1:

Install nativewind and tailwind css.

```bash
npm install nativewind
```

```bash
npm install -D tailwindcss@3.3.2
```

### Step 2:

Create the `tailwind.config.js` file and edit in the following way.

```bash
npx  tailwindcss init
```

```
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [],
}
```

### Step 3:

Add the Babel pluging by editing the `babel.config.js` file.

```
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ["nativewind/babel"],
};
```

### Step 4:

Create the `app.d.ts` file with the following content.

`/// <reference types="nativewind/types" />`

### Step 5:

Restart Metro.

```bash
npm run start --reset-cache
```

Start styling.

`<Text className="text-red-500">This is a text.</Text>`


## Set Up Fastlane

### Create The Fasfile

Create a folder named `./fastlane` in the root directory of the project

Inside that folder create a file named `Fasfile` with the following content:

```
platform :android do
    desc 'Build the Android application.'
    lane :build do
        gradle(task: 'clean', project_dir: 'android/')
        gradle(task: 'assemble', build_type: 'release', project_dir: 'android/')
    end
end
```

### Install rbenv

#### Step 1

Install rbenv using `brew`

```bash
brew install rbenv ruby-build
```

#### Step 2

Install a ruby version.

```bash
rbenv install 3.0.4
```

#### Step 3

Apply a version to your local environment.

```bash
rbenv local 3.0.4
```

### Install Bundler

#### Step 1

Run the following command:

```bash
gem install bundler
```

#### Step 2

Add `gem "fastlane"` to the ./Gemfile in the root directory of the project.

#### Step 3

Run the following command:

```bash
bundle update
```

### Generate an upload key

#### Step 1

Find the JDK bin folder path by running the following command:

```bash
/usr/libexec/java_home
```

The output of this command will be something like this:

`/Library/Java/JavaVirtualMachines/jdk-XX.jdk/Contents/Home`

#### Step 2

Navigate to the JDK bin folder.

```bash
cd /Library/Java/JavaVirtualMachines/jdk-XX.jdk/Contents/Home
```

Generate an upload key.

```bash
sudo keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

>Make sure to edit the key and alias name.

#### Step 3

Move the key to the App `android/app` directory.

```bash
sudo mv my-release-key.keystore AppName/android/app
```

>Make sure to edit the app directory path.

#### Step 4

Set up Gradle variables. Edit the file `~/.gradle/gradle.properties` with the following content:

```
APPNAME_UPLOAD_STORE_FILE=my-upload-key.keystore
APPNAME_UPLOAD_KEY_ALIAS=my-key-alias
APPNAME_UPLOAD_STORE_PASSWORD=*****
APPNAME_UPLOAD_KEY_PASSWORD=*****
```

>This is the information entered at the upload key creation prompt.

#### Step 5

Add the signing configuration to the app's Gradle config. Edit the file `android/app/build.gradle` in the project folder.

```
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('APPNAME_UPLOAD_STORE_FILE')) {
                storeFile file(APPNAME_UPLOAD_STORE_FILE)
                storePassword APPNAME_UPLOAD_STORE_PASSWORD
                keyAlias APPNAME_UPLOAD_KEY_ALIAS
                keyPassword APPNAME_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

>Make sure to use here the same variable names used in the `~/.gradle/gradle.properties` file.

#### Step 6

Run the following command to build the app:

```bash
bundle exec fastlane android build
```

## Set up a Beta Deployment to App Center

### Create an App Center account

#### Step 1

Go to [**App Center**](https://appcenter.ms/)

#### Step 2

Click on `Start Free` and create an account.

#### Step 3

Click on `Add new app` and enter the required information.

#### Step 4

Once the app is created go to the `Settings` menu on the left. In `Settings` go to `App API tokens` and create a new token. Copy the token at this moment, this is the only time that it would be possible and you will need it in the next step.

#### Step 5

Add the following environment variables to the environment variables file.

```
APPCENTER_API_TOKEN="123456asdfg"
APPCENTER_OWNER_NAME="owner-name"
APPCENTER_APP_NAME="my-app"
APPCENTER_DISTRIBUTE_APK="./android/app/build/outputs/apk/release/app-release.apk"
```

>The value for `APPCENTER_OWNER_NAME` and `APPCENTER_APP_NAME` should be written as they appear on the App Center URL (e.g. `https://appcenter.ms/users/owner-name/apps/app-name/settings`)

#### Step 6

Install the Fastlane App Center plugin. From the root of the project run the following command:

```bash
bundle exec fastlane add_plugin app_center
```

#### Step 7

Add another lane inside the android platform. The file should look like this:

```
platform :android do
    desc 'Build the Android application.'
    lane :build do
        gradle(task: 'clean', project_dir: 'android/')
        gradle(task: 'assemble', build_type: 'release', project_dir: 'android/')
    end

    desc 'Build and upload to App Center.'
    lane :beta do
    build
    appcenter_upload(
        api_token: ENV["APPCENTER_API_TOKEN"],
        owner_name: ENV["APPCENTER_OWNER_NAME"],
        app_name: ENV["APPCENTER_APP_NAME"],
        apk: ENV["APPCENTER_DISTRIBUTE_APK"]
        )
    end
end
```

#### Step 8

Run the following command to deploy a beta version to App Center.

```bash
bundle exec fastlane android beta
```

## Codemagic CI/CD

### Setup

Create a new account [here](https://codemagic.io/signup).

Follow the app configuration helper.

Add the environment variables used in the app (e.g. APP_CENTER_API_TOKEN)

Create a `codemagic.yaml` file in the root directory of the project with the following content:

```
workflows:
  react-native-android-beta-app-center:
    name: React Native Android Beta App Center
    max_build_duration: 120
    instance_type: mac_mini_m1
    environment:
      groups:
        - staging
      node: v18.17.1
    scripts:
      - npm install
      - npm test
      - bundle install
      - bundle exec fastlane android beta
    triggering:
      events: # List the events that trigger builds
        - push
      branch_patterns: # Include or exclude watched branches
        - pattern: 'main'
          include: true
          source: true
```

Lastly, commit and push the changes to the remote repository.

>Remember to use the same group name configured in codemagic app's environment variables.

>For more information about the `codemagic.yaml` file checkout this [documentation](https://docs.codemagic.io/yaml-quick-start/building-a-react-native-app/)


## Navigation

### Installation and Setup

#### Step 1

Install the react-navigation native package and all of its dependencies running the following commands:

```bash
npm install @react-navigation/native
```

```bash
npm install react-native-screens react-native-safe-area-context
```

```bash
npx pod-install ios
```

#### Step 2

Install the stack navigator package and its dependecies by running the following commands:

```bash
npm install @react-navigation/stack
```

```bash
npm install react-native-gesture-handler
```

In order to complete the react-native-gesture-handler installation, add the following line at the top of `App.tsx` file:

`import 'react-native-gesture-handler'`

To use UIKit style animations for the header install the following package:

```bash
npm install @react-native-masked-view/masked-view
```

Install the pods for iOS development by running the following command:

```bash
npx pod-install ios
```

For further explanation see [here](https://reactnavigation.org/docs/getting-started/#installation) and [here](https://reactnavigation.org/docs/stack-navigator#installation).

### Type Checking

#### Step 1

Create the type for the stack and screens:

```
export type ExampleStackParamList = {
    Example: undefined
    HomeExample: undefined
}
```

#### Step 2

Type check the stack:

```
const Stack = createStackNavigator<ExampleStackParamList>()

const ExampleStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="HomeExample" component={HomeExampleScreen} />
    </Stack.Navigator>
  )
}

export default ExampleStackNavigator
```

#### Step 3

Type check the screen:

```
type NavigationProps = StackScreenProps<ExampleStackParamList, 'HomeExample'>

const HomeExampleScreen = ({ navigation }: NavigationProps): JSX.Element => {

  return (
    ...
  )
}
```

For further Navigation type checking setup check out [this guide](https://reactnavigation.org/docs/typescript).


## Testing

### Installation

Install React Testing Library for React Native

```bash
npm install -D @testing-library/react-native
```

### Setup

Create a `./utils/test-utils.js` file with following content:

```
import {render} from '@testing-library/react-native'

const AllTheProviders = ({children}) => {
  return (
    <> 
    {children} // Wrap children in providers as needed
    </>
  )
}

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react-native'

// override render method
export {customRender as render}
```

### Example

```
import 'react-native';
import React from 'react';
import ExampleScreen from '../ExampleScreen';
import {it} from '@jest/globals';
import {render} from '../../../utils/test-utils'

const navigation: any = {}

it('should render Example Screen', () => {
  render(<ExampleScreen {...navigation}/>);
});
```

To run the tests use the following command:

```bash
npm test
```
