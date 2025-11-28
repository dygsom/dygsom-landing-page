# Debug Tools

This folder contains debugging utilities that are **only available in development mode**.

## Available Tools

### Browser Console Access
In development mode, debug tools are available globally through `window.DygsomDebug`:

```javascript
// Reset email modal state (for testing modal repeatedly)
DygsomDebug.resetModal()

// Force show email modal regardless of current state
DygsomDebug.forceShowModal()

// Check application state
DygsomDebug.checkState()

// Test API connectivity
DygsomDebug.testAPI()

// Clear all DYGSOM localStorage data
DygsomDebug.clearStorage()
```

## Usage

1. Open browser console (F12)
2. Type `DygsomDebug.` and see available methods
3. Use methods to test functionality

## Production

These tools are **automatically excluded** from production builds and will not be available in the live site.