# simple-calculator
It accepts only integers and performs calculation including: +, -, /,\*, () and follow priority of operations.

## Table of contents
- [Features](#features)
- [Getting started](#getting-started)
- [Tools](#tools)
- [File structure](#file-structure)

## Features
- Performs calculation including: +, -, /,\*, () and follow priority of operations
- Show history of operations and can reuse them
- Can enter operations using keyboard
  
## Getting started
### Run from local server
1) clone project ([https://github.com/YousefMahmod/game-hub.git](https://github.com/YousefMahmod/simple-calculator.git))
2) npm i
3) npm run dev
### Demo
- [Demo](https://simple-calculator-drab.vercel.app/)

## Tools
- React JS with typescript
- Chakra UI for styling
- react-icons
- Zustand for state management

## File structure
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
