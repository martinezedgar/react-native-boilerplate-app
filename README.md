This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
npm start
```

## Start your Application

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

## NativeWind

Install nativewind and tailwind css.

```bash
npm install nativewind
```

```bash
npm install -D tailwindcss@3.3.2
```

### Configuration

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

Add the Babel pluging by editing the `babel.config.js` file.

```
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ["nativewind/babel"],
};
```

Create the `app.d.ts` file with the following content.

```
/// <reference types="nativewind/types" />
```

Restart Metro.

```bash
npm run start --reset-cache
```

Start styling.

```
<Text className="text-red-500">This is a text.</Text>
```


## Fastlane

### Configuration

Create a folder named `./fastlane` in the root directory of the project

Inside that folder create a file named `Fastfile` with the following content:

```
platform :android do
    desc 'Build the Android application.'
    lane :build do
        gradle(task: 'clean', project_dir: 'android/')
        gradle(task: 'assemble', build_type: 'release', project_dir: 'android/')
    end
end
```

### rbenv


Install rbenv using `brew`

```bash
brew install rbenv ruby-build
```

### ruby

Install a ruby version.

```bash
rbenv install 3.0.4
```

### ruby version

Apply a version to your local environment.

```bash
rbenv local 3.0.4
```

### Bundler

Run the following command:

```bash
gem install bundler
```

Add the following line to the `Gemfile` in the root directory of the project.

```
...

gem "fastlane"

...
```

Run the following command:

```bash
bundle update
```

### Generate an upload key


Find the JDK bin folder path by running the following command:

```bash
/usr/libexec/java_home
```

The output of this command will be something like this:

```
/Library/Java/JavaVirtualMachines/jdk-XX.jdk/Contents/Home
```

Navigate to the JDK bin folder.

```bash
cd /Library/Java/JavaVirtualMachines/jdk-XX.jdk/Contents/Home
```

Generate an upload key.

```bash
sudo keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

>Make sure to edit the key and alias name.

Move the key to the App `android/app` directory.

```bash
sudo mv my-release-key.keystore AppName/android/app
```

>Make sure to edit the app directory path.

Set up Gradle variables. Edit the file `~/.gradle/gradle.properties` with the following content:

```
APPNAME_UPLOAD_STORE_FILE=my-upload-key.keystore
APPNAME_UPLOAD_KEY_ALIAS=my-key-alias
APPNAME_UPLOAD_STORE_PASSWORD=*****
APPNAME_UPLOAD_KEY_PASSWORD=*****
```

>This is the information entered at the upload key creation prompt.

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

Install the gems:

```bash
bundle install
```

Run the following command to build the app:

```bash
bundle exec fastlane android build
```

## Beta Deployment to App Center

### Create an App Center account

