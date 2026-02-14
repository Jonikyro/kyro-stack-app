# Upgrade to React 19.2.4

## Summary
Upgrades the UI project from React 18.3.1 to React 19.2.4, along with all React-dependent libraries.

## Changes

### Core Packages
- `react`: 18.3.1 → 19.2.4
- `react-dom`: 18.3.1 → 19.2.4
- `@types/react`: 18.3.3 → 19.2.14
- `@types/react-dom`: 18.3.0 → 19.2.3

### Dependencies Updated
- `@tanstack/react-query` → 5.90.21
- `@tanstack/react-router` → 1.159.10
- `react-aria` → 3.46.0
- `react-stately` → 3.44.0
- `react-hook-form` → 7.71.1

### Breaking Changes Fixed
- **Stricter ref rules**: Fixed MutationObserver patterns in `dialog.tsx` and `details.tsx` to avoid accessing refs during render
- **Type exports**: Added missing `ConfirmRef` type export
- **ESLint**: Added `/* eslint-disable react-hooks/refs */` for react-hook-form components (false positives from stricter React 19 ref checking)
- **Config**: Excluded `.cjs` files from ESLint