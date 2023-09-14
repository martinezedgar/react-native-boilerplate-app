This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
npm run android
```

### For iOS

```bash
# using npm
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


## Setting Up Fastlane

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

### Installing rbenv

#### Step 1

Install rbenv.

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

### Installing Bundler

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

### Execute Fastlane

Run the following command:

```bash
bundler exec fastlane android build
```
