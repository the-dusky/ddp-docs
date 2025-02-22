# Latest Architecture

This diagram shows the current architectural design of the DDP system, with its central upgradeable contract, modular components, and controlled assets.

<FullscreenDiagram>

```mermaid
graph TD
    %% Factory and UUPS
    UUPS["1967 UUPS Contract"]
    Factory["Factory\nProxy"]
    Factory --> UUPS

    %% Central Contract
    subgraph TycoonContract["Tycoon Contract"]
        %% Treasury Component
        subgraph Treasury["Treasury Component"]
            TreasuryMods["Installable Modules"]
            Income["Income Module"]
            MainAgent["Main Agent Module"]
            TreasuryMods --> Income
            TreasuryMods --> MainAgent
        end

        %% Business Component
        subgraph Business["Business Component"]
            BusinessMods["Installable Modules"]
            UniV4["Uni V4 Module"]
            Props["Props Module"]
            BusinessMods --> UniV4
            BusinessMods --> Props
        end

        %% Governance Component
        subgraph Governance["Governance Component"]
            GovMods["Installable Modules"]
            MajVote["Maj Vote Module"]
            NFTRole["NFT Role Module"]
            GovMods --> MajVote
            GovMods --> NFTRole
        end

        %% Assets Component
        subgraph Assets["Assets Component"]
            AssetMods["Installable Modules"]
            AssetController["Asset Controller Module"]
            AssetRegistry["Asset Registry Module"]
            AssetMods --> AssetController
            AssetMods --> AssetRegistry
        end
    end

    %% Controlled Assets (External Contracts)
    subgraph ControlledAssets["Controlled Assets"]
        ERC20["ERC-20\nGovernance Token"]
        ERC721["ERC-721\nNFT Collection"]
        RoleTokens["Role Tokens"]
        DARYL["D.A.R.Y.L"]
    end

    %% External Connections
    UUPS --> TycoonContract
    UniswapV4["Uniswap V4"] --> Hooks["Hooks Contract"]
    Hooks --> Business
    CFO["CFO"] --> DARYL

    %% Control Relationships
    AssetController --> ERC20
    AssetController --> ERC721
    AssetController --> RoleTokens
    AssetController --> DARYL

    %% Uninstalled Modules
    subgraph UninstalledMods["Uninstalled Modules"]
        subgraph TreasuryModules["Treasury Modules"]
            TM1["Income Module B"]
            TM2["Reserve Module"]
        end
        subgraph BusinessModules["Business Modules"]
            BM1["NFT Market Module"]
            BM2["Staking Module"]
        end
        subgraph GovernanceModules["Governance Modules"]
            GM1["NLA Module"]
            GM2["Contract Upgrade Module"]
        end
    end

    %% Example Installation Path
    GM1 -.-> GovMods
```

</FullscreenDiagram>

This architecture illustrates:
- Central upgradeable contract created by the factory
- Three main components with installable modules: Treasury, Business, and Governance
- External assets that are controlled by the central contract but not part of its functionality
- External protocol integrations
- Available modules that can be installed into appropriate components
