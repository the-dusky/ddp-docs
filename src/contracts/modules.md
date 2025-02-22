# Module System

The DDP Apps Factory uses a modular architecture to extend the functionality of business and governance features. This allows for flexible, composable, and upgradeable brand management capabilities.

## Module Registry

The Module Registry is a core component that manages all modules in the system:

```solidity
interface IModuleRegistry {
    function registerModule(IDDPModule module) external;
    function enableModule(address extension, IDDPModule module) external;
    function disableModule(address extension, IDDPModule module) external;
    function isModuleEnabled(address extension, IDDPModule module) external view returns (bool);
    function getEnabledModules(address extension) external view returns (IDDPModule[] memory);
}
```

## Module Types

### Business Modules

Business modules extend the functionality of the DDPBusiness contract. They can add features like:

- Minting rules and restrictions
- Transfer controls
- Fee mechanisms
- Metadata management
- Custom business logic

Example business module interface:
```solidity
interface IBusinessModule is IDDPModule {
    function initializeBrand(uint256 brandId, bytes calldata data) external;
    function supportsOperation(bytes4 operationId) external view returns (bool);
}
```

### Governance Modules

Governance modules extend the DDPGovernance contract with features like:

- Voting strategies
- Quorum calculations
- Timelock mechanisms
- Proposal types
- Execution rules

Example governance module interface:
```solidity
interface IGovernanceModule is IDDPModule {
    function onProposalCreated(uint256 proposalId, uint256 brandId, bytes calldata data) external;
    function onVoteCast(uint256 proposalId, address voter, bool support, bytes calldata data) external;
    function beforeExecute(uint256 proposalId) external returns (bool allowed);
}
```

## Using Modules

1. **Registration**:
   - Modules are registered in the ModuleRegistry
   - Only registered modules can be enabled for extensions

2. **Enabling Modules**:
   - Extension owners can enable modules for their extension
   - Multiple modules can be enabled for each extension
   - Modules must support the extension type

3. **Module Operations**:
   - Extensions call into their enabled modules
   - Modules can be enabled/disabled at any time
   - Module state is preserved even when disabled

## Security

The module system is designed with security in mind:

1. **Access Control**:
   - Only registered modules can be enabled
   - Only extension owners can enable/disable modules
   - Modules must explicitly support extensions

2. **Isolation**:
   - Modules cannot interfere with each other
   - Module state is isolated
   - Failed module operations don't block others

3. **Upgradeability**:
   - Modules can be replaced with new versions
   - Extensions remain unchanged when modules update
   - No central point of failure

## Example Module Flow

1. Brand Creation:
   ```mermaid
   sequenceDiagram
       participant Factory
       participant Business
       participant Registry
       participant Module
       
       Factory->>Business: createBrand()
       Business->>Registry: getEnabledModules()
       Registry-->>Business: modules[]
       loop Each Module
           Business->>Module: initializeBrand()
       end
   ```

2. Module Management:
   ```mermaid
   sequenceDiagram
       participant Owner
       participant Registry
       participant Extension
       participant Module
       
       Owner->>Registry: registerModule()
       Owner->>Registry: enableModule()
       Extension->>Registry: getEnabledModules()
       Extension->>Module: moduleOperation()
   ```

## Best Practices

1. **Module Design**:
   - Keep modules focused and single-purpose
   - Use clear interfaces
   - Document all module behaviors
   - Include version information

2. **State Management**:
   - Store module state separately
   - Use clear state access patterns
   - Handle state migrations

3. **Error Handling**:
   - Fail gracefully
   - Provide clear error messages
   - Don't block critical operations

4. **Testing**:
   - Test modules in isolation
   - Test module interactions
   - Verify state consistency
