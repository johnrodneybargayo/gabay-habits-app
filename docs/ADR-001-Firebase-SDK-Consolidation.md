# ADR-001: Firebase SDK Consolidation

**Date:** 2024-01-XX  
**Status:** Accepted  
**Deciders:** Development Team  

## Context

The GabayHabits application currently uses a mixed Firebase SDK approach:
- **Firebase v8 compat** (`firebase/compat/*`) for initialization in `firebase/firebase.ts`
- **Firebase v9 modular** (`firebase/database`, `firebase/auth`) for actual operations throughout the app
- **React Native Firebase** packages installed but unused (`@react-native-firebase/app`, `@react-native-firebase/firestore`)

This creates several issues:
1. **Bundle size bloat** - Both v8 compat and v9 modular are included
2. **Inconsistent patterns** - Mixed import styles across the codebase
3. **Maintenance complexity** - Two different Firebase paradigms to maintain
4. **Tree-shaking inefficiency** - Compat layer prevents optimal dead code elimination
5. **Unused dependencies** - React Native Firebase packages add unnecessary weight

## Decision

We will **consolidate to Firebase v9 modular SDK** for the following reasons:

### Chosen: Firebase v9 Modular SDK

**Rationale:**
- ✅ **Already in use** - 90% of the app already uses v9 modular imports
- ✅ **Better tree-shaking** - Only import what you use
- ✅ **Smaller bundle size** - No compat layer overhead
- ✅ **Modern API** - Future-proof and actively maintained
- ✅ **Web compatibility** - Works seamlessly with Expo web
- ✅ **Type safety** - Better TypeScript support

### Rejected Alternatives:

**Firebase v8 Compat:**
- ❌ Legacy approach, deprecated
- ❌ Larger bundle size
- ❌ Poor tree-shaking

**React Native Firebase:**
- ❌ React Native only (no web support)
- ❌ Requires native code changes
- ❌ Expo managed workflow incompatible
- ❌ Additional complexity for cross-platform

## Implementation Plan

### Phase 1: Update Firebase Initialization
1. Replace `firebase/compat/*` imports with `firebase/app` and individual services
2. Update initialization pattern to use `initializeApp()` and `getAuth()`, `getDatabase()`, etc.
3. Maintain the same export interface for backward compatibility

### Phase 2: Remove Unused Dependencies
1. Uninstall `@react-native-firebase/app` and `@react-native-firebase/firestore`
2. Clean up any related configuration

### Phase 3: Verification
1. Test all Firebase functionality (Auth, Database, Storage)
2. Verify bundle size reduction
3. Ensure web compatibility maintained

## Consequences

### Positive:
- **Reduced bundle size** - Estimated 15-20% reduction in Firebase-related code
- **Consistent codebase** - Single import pattern throughout
- **Better performance** - Improved tree-shaking and loading
- **Future-proof** - Aligned with Firebase's recommended approach
- **Simplified maintenance** - One SDK to maintain and update

### Negative:
- **Migration effort** - One-time cost to update initialization
- **Testing required** - Need to verify all Firebase operations work correctly

### Neutral:
- **API compatibility** - v9 modular provides same functionality as compat
- **Learning curve** - Team already familiar with v9 modular syntax

## Migration Notes

### Before (v8 Compat):
```javascript
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const auth = firebase.auth();
```

### After (v9 Modular):
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const app = initializeApp(config);
const auth = getAuth(app);
```

## Success Criteria

- [ ] Single Firebase SDK used throughout the application
- [ ] All Firebase functionality works (Auth, Database, Storage)
- [ ] Bundle size reduction achieved
- [ ] No breaking changes to existing functionality
- [ ] Web and mobile platforms both work correctly
- [ ] Unused React Native Firebase packages removed

## References

- [Firebase v9 Modular SDK Guide](https://firebase.google.com/docs/web/modular-upgrade)
- [Firebase Tree-shaking Guide](https://firebase.google.com/docs/web/bundle-size)
- [Expo Firebase Setup](https://docs.expo.dev/guides/using-firebase/)