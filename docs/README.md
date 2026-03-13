# ![ExpoBase](https://github.com/NSF107/ExpoBase)

> The starter template for building native apps with Expo and Supabase.

## Features

-   ⚡ Expo SDK 50 for building native apps
-   🚀 Supabase Hosted Postgres Database
-   🔒 Supabase Authentication (Apple and Google implemented, many more providers available)
-   🔐 AuthContext for handling authentication state
-   📱 In-app purchases with Expo In-App-Purchases
-   🔔 Push notifications with Expo Notifications
-   📈 Performance Monitoring with Sentry
-   📊 Feedback Monitoring with Sentry
-   📝 In-app App Store reviews
-   🔥 Type checking with TypeScript
-   📁 File-based routing with Expo Router
-   📏 Linter with ESLint
-   💖 Code Formatter with Prettier
-   🦺 Unit Testing with Jest and React Testing Library
-   📡 GitHub Actions for CI/CD (Lint, Test, Build, etc.)
-   📦 Integrated with Expo Application Services to build and publish the app
-   💡 Absolute Imports using `@` prefix
-   🌈 Dark Mode support
-   📄 MIT License

---

## Table of Contents

1. [Dependencies & Prerequisites](#dependencies--prerequisites)
2. [Environment Variables](#environment-variables)
3. [Quick Start](#quick-start)
4. [Running the App](#running-the-app)
5. [Testing](#testing)
6. [Linting & Formatting](#linting--formatting)
7. [Building & Deploying](#building--deploying)
8. [OTA Updates](#ota-updates)
9. [CI/CD (GitHub Actions)](#cicd-github-actions)
10. [Service Setup Guides](#service-setup-guides)

---

## Dependencies & Prerequisites

Before you begin, install and configure the following tools and services.

### Required Tools

| Tool | Version | Install |
|---|---|---|
| Node.js | 18+ | [nodejs.org](https://nodejs.org) |
| npm | 9+ | Bundled with Node.js |
| Expo CLI | latest | `npm install -g expo-cli` |
| EAS CLI | latest | `npm install -g eas-cli` |
| Xcode | 15+ | Mac App Store (iOS builds only) |
| Android Studio | latest | [developer.android.com](https://developer.android.com/studio) |

### Third-Party Services

| Service | Purpose | Required |
|---|---|---|
| [Supabase](https://supabase.com) | Database, Auth, Storage | ✅ Yes |
| [Sentry](https://sentry.io) | Error tracking, performance monitoring | ✅ Yes |
| [Expo Application Services (EAS)](https://expo.dev/eas) | Cloud builds, OTA updates | ✅ Yes |
| [Firebase](https://firebase.google.com) | Google Sign-In on Android (`google-services.json`) | ✅ Android |
| [Apple Developer Account](https://developer.apple.com) | Sign In with Apple, iOS builds | ✅ iOS |
| [Expo Account](https://expo.dev) | EAS builds and updates | ✅ Yes |

### Key npm Packages

| Package | Purpose |
|---|---|
| `expo` ~50.0.14 | Core Expo SDK |
| `expo-router` ~3.4.8 | File-based navigation |
| `@supabase/supabase-js` ^2.42.0 | Supabase client |
| `@sentry/react-native` ~5.20.0 | Sentry error & performance monitoring |
| `expo-apple-authentication` ~6.3.0 | Sign In with Apple (iOS native) |
| `expo-auth-session` ~5.4.0 | OAuth sessions (Google Sign-In) |
| `expo-web-browser` ~12.8.2 | Opens OAuth browser flows |
| `expo-notifications` ~0.27.7 | Push notifications |
| `expo-updates` ~0.24.12 | OTA (over-the-air) updates |
| `expo-dev-client` ~3.3.11 | Custom development build |
| `react-native` 0.73.6 | React Native core |
| `typescript` ^5.1.3 | Type checking |
| `jest` / `jest-expo` ^29 / ~50 | Unit testing |
| `eslint` / `prettier` | Linting and formatting |

---

## Environment Variables

Create a `.env` file in the project root based on the following variables. **Never commit secrets to source control.**

```bash
# Supabase — from your Supabase project dashboard (Settings > API)
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Sentry — from your Sentry project (Settings > Client Keys)
EXPO_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/your-project-id

# Sentry Auth Token — from Sentry (Settings > Auth Tokens) — used for source map uploads
# Store this as an EAS Secret, not in .env
SENTRY_AUTH_TOKEN=your-sentry-auth-token
```

### EAS Secrets (for CI/CD and cloud builds)

These are stored as **EAS Secrets** via `eas secret:create`, not in `.env`:

| Secret Name | Description |
|---|---|
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `EXPO_PUBLIC_SENTRY_DSN` | Sentry DSN |
| `SENTRY_AUTH_TOKEN` | Sentry auth token for source map uploads |
| `GOOGLE_SERVICES_JSON` | Base64-encoded `google-services.json` from Firebase (Android only) |

Add an EAS secret:

```bash
eas secret:create --scope project --name SECRET_NAME --value "your-value"
```

For `GOOGLE_SERVICES_JSON` (a file secret):

```bash
eas secret:create --scope project --name GOOGLE_SERVICES_JSON --type file --value ./google-services.json
```

### GitHub Actions Secrets

Add the following in your GitHub repo under **Settings > Secrets and variables > Actions**:

| Secret | Description |
|---|---|
| `EXPO_TOKEN` | Expo access token from [expo.dev/accounts/settings](https://expo.dev/accounts/settings) |

---

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/NSF107/ExpoBase.git
cd ExpoBase

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env   # then fill in your values

# 4. Log in to Expo and EAS
eas login

# 5. Start the development server
npm start
```

> **Note:** To run on a physical device with the full native feature set (Sign In with Apple, push notifications, etc.), use a [development build](#development-build) instead of Expo Go.

---

## Running the App

### Expo Go (quickest, limited native features)

```bash
npm start          # starts Metro bundler, scan QR code with Expo Go
npm run ios        # opens in iOS Simulator
npm run android    # opens in Android Emulator
npm run web        # opens in browser
```

### Development Build (recommended)

A development build includes all native modules (Sentry, Apple Auth, etc.) and behaves like a production app.

**1. Build the dev client once:**

```bash
# iOS
eas build --profile development --platform ios

# Android
eas build --profile development --platform android
```

**2. Install the resulting `.ipa` / `.apk` on your device/simulator.**

**3. Start the Metro server pointing at the dev client:**

```bash
npm run dev-client   # expo start --dev-client
```

---

## Testing

Tests use [Jest](https://jestjs.io/) with the `jest-expo` preset.

```bash
# Run tests for files changed since origin/main (interactive watch mode)
npm test

# Run all tests once (used in CI)
npm run test:final

# Run tests in debug/watch mode
npm run test:debug

# Update snapshots
npm run update:snapshots
```

Test files live alongside source code in `__tests__/` directories (e.g., `src/components/__tests__/`).

Coverage is collected from all `*.{js,jsx,ts,tsx}` files, excluding `node_modules`, `coverage/`, and config files.

---

## Linting & Formatting

```bash
# Check for lint errors
npm run lint

# Auto-fix lint errors
npm run lint:fix

# Format all files with Prettier
npm run format
```

ESLint is configured with `eslint-config-universe/native` and `prettier` integration. Prettier uses 4-space tabs, semicolons, and double quotes (see `.prettierrc.json`).

---

## Building & Deploying

Builds are managed by **EAS Build**. There are four build profiles defined in `eas.json`:

| Profile | Platform | Distribution | Channel |
|---|---|---|---|
| `development` | iOS + Android | Internal (TestFlight / direct install) | `development` |
| `preview` | iOS + Android | Internal | `preview` |
| `preview-apk` | Android only | APK (direct install) | `preview-apk` |
| `production` | iOS + Android | Store (App Store / Google Play) | `production` |

### Build Commands

```bash
# Development build (for local testing with native modules)
eas build --profile development --platform all

# Preview build (for internal QA distribution)
eas build --profile preview --platform all

# Preview APK (Android only, easy to sideload)
eas build --profile preview-apk --platform android

# Production build (for app store submission)
eas build --profile production --platform all
```

### Submitting to App Stores

```bash
# Submit iOS build to App Store Connect
eas submit --platform ios --latest

# Submit Android build to Google Play
eas submit --platform android --latest
```

> **Prerequisites for production builds:**
> - Apple Developer account with the app's bundle ID (`com.nfett10.expoboilerplate`) configured
> - Google Play developer account with the app's package name registered
> - All EAS Secrets set (see [EAS Secrets](#eas-secrets-for-cicd-and-cloud-builds))
> - `GOOGLE_SERVICES_JSON` EAS secret set for Android

---

## OTA Updates

[Expo Updates](https://docs.expo.dev/eas-update/introduction/) lets you push JavaScript/asset changes to users without going through the app store.

```bash
# Push an OTA update to the development channel (also uploads Sentry source maps)
npm run update:dev

# Push an OTA update to the preview channel (also uploads Sentry source maps)
npm run update:preview
```

For production OTA updates, use:

```bash
eas update --branch production
npx sentry-expo-upload-sourcemaps dist
```

The app is configured to check for updates on launch (`ON_LOAD` policy) and apply them immediately.

---

## CI/CD (GitHub Actions)

Four workflows run automatically:

| Workflow | Trigger | Action |
|---|---|---|
| `lint.yml` | Push / PR to `main` | Runs ESLint + Prettier checks |
| `testing.yml` | Push / PR to `main` | Runs the full Jest test suite |
| `update.yml` | Push to `main` | Publishes an EAS OTA update to the `development` branch |
| `preview.yml` | PR to `main` | Publishes an EAS preview update and posts a QR code comment on the PR |

**Required GitHub secret:** `EXPO_TOKEN` — generate one at [expo.dev/accounts/settings](https://expo.dev/accounts/settings).

---

## Service Setup Guides

### Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Copy the **Project URL** and **anon/public key** from **Settings > API**.
3. Set up the `profiles` table (used by the account screen):

```sql
create table profiles (
  id uuid references auth.users on delete cascade,
  username text,
  website text,
  avatar_url text,
  primary key (id)
);
```

4. In **Authentication > Providers**, enable **Apple** and **Google**.
5. Add your Supabase URL and anon key to your `.env` and as EAS Secrets.

### Google Sign-In (Android)

1. Create a project in [Firebase Console](https://console.firebase.google.com).
2. Add an Android app with package name `com.nfett10.expoboilerplate`.
3. Download `google-services.json`.
4. Add it as an EAS Secret named `GOOGLE_SERVICES_JSON`.
5. In Supabase, enable Google as an OAuth provider and add the Firebase OAuth client credentials.

### Sign In with Apple (iOS)

1. In your [Apple Developer account](https://developer.apple.com), enable **Sign In with Apple** for the `com.nfett10.expoboilerplate` App ID.
2. Configure **Sign In with Apple** as a provider in your Supabase project (**Authentication > Providers > Apple**), entering your Team ID, Bundle ID, Key ID, and private key.
3. Sign In with Apple is iOS-only — the button is hidden on Android and web.

### Sentry

1. Create a project at [sentry.io](https://sentry.io) (React Native).
2. Copy the **DSN** from **Settings > Projects > your-project > Client Keys**.
3. Generate an **Auth Token** from **Settings > Auth Tokens** with `project:releases` and `org:read` scopes.
4. Add `EXPO_PUBLIC_SENTRY_DSN` to your `.env`.
5. Add `SENTRY_AUTH_TOKEN` as an EAS Secret.
6. The Sentry org and project are set to `expobase` in `app.config.ts` — update these to match your Sentry organization and project slugs.

### Expo Push Notifications

1. No additional setup needed for Expo's push service — it works out of the box.
2. On Android, the `GOOGLE_SERVICES_JSON` secret (Firebase) is also required for FCM delivery.
3. The app requests notification permissions at runtime via `NotificationButton.tsx`.

---

## Buy Me a Coffee

If you enjoy this repo and want to support me, consider donating.<br>

<a href="https://www.buymeacoffee.com/NSF107" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

## Sponsored By
