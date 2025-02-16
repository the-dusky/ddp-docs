# Technical Architecture

## Component Architecture

<FullscreenDiagram>

```mermaid
classDiagram
    class AgentRuntime {
        +initializeClients()
        +createAgent()
        +handleEvents()
    }
    
    class TwitterBot {
        +tweet(message)
        -client
    }
    
    class EthereumWallet {
        +checkNewTransactions()
        +handleTransaction()
        -provider
    }
    
    class SolanaPlugin {
        +initialize()
        +handleTransaction()
    }
    
    class StarknetPlugin {
        +initialize()
        +handleTransaction()
    }

    class EventQueue {
        +push(event)
        +process()
    }

    class TweetGenerator {
        +generateFromTransaction()
        +formatMessage()
    }

    AgentRuntime --> TwitterBot
    AgentRuntime --> EthereumWallet
    AgentRuntime --> SolanaPlugin
    AgentRuntime --> StarknetPlugin
    EthereumWallet --> EventQueue
    SolanaPlugin --> EventQueue
    StarknetPlugin --> EventQueue
    EventQueue --> TweetGenerator
    TweetGenerator --> TwitterBot
```
</FullscreenDiagram>

## Transaction Flow

<FullscreenDiagram>

```mermaid
sequenceDiagram
    participant User
    participant Base as Base Testnet
    participant Wallet as EthereumWallet
    participant Queue as EventQueue
    participant Generator as TweetGenerator
    participant Twitter as TwitterBot

    User->>Base: Send Transaction
    Base->>Wallet: Transaction Event
    Wallet->>Queue: Push Transaction
    Queue->>Generator: Process Event
    Generator->>Twitter: Send Tweet
    Twitter-->>User: Tweet Posted
```
</FullscreenDiagram>

## Event Processing Architecture

<FullscreenDiagram>

```mermaid
flowchart TB
    subgraph Event Sources
        Base[Base Testnet Events]
        Solana[Solana Events]
        Starknet[Starknet Events]
    end

    subgraph Processing Pipeline
        Queue[Event Queue]
        Filter[Event Filter]
        Enrich[Event Enrichment]
        Generate[Content Generation]
    end

    subgraph Output
        Twitter[Twitter API]
        Analytics[Event Analytics]
        Storage[Event Storage]
    end

    Base --> Queue
    Solana --> Queue
    Starknet --> Queue
    
    Queue --> Filter
    Filter --> Enrich
    Enrich --> Generate
    
    Generate --> Twitter
    Generate --> Analytics
    Generate --> Storage
```
</FullscreenDiagram>

## State Management

<FullscreenDiagram>

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Monitoring: Initialize
    
    state Monitoring {
        [*] --> WaitingForTx
        WaitingForTx --> ProcessingTx: New Transaction
        ProcessingTx --> GeneratingTweet: Valid Event
        ProcessingTx --> WaitingForTx: Invalid Event
        GeneratingTweet --> PostingTweet: Content Ready
        PostingTweet --> WaitingForTx: Tweet Posted
    }
    
    Monitoring --> Error: System Error
    Error --> Monitoring: Recovery
    Error --> [*]: Fatal Error
```
</FullscreenDiagram>

## Technical Details

### Event Queue Processing
- Events are processed in FIFO order
- Each event type (Base, Solana, Starknet) has specific validation rules
- Failed events are logged and can be retried
- Successful events trigger the tweet generation pipeline

### Transaction Monitoring
- Base Testnet: Monitors for incoming transactions to specified addresses
- Solana: Uses websocket subscription for real-time updates
- Starknet: Polls for new transactions periodically

### Tweet Generation
- Uses transaction data to generate contextual tweets
- Applies personality template based on Leo's character
- Includes relevant blockchain details and links
- Maintains conversation history for context

### Error Handling
- Automatic retry for failed API calls
- Circuit breaker pattern for external services
- Detailed error logging and monitoring
- Graceful degradation of services