Go to [**App Center**](https://appcenter.ms/)

Click on `Start Free` and create an account.

Click on `Add new app` and enter the required information.

Once the app is created go to the `Settings` menu on the left. In `Settings` go to `App API tokens` and create a new token. Copy the token at this moment, this is the only time that it would be possible and you will need it in the next step.

Add the following environment variables to the environment variables file.

```
APPCENTER_API_TOKEN="123456asdfg"
APPCENTER_OWNER_NAME="owner-name"
APPCENTER_APP_NAME="my-app"
APPCENTER_DISTRIBUTE_APK="./android/app/build/outputs/apk/release/app-release.apk"
```

>The value for `APPCENTER_OWNER_NAME` and `APPCENTER_APP_NAME` should be written as they appear on the App Center URL (e.g. `https://appcenter.ms/users/owner-name/apps/app-name/settings`)

Install the Fastlane App Center plugin. From the root of the project run the following command:

```bash
bundle exec fastlane add_plugin app_center
```

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

>For further explanation see [here](https://reactnavigation.org/docs/getting-started/#installation) and [here](https://reactnavigation.org/docs/stack-navigator#installation).

### Type Checking

Create the type for the stack and screens:

```
export type ExampleStackParamList = {
    Example: undefined
    HomeExample: undefined
}
```

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
Type check the screen:

```
type NavigationProps = StackScreenProps<ExampleStackParamList, 'HomeExample'>

const HomeExampleScreen = ({ navigation }: NavigationProps): JSX.Element => {

  return (
    ...
  )
}
```

>For further Navigation type checking setup check out [this guide](https://reactnavigation.org/docs/typescript).



## RTK

### Installation

Install RTK.

```bash
npm install @reduxjs/toolkit
```

>This will install `@reduxjs/toolkit`, `react-redux`, and `@types/react-redux`. If for any reason some of the packages are not installed, proceed to install them manually.

### Redux Setup

Create a new configuration file for the store, this could be in `./src/store/config.ts`, with the following content:

```
import { configureStore } from '@reduxjs/toolkit'
import { exampleCounterSlice } from './slices/exampleCounter'

export const store = configureStore({
  reducer: {
    exampleCounter: exampleCounterSlice.reducer
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
```

Create the `exampleCounterSlice` in `./src/store/slices/exampleCounter.ts` with the following content:

```
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../config'

interface ExampleCounterState {
  value: number
}

const initialState: ExampleCounterState = {
  value: 0,
}

export const exampleCounterSlice = createSlice({
  name: 'exampleCounter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = exampleCounterSlice.actions

export const selectCount = (state: RootState) => state.exampleCounter.value

export default exampleCounterSlice.reducer
```

Create a `hooks` file in `./src/store/hooks.ts` with the typed version of `useDispatch` and `useSelector`, with the following content:

```
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './config'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

Add the redux `Provider` to `App.tsx`:
```
...
import { Provider } from 'react-redux';
import store from './src/store/config';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ExampleStackNavigator />
      </NavigationContainer>
    </Provider>
  )
}
```

### Using Redux state

Import `useAppSelector` and `useAppDispatch`.

```
import {useAppSelector, useAppDispatch} from '../store/hooks';
```

Import the needed actions.

```
import {decrement, increment} from '../store/slices/exampleCounter';
```

Select the needed state.

```
const count = useAppSelector(state => state.exampleCounter.value);
```

Dispatch the actions and use the state where needed.

```
const dispatch = useAppDispatch();

<View >
  <Button title="-" onPress={() => dispatch(decrement())} />
    <Text>{count}</Text>
  <Button title="+" onPress={() => dispatch(increment())} />
</View>
```

### RTK Query Setup

Create an API slice, with the queries and mutation needed. For example:

```
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {Post, Comment} from '@services/types';

const baseUrl: string = 'https://jsonplaceholder.typicode.com/';

export const exampleApi = createApi({
  reducerPath: 'exampleApi',
  baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
  endpoints: builder => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts/',
    }),
    getPost: builder.query<Post, string>({
      query: id => {
        return `posts/${id}`;
      },
    }),
    getPostComment: builder.query<
      Comment[],
      {postId: string; commentId: string}
    >({
      query: args => {
        const {postId, commentId} = args;
        return `posts/${postId}/comments?id=${commentId}`;
      },
    }),
    createPost: builder.mutation<Post, Partial<Post>>({
      query: ({userId, title, body}) => ({
        url: 'posts',
        method: 'POST',
        body: {
          title,
          body,
          userId,
        },
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useLazyGetPostQuery,
  useLazyGetPostCommentQuery,
  useCreatePostMutation,
} = exampleApi;
```

In the store configuration file, add the API slice to the store middleware:

```
import {exampleApi} from '@services/exampleApi';
import { configureStore } from '@reduxjs/toolkit'
import { exampleCounterSlice } from './slices/exampleCounter'

export const store = configureStore({
  reducer: {
    exampleCounter: exampleCounterSlice.reducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(exampleApi.middleware)
  },
})
```

### Using RTK Query

Import the hooks created in the API slice, and use the returned data.

```
const {data: posts, error: getPostsError} = useGetPostsQuery();
```

```
<View>
  {posts && (
    <View>
      <View>
        <Text>Post Id: </Text>
        <Text>{posts[0].id}</Text>
      </View>
      <View>
        <Text>Post Title: </Text>
        <Text>{posts[0].title}</Text>
      </View>
    </View>
  )}
</View>
{
  getPostsError &&
    'originalStatus' in getPostsError &&
    'error' in getPostsError && (
      <View>
        <Tex>
          Status: {getPostsError.originalStatus}
        </Tex>
        <Text>
          Error: {JSON.stringify(getPostsError.error)}
        </Text>
      </View>
    )
}
```

## Testing

### Installation

Install React Testing Library for React Native

```bash
npm install -D @testing-library/react-native
```

### Setup

Create a `./utils/test-utils.js` file with following content:

```
import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from '@store/config';

const AllTheProviders = ({children}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react-native';

// override render method
export {customRender as render};

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

## Handling Absolute Imports

### Setup

In `tsconfigfile.json` file add to `compilerOptions/paths` the mapping you want for the absolute imports.

```
"compilerOptions": {
    "paths": {
      "@components/*": ["./src/components/*"],
      "@utils/*": ["./utils/*"],
      ...,
    }
  },
```

### Babel Plugin

Install the `resolve-module` pluging:

```bash
npm install --save-dev babel-plugin-module-resolver
```

In `babel.config.js` add the `module-resolver` plugin to the `plugins` array:

```
module.exports = {
  ...,
  plugins: [
    ...,
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '@components': './src/components',
          '@utils': './utils',
        },
      },
    ],
  ],
};
```

> In the propery `alias` add the `paths` you added in `tsconfig.json` file.

## Custom Fonts

### Setup

Choose a folder to save the `.ttf` files of the custom fonts. For example `./src/assets/fonts/OpenSans-Regular.ttf`.

If the file doesn't exist, create a `react-native.config.js` file with the following content:

```
module.exports = {
  project: {
      ios:{},
      android:{}
  },
  assets:['./src/assets/fonts/'],
}
```

In the `assets` property, use the path to the font files location.

### Link the font file

Every time you add a new font file run the following commands:

```bash
npx react-native-asset
```

```bash
npm start --reset-cache
```

For Android:
```bash
npm run android
```

For iOS:
```bash
npm run ios
```

### Using the custom fonts

Add a new entry in the `fontFamily` property in `tailwind.config.js` at `theme/extend`.

```
theme: {
  extend: {
    fontFamily: {
      'open-regular': ['OpenSans-Regular'],
      'open-bold': ['OpenSans-Bold'],
    },
  },
},
```

It is important to note here that `NativeWind` will detect only the first element in the array of any `fontFamily` entry.

```
<Text className='font-open-bold text-xl'>Post Title: </Text>
<Text className='font-open-regular'>{posts[0].title}</Text>
```

>When using custom fonts in React Native for Android do not add any other font modifier like `Font Style` or `Font Weight` because it will go back to the `default` font family. Only `Font Size` is allowed.
