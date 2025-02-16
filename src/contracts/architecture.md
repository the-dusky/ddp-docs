# Contract Architecture

## Contract Files and Components

```mermaid
graph TB
    subgraph Contracts
        subgraph Core Contracts
            DDPToken[DDPToken.sol<br/>Non-upgradeable ERC-1155<br/>- Core token operations<br/>- Immutable]
            DDPBrand[DDPBrand.sol<br/>Cloneable ERC-1155<br/>- Simple token operations<br/>- Controlled by business]
            DDPBusiness[DDPBusiness.sol<br/>Non-upgradeable<br/>- Brand management<br/>- Token operations<br/>- Swappable]
            DDPFactory[DDPFactory.sol<br/>Upgradeable UUPS<br/>- Brand deployment<br/>- Cross-chain compatibility]
        end

        subgraph Interfaces
            IDDPToken[IDDPToken.sol]
            IDDPBusiness[IDDPBusiness.sol]
            IDDPBrand[IDDPBrand.sol]
        end
    end

    subgraph Deployment Scripts
        Token[001_deploy_token.ts<br/>- Deploy token<br/>- Set owner]
        Brand[002_deploy_brand.ts<br/>- Deploy implementation<br/>- No initialization]
        Business[003_deploy_business.ts<br/>- Deploy business<br/>- Link token]
        Factory[004_deploy_factory.ts<br/>- Deploy with proxy<br/>- Two-step initialization]
    end

    %% Contract Dependencies
    DDPToken --> IDDPToken
    DDPBusiness --> IDDPBusiness
    DDPBrand --> IDDPBrand
    DDPFactory --> DDPBrand
    DDPFactory --> DDPBusiness
    DDPFactory --> DDPToken

    %% Deployment Dependencies
    Token --> DDPToken
    Brand --> DDPBrand
    Business --> DDPBusiness
    Business --> Token
    Factory --> Brand
    Factory --> Business
    Factory --> Token

```

## Operational Flow

```mermaid
sequenceDiagram
    participant User
    participant Factory as DDPFactory
    participant Business as DDPBusiness
    participant Brand as New Brand
    participant Token as DDPToken

    User->>Factory: createBrand(id, name, symbol)
    activate Factory
    Factory->>Factory: generateBrandSalt(id, owner)
    Factory->>Brand: clone DDPBrand implementation
    activate Brand
    Factory->>Business: createBrand(owner, brand)
    activate Business
    Business->>Token: mint brand token
    Token-->>Business: tokenId
    Business-->>Factory: tokenId
    Factory->>Brand: initialize(token, business, tokenId, name, symbol)
    Brand-->>Factory: initialized
    Factory-->>User: brand address, tokenId
    deactivate Factory
    deactivate Brand
    deactivate Business

    note over User,Token: Brand is now ready for use through business contract
```

## Component Relationships

```mermaid
graph LR
    subgraph Core System
        Factory[DDPFactory<br/>Upgradeable]
        Business[DDPBusiness<br/>Swappable]
        Token[DDPToken<br/>Immutable]
    end

    subgraph Brand Instances
        Brand1[Brand 1<br/>ERC-1155]
        Brand2[Brand 2<br/>ERC-1155]
        Brand3[Brand 3<br/>ERC-1155]
    end

    Factory -->|Creates| Brand1
    Factory -->|Creates| Brand2
    Factory -->|Creates| Brand3
    
    Business -->|Controls| Brand1
    Business -->|Controls| Brand2
    Business -->|Controls| Brand3
    
    Token -->|Owns| Brand1
    Token -->|Owns| Brand2
    Token -->|Owns| Brand3

    classDef core fill:#f9f,stroke:#333,stroke-width:4px
    classDef brand fill:#bbf,stroke:#333,stroke-width:2px
    class Factory,Business,Token core
    class Brand1,Brand2,Brand3 brand
```

## Key Features

### Brand Creation
- Factory creates deterministic brand addresses
- Business handles brand setup and token minting
- Brands are simple ERC-1155 contracts

### Token Operations
- All token operations go through business contract
- Business contract can be swapped for new logic
- Token ownership is immutable

### Cross-Chain Compatibility
- Same brand = same address on all chains
- Uses CREATE2 for deterministic addresses
- Factory handles cross-chain coordination

### Upgrade Paths
- Factory is upgradeable for deployment changes
- Business logic is swappable for new features
- Brand contracts are simple and stable

### Security Model
- Core token functionality is immutable
- Brand operations controlled by business
- Factory upgrades controlled by owner
