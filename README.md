# Finance Manager / Expense Tracker......

A premium, fintech-style mobile application name Ledger built with React Native CLI. This project demonstrates high-level system design, custom architectural patterns, reusable components and advanced UI interactions.

# Selection Boosters (Advanced Features)....
1. Custom useForm  Architecture : A decoupled validation engine that handles state, touched tracking, and real-time validation without bloating UI components.
2. Advanced Gestures : High-performance Swipe-to-Delete implemented with "react-native-gesture-handler" and reanimated for a smooth, native feel.
3. Dynamic Theming Engine: Support for Dark & Light modes with persistent storage using AsyncStorage.
4. Custom SVG Charts: Semi-circular Gauge Charts and Gradient Bar Charts built from scratch using Worklets for 60FPS performance.
5. Smart UX: Context-aware empty states and micro-animations throughout the app.

# System Architecture.....
1. State Management: React Context API (ExpenseContext, ThemeContext) for lightweight, efficient global state.
2. Logic Decoupling: Business rules and validation schemas are isolated from the View layer in src/utils/validators.ts`.
3. Reusable Component Library: Specialized UI folder containing inputs, buttons, and complex cards designed for scalability.

# Technical Stack....
1. React Native CLI (TypeScript)
2. React Navigation (Bottom Tabs & Stack)
3. React Native Reanimated (Layout transitions & Chart animations)
4. NativeWind (Tailwind CSS for React Native)
5. AsyncStorage (Local Persistence)

# Requirements....
1. Node.js (>= 18)
2. Android Studio / Xcode
3. CocoaPods (for iOS)

# Quick Start
1. Clone & Install:
   npm install
2. Run on Android:
   npx react-native run-android
3. Run on iOS:
   cd ios && pod install && cd ..
   npm run ios

# Build Delivery
Generate a debug APK for immediate testing:
cd android && ./gradlew asssembleRelease

Generate a build for release:
cd android && ./gradlew bundleRelease


