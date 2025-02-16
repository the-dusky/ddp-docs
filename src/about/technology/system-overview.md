# DDP System Overview

This diagram represents the current understanding of the DDP (Decentralized Digital Persona) system.

<FullscreenDiagram>

```mermaid
graph TB
    subgraph Core Components
        Leo[Leo Drückstadt<br/>Restaurant Tech Expert]
        Wallet[Multi-Chain Wallet]
        Twitter[Twitter Integration]
    end

    subgraph Blockchain Integration
        Base[Base Testnet]
        Solana[Solana Integration]
        Starknet[Starknet Integration]
    end

    subgraph Documentation
        VitePress[VitePress Docs]
        API[API Documentation]
        Guides[User Guides]
    end

    subgraph Agent Architecture
        Runtime[Agent Runtime]
        Plugins[Blockchain Plugins]
        EventQueue[Event Queue]
        TweetGen[Tweet Generator]
    end

    Leo --> Twitter
    Leo --> Wallet
    Wallet --> Base
    Wallet --> Solana
    Wallet --> Starknet
    
    Base --> EventQueue
    EventQueue --> TweetGen
    TweetGen --> Twitter

    Runtime --> Plugins
    Plugins --> Wallet

    VitePress --> API
    VitePress --> Guides

    classDef core fill:#f9f,stroke:#333,stroke-width:2px
    classDef blockchain fill:#bbf,stroke:#333,stroke-width:2px
    classDef docs fill:#bfb,stroke:#333,stroke-width:2px
    classDef arch fill:#fbb,stroke:#333,stroke-width:2px

    class Leo,Wallet,Twitter core
    class Base,Solana,Starknet blockchain
    class VitePress,API,Guides docs
    class Runtime,Plugins,EventQueue,TweetGen arch
```
</FullscreenDiagram>

## Component Details

### Core Components
- **Leo Drückstadt**: A tech-savvy restaurant expert persona
- **Multi-Chain Wallet**: Handles transactions across different blockchains
- **Twitter Integration**: Manages social media presence

### Blockchain Integration
- **Base Testnet**: Primary network for receiving funds
- **Solana Integration**: Support for Solana blockchain
- **Starknet Integration**: Support for Starknet operations

### Documentation
- **VitePress Docs**: Main documentation system
- **API Documentation**: Technical integration details
- **User Guides**: Usage instructions and examples

### Agent Architecture
- **Agent Runtime**: Core execution environment
- **Blockchain Plugins**: Modular blockchain integrations
- **Event Queue**: Transaction monitoring system
- **Tweet Generator**: Automated content creation
