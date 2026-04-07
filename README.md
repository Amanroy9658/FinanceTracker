# Finance Manager / Expense Tracker

A premium, fintech-style mobile application built with **React Native (CLI)**. This project demonstrates high-level system design, custom architectural patterns, and advanced UI interactions.

## 🚀 Selection Boosters (Advanced Features)
- **Custom `useForm` Architecture**: A decoupled validation engine that handles state, touched tracking, and real-time validation without bloating UI components.
- **Advanced Gestures**: High-performance **Swipe-to-Delete** implemented with `react-native-gesture-handler` and `reanimated` for a smooth, native feel.
- **Dynamic Theming Engine**: Support for **Dark & Light modes** with persistent storage using `AsyncStorage`.
- **Custom SVG Charts**: Semi-circular **Gauge Charts** and **Gradient Bar Charts** built from scratch using Worklets for 60FPS performance.
- **Smart UX**: Context-aware empty states and micro-animations throughout the app.

## 🏗️ System Architecture
- **State Management**: React Context API (`ExpenseContext`, `ThemeContext`) for lightweight, efficient global state.
- **Logic Decoupling**: Business rules and validation schemas are isolated from the View layer in `src/utils/validators.ts`.
- **Reusable Component Library**: Specialized UI folder containing inputs, buttons, and complex cards designed for scalability.

## 🛠️ Technical Stack
- React Native CLI (TypeScript)
- React Navigation (Bottom Tabs & Stack)
- React Native Reanimated (Layout transitions & Chart animations)
- NativeWind (Tailwind CSS for React Native)
- AsyncStorage (Local Persistence)

## 📋 Requirements
- Node.js (>= 18)
- Android Studio / Xcode
- CocoaPods (for iOS)

## ⚡ Quick Start
1. **Clone & Install**:
   ```bash
   npm install
   ```
2. **Run on Android**:
   ```bash
   npm run android
   ```
3. **Run on iOS**:
   ```bash
   cd ios && pod install && cd ..
   npm run ios
   ```

## 📦 Build Delivery
Generate a debug APK for immediate testing:
```bash
cd android && ./gradlew assembleDebug
```
*Output: `android/app/build/outputs/apk/debug/app-debug.apk`*
