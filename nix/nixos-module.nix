{
  config,
  pkgs,
  lib,
  ...
}:
let
  cfg = config.services.miniapp-factory-frontend;
  miniapp-factory-frontend = pkgs.callPackage ./package.nix { };
in
{
  options = {
    services.miniapp-factory-frontend = {
      enable = lib.mkEnableOption "Enable the nextjs app";

      hostname = lib.mkOption {
        type = lib.types.str;
        default = "0.0.0.0";
        example = "127.0.0.1";
        description = ''
          The hostname under which the app should be accessible.
        '';
      };

      port = lib.mkOption {
        type = lib.types.port;
        default = 3000;
        example = 3000;
        description = ''
          The port under which the app should be accessible.
        '';
      };

      url = lib.mkOption {
        type = lib.types.str;
        example = "https://miniapp.miniapp-factory.marketplace.openxai.network";
        description = ''
          The url under which the app is hosted.
        '';
      };

      accountAssociation = {
        header = lib.mkOption {
          type = lib.types.str;
          default = "";
          example = "eyJmaWQiOjkxNTIsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgwMmVmNzkwRGQ3OTkzQTM1ZkQ4NDdDMDUzRURkQUU5NDBEMDU1NTk2In0";
          description = ''
            The header of mini app account association. https://miniapps.farcaster.xyz/docs/guides/publishing#verifying-ownership
          '';
        };

        payload = lib.mkOption {
          type = lib.types.str;
          default = "";
          example = "eyJkb21haW4iOiJyZXdhcmRzLndhcnBjYXN0LmNvbSJ9";
          description = ''
            The payload of mini app account association. https://miniapps.farcaster.xyz/docs/guides/publishing#verifying-ownership
          '';
        };

        signature = lib.mkOption {
          type = lib.types.str;
          default = "";
          example = "MHgxMGQwZGU4ZGYwZDUwZTdmMGIxN2YxMTU2NDI1MjRmZTY0MTUyZGU4ZGU1MWU0MThiYjU4ZjVmZmQxYjRjNDBiNGVlZTRhNDcwNmVmNjhlMzQ0ZGQ5MDBkYmQyMmNlMmVlZGY5ZGQ0N2JlNWRmNzMwYzUxNjE4OWVjZDJjY2Y0MDFj";
          description = ''
            The signature of mini app account association. https://miniapps.farcaster.xyz/docs/guides/publishing#verifying-ownership
          '';
        };
      };

      baseBuilder = {
        allowedAddresses = lib.mkOption {
          type = lib.types.listOf lib.types.str;
          default = [ ];
          example = [ "0x44e2f8cB623f359B902907570EcfEE45fa5BD21B" ];
          description = ''
            Allow Base Build account connection.
          '';
        };
      };

      openFirewall = lib.mkOption {
        type = lib.types.bool;
        default = true;
        description = ''
          Whether to open ports in the firewall for this application.
        '';
      };
    };
  };

  config = lib.mkIf cfg.enable {
    users.groups.miniapp-factory-frontend = { };
    users.users.miniapp-factory-frontend = {
      isSystemUser = true;
      group = "miniapp-factory-frontend";
    };

    systemd.services.miniapp-factory-frontend = {
      wantedBy = [ "multi-user.target" ];
      description = "Web interface for Mini App Factory.";
      after = [ "network.target" ];
      environment = {
        HOSTNAME = cfg.hostname;
        PORT = toString cfg.port;
        NEXT_PUBLIC_URL = cfg.url;
        NEXT_PUBLIC_ACCOUNT_ASSOCIATION = builtins.toJSON cfg.accountAssociation;
        NEXT_PUBLIC_BASE_BUILDER = builtins.toJSON cfg.baseBuilder;
      };
      serviceConfig = {
        ExecStart = "${lib.getExe miniapp-factory-frontend}";
        User = "miniapp-factory-frontend";
        Group = "miniapp-factory-frontend";
        CacheDirectory = "mini-app";
      };
    };

    networking.firewall = lib.mkIf cfg.openFirewall {
      allowedTCPPorts = [ cfg.port ];
    };
  };
}
