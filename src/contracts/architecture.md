# Contract Architecture

## Contract Files and Components

<FullscreenDiagram>

```mermaid
graph TB
    subgraph Core System
        FactoryImpl[1155 Factory Implementation<br/>UUPS + Ownable]-->|upgrades|FactoryProxy[1155 Factory Proxy];
        FactoryProxy-->|delegates|FactoryImpl;
    end

    subgraph Brand Creation
        Template[1155 Template Contract]-->|blueprint for|BrandImpl[Brand Implementation];
        FactoryProxy-->|creates|BrandImpl;
        BusinessLogic[Business Logic Contract]-->|configures|BrandImpl;
        BrandImpl-->|initializes with|FirstToken[First Token];
    end

    subgraph Brand Contracts
        BrandImpl-->|configured becomes|Brand1[Brand Instance 1];
        BrandImpl-->|configured becomes|Brand2[Brand Instance 2];
        BrandImpl-->|configured becomes|Brand3[Brand Instance 3];

        subgraph Brand Features
            Brand1-->CoreFeatures1[Core Features<br/>Mint, Transfer, etc];
            Brand1-->BusinessLogic1[Business Logic<br/>Delegation];
            Brand1-->GovernanceLogic1[Governance Logic<br/>Delegation];
            Brand1-->State1[Token State];

            BusinessLogic1-->BusinessContract[Business Logic Contract];
            GovernanceLogic1-->GovernanceContract[Governance Contract];

            subgraph Token State
                State1-->TokenTypes1[Token Types];
            end
        end
    end

    classDef core fill:#f9f,stroke:#333,stroke-width:2px;
    classDef brand fill:#bbf,stroke:#333,stroke-width:2px;
    classDef feature fill:#dfd,stroke:#333,stroke-width:1px;
    classDef contract fill:#fdd,stroke:#333,stroke-width:1px;

    class ProxyAdmin,FactoryImpl,FactoryProxy,Template core;
    class Brand1,Brand2,Brand3 brand;
    class CoreFeatures1,BusinessLogic1,GovernanceLogic1,State1 feature;
    class BusinessContract,GovernanceContract contract;
```

</FullscreenDiagram>

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

## Core Components

### Factory System
- UUPS upgradeable pattern for standard security
- Managed through OpenZeppelin's OwnableUpgradeable
- Creates and initializes new brand instances
- Ensures deterministic addresses across chains

### Brand Template
- Base ERC-1155 implementation
- Core features (minting, transfer, etc)
- Extension points for business and governance logic
- Standardized token state management

### Business Logic
- Delegated business operations
- Swappable implementation for flexibility
- Handles brand-specific rules and operations
- Can be upgraded independently

### Governance Logic
- Delegated governance operations
- Configurable voting and proposal systems
- Manages brand-level decisions
- Can be upgraded independently

### Token State
- Structured token type management
- Support for multiple token categories
- Agent-created branding tokens
- Flexible token metadata

### Security Model
- Proxy admin controls factory upgrades
- Business and governance logic are swappable
- Core features remain immutable
- Clear separation of concerns
