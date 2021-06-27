export class OpenIDConfiguration {
  token_endpoint: string;
  token_endpoint_auth_methods_supported: [string];
  jwks_uri: string;
  response_modes_supported: [string];
  subject_types_supported: [string];
  id_token_signing_alg_values_supported: [string];
  response_types_supported: [string];
  scopes_supported: [string];
  issuer: string;
  microsoft_multi_refresh_token: boolean;
  authorization_endpoint: string;
  http_logout_supported: boolean;
  frontchannel_logout_supported: boolean;
  end_session_endpoin: string;
  claims_supported: [string];
  check_session_iframe: string;
  userinfo_endpoint: string;
  tenant_region_scope: string;
  cloud_instance_name: string;
  cloud_graph_host_name: string;
  msgraph_host: string;
  rbac_url: string;
}