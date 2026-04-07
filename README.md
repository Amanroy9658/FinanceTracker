# Finance Manager / Expense Tracker

A modern, fintech-style expense tracker designed for the TakUforward assignment. Built confidently with React Native CLI.

## Core Features
- **Gradient UI Dashboard**: Eye-catching fintech style dashboard displaying immediate total balances.
- **Transactions**: Add income and expense tracking with integrated form validation.
- **Categorization**: Track where your money goes with visually distinct icons and colors.
- **Analytics**: Breakdowns of expenses scaled via dynamic percentage-based tracking.
- **Dark/Light Themes**: Supports dual themes utilizing system preferences and React Native's Native Context.
- **No Backend**: All transactions safely saved on local storage via \`@react-native-async-storage/async-storage\`.

## Technical Stack
- React Native CLI (TypeScript)
- React Navigation (Bottom Tabs)
- React Native Reanimated (Micro-interactions & screen fading)
- React Native Vector Icons (Custom icons)
- React Native Linear Gradient (UI designs)
- KeyboardAwareScrollView (Input flow)

## Requirements to Run
- Node.js (>= 18)
- Android Studio / Xcode

## Quick Start
1. Clone the repository and navigate inside:
   ```bash
   cd ExpenseTrackerApp
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   - For Android: 
     ```bash
     npm run android
     ```
   - For iOS: 
     ```bash
     cd ios && pod install && cd ..
     npm run ios
     ```

## Build APK (Release/Debug)
To generate the debug APK for local testing or immediate delivery:
```bash
cd android
./gradlew assembleDebug
```
The resulting APK can be found under `android/app/build/outputs/apk/debug/app-debug.apk`.
