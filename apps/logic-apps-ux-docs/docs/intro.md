---
sidebar_position: 1
slug: /
---

# Getting Started

## Requirements

- Node v14+
- MkCert
  _One Time Only_
  Install from instructions found at: https://github.com/FiloSottile/mkcert

Make Sure to run:

```bash
mkcert -install
```

- Recommended - Nx CLI

```bash
npm install -g nx
```

## Running Code

Make sure to run npm install at the root level

```bash
npm install
```

All commands should be run from the root repo directory

### Standalone Designer for testing

**Code Location:** `/apps/designer-standalone`

```bash
nx serve
```

### Build Designer Library For Publishing To NPM

**Code Location:** `/libs/designer`

```bash
nx run designer:build
```

### Unit Tests

**Code Location:** `/libs/designer/**/__test__/*.spec.ts(x)`

**Running tests:**

```bash
nx test designer
```

**Debugging tests:** For easy debugging, install [Jest for VS Code.](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
No additional configuration should be needed, but you may need to restart your VSCode instance.

### Running E2E Tests

**Code Location:** `/apps/designer-e2e`

```bash
nx run designer-e2e:e2e
```