# Extensions

DDP Apps Factory uses a flexible extension system for business logic and governance. Extensions are swappable components that can be enhanced with modules.

## Extension Types

### Business Extension

The business extension (`DDPBusiness`) handles brand operations and management:

```solidity
contract DDPBusiness {
    // Core functionality
    function createBrand(...) external;
    function manageBrand(...) external;
    
    // Module integration
    IModuleRegistry public moduleRegistry;
    
    // Module operations
    function _beforeOperation(bytes4 operationId) internal {
        IDDPModule[] memory modules = moduleRegistry.getEnabledModules(address(this));
        for (uint i = 0; i < modules.length; i++) {
            IBusinessModule module = IBusinessModule(address(modules[i]));
            require(module.supportsOperation(operationId), "Operation not supported");
        }
    }
}
```

### Governance Extension

The governance extension (`DDPGovernance`) manages voting and proposals:

```solidity
contract DDPGovernance {
    // Core functionality
    function propose(...) external;
    function vote(...) external;
    
    // Module integration
    IModuleRegistry public moduleRegistry;
    
    // Module operations
    function _beforeProposalExecution(uint256 proposalId) internal {
        IDDPModule[] memory modules = moduleRegistry.getEnabledModules(address(this));
        for (uint i = 0; i < modules.length; i++) {
            IGovernanceModule module = IGovernanceModule(address(modules[i]));
            require(module.beforeExecute(proposalId), "Execution not allowed");
        }
    }
}
```

## Extension Features

1. **Modularity**:
   - Extensions can be swapped out
   - Functionality can be added via modules
   - State is preserved during swaps

2. **Security**:
   - Access control through ownership
   - Module validation
   - Safe state management

3. **Upgradeability**:
   - Extensions can be upgraded
   - Modules can be added/removed
   - No loss of functionality

## Extension Management

1. **Deployment**:
   ```mermaid
   sequenceDiagram
       participant Factory
       participant Extension
       participant Registry
       
       Factory->>Extension: deploy
       Extension->>Registry: setModuleRegistry
       Factory->>Extension: initialize
   ```

2. **Module Integration**:
   ```mermaid
   sequenceDiagram
       participant Extension
       participant Registry
       participant Module
       
       Extension->>Registry: getEnabledModules
       Registry-->>Extension: modules[]
       Extension->>Module: moduleOperation
   ```

## Best Practices

1. **Extension Design**:
   - Keep core logic minimal
   - Use modules for features
   - Clear upgrade paths

2. **State Management**:
   - Separate core and module state
   - Clear state access patterns
   - Safe state transitions

3. **Security**:
   - Validate all operations
   - Check module compatibility
   - Safe module integration
