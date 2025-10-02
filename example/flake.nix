{
  inputs = {
    xnode-manager.url = "github:Openmesh-Network/xnode-manager";
    miniapp-factory-frontend.url = "github:OpenxAI-Network/miniapp-factory-frontend";
    nixpkgs.follows = "miniapp-factory-frontend/nixpkgs";
  };

  outputs = inputs: {
    nixosConfigurations.container = inputs.nixpkgs.lib.nixosSystem {
      specialArgs = {
        inherit inputs;
      };
      modules = [
        inputs.xnode-manager.nixosModules.container
        {
          services.xnode-container.xnode-config = {
            host-platform = ./xnode-config/host-platform;
            state-version = ./xnode-config/state-version;
            hostname = ./xnode-config/hostname;
          };
        }
        inputs.miniapp-factory-frontend.nixosModules.default
        {
          services.miniapp-factory-frontend.enable = true;
          services.miniapp-factory-frontend.url = "https://miniapp-factory.marketplace.openxai.network";
        }
      ];
    };
  };
}
