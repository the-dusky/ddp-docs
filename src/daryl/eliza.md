# Eliza Framework

## Overview

The Eliza framework provides a foundation for building AI agents with customizable personalities, capabilities, and integrations. At its core, it uses a Character-based system that defines the agent's behavior and capabilities.

## Character System

### Base Configuration
Characters are defined using the `Character` interface from `@elizaos/core`. A character includes:

```typescript
export const character: Character = {
  ...defaultCharacter,  // Extends default character traits
  name: "AgentName",   // Agent's identity
  plugins: [],         // List of plugins for extended functionality
  clients: [],         // Communication channels (Twitter, Discord, etc)
  modelProvider: ModelProviderName.OPENAI,  // AI model provider
  settings: {          // Configuration settings
    secrets: {},       // API keys and sensitive data
    voice: {           // Voice settings if applicable
      model: string
    }
  }
}
```

### Personality Components
A character can include:
- `system`: System prompt defining core behavior
- `bio`: Array of biographical details
- `adjectives`: Personality traits
- `interests`: Topics and areas of expertise

## Core Architecture

### Agent Runtime
The `AgentRuntime` is the central piece that orchestrates all components. It's initialized with:

```typescript
const runtime = new AgentRuntime({
  // Database for persistence
  databaseAdapter: db,
  // Authentication token
  token: string,
  // AI model configuration
  modelProvider: character.modelProvider,
  // Character definition
  character: Character,
  // Core and optional plugins
  plugins: [
    bootstrapPlugin,      // Core bootstrap functionality
    nodePlugin,           // Node.js capabilities
    // Optional plugins based on configuration
    character.settings?.secrets?.WALLET_PUBLIC_KEY ? solanaPlugin : null,
  ].filter(Boolean),
  // Extension points
  evaluators: [],        // Custom evaluation logic
  providers: [],         // Service providers
  actions: [],          // Custom actions
  services: [],         // Additional services
  managers: [],         // Component managers
  // Caching system
  cacheManager: CacheManager
});
```

### Core Components

1. **AgentRuntime** (`@elizaos/core`)
   - Main runtime for managing agent lifecycle
   - Handles core agent functionality

2. **Client System**
   The client system provides communication interfaces for different platforms. Clients are initialized based on the character's configuration and plugin requirements.

   ### Client Types
   - **Auto** (`@elizaos/client-auto`): Automated interaction client
   - **Discord** (`@elizaos/client-discord`): Discord bot integration
   - **Telegram** (`@elizaos/client-telegram`): Telegram bot integration
   - **Twitter** (`@elizaos/client-twitter`): Twitter API integration

   ### Client Initialization
   ```typescript
   async function initializeClients(character: Character, runtime: IAgentRuntime) {
     const clients = [];
     // Get configured client types from character
     const clientTypes = character.clients?.map(str => str.toLowerCase()) || [];

     // Initialize platform-specific clients
     if (clientTypes.includes("twitter")) {
       const twitterClients = await TwitterClientInterface.start(runtime);
       clients.push(twitterClients);
     }

     // Initialize plugin-specific clients
     for (const plugin of character.plugins || []) {
       if (plugin.clients) {
         for (const client of plugin.clients) {
           clients.push(await client.start(runtime));
         }
       }
     }

     return clients;
   }
   ```

   ### Client Integration
   - Each client implements a platform-specific interface
   - Clients are started with the runtime context
   - Plugins can provide additional client types
   - Clients handle platform-specific communication

3. **Plugin System**
   The plugin system allows extending the agent's functionality through modular components. Plugins can provide additional clients, services, and capabilities.

   ### Core Plugins
   - **Bootstrap** (`@elizaos/plugin-bootstrap`): Core initialization and setup
   - **Node** (`@elizaos/plugin-node`): Node.js runtime capabilities
   - **AgentKit** (`@elizaos/plugin-agentkit`): Base agent functionality

   ### Blockchain Plugins
   - **Solana** (`@elizaos/plugin-solana`): Solana blockchain integration
   - **Starknet** (`@elizaos/plugin-starknet`): StarkNet L2 integration

   ### Plugin Integration
   Plugins can be added in two ways:

   1. Character Configuration
   ```typescript
   export const character: Character = {
     ...defaultCharacter,
     plugins: [agentKitPlugin],  // Character-specific plugins
   }
   ```

   2. Runtime Configuration
   ```typescript
   const runtime = new AgentRuntime({
     plugins: [
       bootstrapPlugin,      // Core functionality
       nodePlugin,           // Node.js support
       // Conditional plugins
       character.settings?.secrets?.WALLET_PUBLIC_KEY ? solanaPlugin : null,
     ].filter(Boolean)
   });
   ```

   ### Plugin Features
   - Can provide custom clients
   - May include additional services
   - Can extend core functionality
   - May require specific configuration
   - Can be conditionally loaded

## Agent Lifecycle

### 1. Initialization
```typescript
async function startAgent(character: Character, directClient: DirectClient) {
  // 1. Setup
  character.id ??= stringToUuid(character.name);
  character.username ??= character.name;
  
  // 2. Configure Dependencies
  const token = getTokenForProvider(character.modelProvider, character);
  const dataDir = path.join(__dirname, "../data");
  
  // 3. Initialize Database
  const db = initializeDatabase(dataDir);
  await db.init();
  
  // 4. Setup Cache
  const cache = initializeDbCache(character, db);
  
  // 5. Create Runtime
  const runtime = createAgent(character, db, cache, token);
  await runtime.initialize();
  
  // 6. Initialize Clients
  runtime.clients = await initializeClients(character, runtime);
  
  // 7. Register with Direct Client
  directClient.registerAgent(runtime);
}
```

### 2. Components

1. **Database**
   - Persistent storage for agent data
   - Initialized with a data directory
   - Must be initialized before use

2. **Cache**
   - Character-specific caching
   - Built on top of database
   - Improves performance

3. **Direct Client**
   - Registers agents with the system
   - Manages agent communication
   - Handles direct interactions

### 3. Error Handling
- Comprehensive error logging
- Graceful error recovery
- Detailed error reporting

## Areas to Investigate

1. Event System
   - Event flow between components
   - Event handling patterns
   - Event queue implementation

2. Plugin Development
   - Plugin interfaces and contracts
   - Extension points
   - Service integration

3. State Management
   - Runtime state handling
   - Persistence strategies
   - State synchronization

_This documentation will be updated as we learn more about the framework._
