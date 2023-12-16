# simple-calculator
It accepts only integers and performs calculation including: +, -, /,\*, () and follow priority of operations.

## How To Install
- clone project https://github.com/YousefMahmod/simple-calculator.git
- Run npm i
- Run npm run dev
## Fetures
- Performs calculation including: +, -, /,\*, () and follow priority of operations
- Show history of operations and can reuse them
- Can enter operations using keyboard

## Tools
- React JS with typescript
- Chakra UI for styling
- react-icons
- Zustand for state management

## Link Demo
https://simple-calculator-korgfw9gz-youssefs-projects-93a01e1a.vercel.app/
## Structure
``` bash
├───public
│       vite.svg
│
└───src
    │   App.tsx
    │   constants.ts
    │   main.tsx
    │   vite-env.d.ts
    │
    ├───components
    │       ButtonGrid.tsx
    │       DisplayScreen.tsx
    │       HistoryOperations.tsx
    │
    └───operation
            store.ts
```
