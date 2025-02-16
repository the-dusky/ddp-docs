# Owner Token Deployment Guide

This guide outlines the steps to deploy and interact with the DDP Owner Token program on Solana.

## Prerequisites

Before you begin, ensure you have:

- ✅ Solana CLI tools installed
- ✅ Node.js and pnpm installed
- ✅ Local Solana validator running (`solana-test-validator`)
- ✅ Test wallet with SOL (for paying transaction fees)

## Initial Setup

### 1. Configure Solana Network

Switch to localnet for development:

```bash
solana config set --url localhost
```

### 2. Wallet Setup

Create a test wallet if you don't have one:

```bash
solana-keygen new -o .keys/test_wallet.json
```

Fund your wallet with SOL:

```bash
solana airdrop 2 .keys/test_wallet.json
```

## Build and Deploy

### 1. Build the Program

Compile the Rust program:

```bash
pnpm solana:build
```

### 2. Deploy

Deploy to the Solana network:

```bash
pnpm solana:deploy
```

This process will:
- Build the Rust program
- Deploy it to the Solana network
- Update `Anchor.toml` with the program ID

## Program Initialization

### Initialize Owner Token

Run the initialization script:

```bash
pnpm solana:simulate:init-owner-token
```

This will:
- Create a new owner token account
- Initialize it with name "DDP Owner Token" and symbol "DOT"
- Save the owner token address to `.owner-token.json`

### Mint Tokens

Create new tokens using:

```bash
pnpm solana:simulate:mint-owner-token
```

This will:
- Load the owner token account
- Create a new token account (PDA)
- Mint a token to the specified address

## Program Upgrades

When you need to upgrade the program after making changes:

### 1. Build New Version

```bash
pnpm solana:build
```

### 2. Upgrade Program

```bash
pnpm solana:upgrade owner_token
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm solana:build` | Build the Anchor program |
| `pnpm solana:deploy` | Deploy the program to Solana |
| `pnpm solana:upgrade` | Upgrade an existing program |
| `pnpm solana:simulate:init-owner-token` | Initialize the owner token program |
| `pnpm solana:simulate:mint-owner-token` | Mint a new token |

## Program Architecture

### Account Structure

#### 1. Owner Token Account
- Primary program state storage
- Contains:
  - Name
  - Symbol
  - Next token ID
- Created during initialization

#### 2. Token Account (PDA)
- Created for each minted token
- PDA derived from:
  ```
  Seeds = [
    "token",
    owner_token_address,
    token_id
  ]
  ```

## Troubleshooting

### Common Issues

#### "Account not found" Error
- ✓ Check if local validator is running
- ✓ Verify program deployment
- ✓ Ensure wallet has sufficient SOL

#### "Wrong program owner" Error
- ✓ Re-deploy the program
- ✓ Verify program ID matches `Anchor.toml`

#### "Signature verification failed"
- ✓ Verify wallet path
- ✓ Check SOL balance
- ✓ Confirm all required signers

## Development Flow

1. Make code changes in `programs/owner_token/src/lib.rs`
2. Build: `pnpm solana:build`
3. Deploy changes:
   - New deployment: `pnpm solana:deploy`
   - Upgrade: `pnpm solana:upgrade owner_token`
4. Test using simulation scripts

::: tip
Always test your changes on localnet before deploying to mainnet
:::

::: warning
Ensure you have enough SOL in your wallet for deployment and transactions
:::
