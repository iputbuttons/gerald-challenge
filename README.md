# Gerald Challenge — Custom Drawer with Expo Router + Reanimated

<video src="./demo.mp4" controls muted playsinline width="420">
</video>

## Overview

This project implements a custom Drawer that acts as the parent container of the main navigation, built with `react-native-reanimated` and integrated with `expo-router`. It follows the requested pattern:

- **DrawerMenu (parent)**
  - **Tab Navigator** (Store)
    - **Home (Stack)**
      - `screen1` (Home)
      - `screen2` (Details)
    - **Cart**
    - **Favourites**
  - **Orders** (outside of Tabs)

The Drawer is custom-built (not using `@react-navigation/drawer`) with complex animations.

---

## Run locally

- Requirements: Node 18+, Xcode (iOS) or Android Studio (Android), and the `expo` CLI.
- Install dependencies:

```bash
npm install
```

- Start the project:

```bash
npm run start
# Then press i (iOS) or a (Android)
```

- Platform-specific:

```bash
npm run ios
npm run android
```

If you see a message about the Reanimated Babel plugin, check Troubleshooting below.

---

## Navigation structure (expo-router)

- `app/_layout.tsx`: Root `Stack` with two routes: `orders` and `store`.
  - `orders`: standalone screen with `DrawerHeader`.
  - `store`: hosts the Tab Navigator.
- `app/store/_layout.tsx`: `Tabs` with `home`, `cart`, `favourites`. The header for each Tab uses `DrawerHeader` (hamburger icon) to open the Drawer.
- `app/store/home/_layout.tsx`: nested `Stack` for Home.
- `app/store/home/index.tsx` and `app/store/home/details.tsx`: sample screens (screen1/screen2).

Initial redirect: `app/index.tsx` → `/store/home`.

---

## Drawer architecture (core)

- `shared/providers/drawer-provider.tsx`
  - Exposes `DrawerContext` with:
    - `isOpen`: boolean
    - `progress`: `SharedValue<number>` (0 → closed, 1 → open)
    - `openDrawer`, `closeDrawer`, `toggleDrawer`: animate with `withTiming(…, { duration: 280 })`.
  - Mounted in `shared/providers/providers.tsx`, ensuring the Drawer is the parent of the whole navigation tree.

- `shared/components/drawer.tsx`
  - `DrawerHeader`: menu button (Ionicons) calling `openDrawer()` from context.
  - `DrawerMenu`: menu links using `expo-router/Link`, with active state highlighted via `usePathname()`.
  - `DrawerContainer`: wraps the navigation tree and applies animated transforms with `useAnimatedStyle` and `interpolate` over `progress`:
    - `translateX` ≈ 60% of screen width
    - `translateY` and subtle negative `rotate` for depth effect
    - `borderRadius` increases with progress
    - Full-screen `AnimatedPressable` overlay with `opacity` fade; tapping closes the drawer

- `shared/hooks/useDrawer.tsx`
  - Hook to access the Drawer context with usage guard.

- Integration:
  - `app/_layout.tsx` wraps the `Stack` with `DrawerContainer` (and `Providers` already includes `DrawerProvider`).
  - Screen headers use `DrawerHeader` to control open/close.

---

## Extending the Drawer

- Add a new menu item:
  - Update `links` array in `shared/components/drawer.tsx` inside `DrawerMenu`.

```ts
const links = [
  { label: 'Store', href: '/store/home', hrefStartsWith: '/store' },
  { label: 'Orders', href: '/orders', hrefStartsWith: '/orders' },
  // New item
  { label: 'Profile', href: '/profile', hrefStartsWith: '/profile' }
]
```

- Add a new Tab under Store:
  - Create `app/store/profile.tsx` and register the Tab in `app/store/_layout.tsx` with `<Tabs.Screen name='profile' … />`.

- Add screens to the Home Stack:
  - Create files under `app/store/home/*` and navigate with `useRouter().push('/store/home/my-new-screen')`.

---

## Technical decisions

- **Reanimated**: used to deliver a smooth, fine-grained animated Drawer (as suggested in the challenge).
- **expo-router**: organizes Drawer (parent) → Tabs → Stack through file-based routing and `Layout`s.
- **NativeWind**: Tailwind-like styling for consistent and quick UI work.
- **Single Drawer state**: Context keeps a shared `progress` value, decoupling menu and animated UI from the content tree.

---

## Relevant files

- `shared/providers/providers.tsx`: orchestrates `Theme`, `SafeArea`, `KeyboardAvoiding`, `Font`, and `DrawerProvider`.
- `shared/providers/drawer-provider.tsx`: Drawer state and animation control.
- `shared/components/drawer.tsx`: `DrawerHeader`, `DrawerMenu`, `DrawerContainer` (animations and overlay).
- `app/_layout.tsx`: wraps navigation with `DrawerContainer`.
- `app/store/_layout.tsx`: Tabs.
- `app/store/home/_layout.tsx`: Home Stack.
