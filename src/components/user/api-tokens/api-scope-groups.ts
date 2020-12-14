import { ApiScope } from './api-scope';

export const apiScopeGroups: { [scope: string]: ApiScope[] } = {
  user: [
    ApiScope.user_read,
    // ApiScope.user_hook_list,
    // ApiScope.user_hook_create,
    // ApiScope.user_hook_read,
    // ApiScope.user_hook_update,
    // ApiScope.user_hook_delete,
  ],
  org: [
    ApiScope.org_create,
    ApiScope.org_read,
    ApiScope.org_list,
    ApiScope.org_update,
    // ApiScope.org_hook_list,
    // ApiScope.org_hook_create,
    // ApiScope.org_hook_read,
    // ApiScope.org_hook_update,
    // ApiScope.org_hook_delete,
  ],
  member: [
    ApiScope.member_get_current,
    ApiScope.members_list,
    ApiScope.member_update,
    ApiScope.member_delete,
  ],
  invite: [
    ApiScope.invite_add,
    ApiScope.invite_delete,
    ApiScope.invite_list,
    ApiScope.invite_read,
    ApiScope.invite_accept,
    ApiScope.invite_decline,
  ],
  team: [
    ApiScope.team_list,
    ApiScope.team_create,
    ApiScope.team_read,
    ApiScope.team_update,
    ApiScope.team_delete,
    ApiScope.team_member_list,
    ApiScope.team_member_add,
    ApiScope.team_member_delete,
    // ApiScope.team_hook_list,
    // ApiScope.team_hook_create,
    // ApiScope.team_hook_read,
    // ApiScope.team_hook_update,
    // ApiScope.team_hook_delete,
  ],
  site: [
    ApiScope.team_sites_list,
    ApiScope.team_sites_add,
    ApiScope.site_delete,
    ApiScope.site_read,
    ApiScope.site_update,
    ApiScope.site_password_set,
    ApiScope.site_password_remove,
    ApiScope.site_name_validate,
    ApiScope.site_branch_add,
    ApiScope.site_branch_delete,
    ApiScope.site_branch_list,
    ApiScope.site_branch_rename,
    ApiScope.site_branch_release_set,
    ApiScope.site_branch_name_validate,
    ApiScope.site_branch_password_set,
    ApiScope.site_branch_password_remove,
    ApiScope.site_branch_files_read,
    ApiScope.site_branch_files_set,
    ApiScope.site_hook_list,
    ApiScope.site_hook_create,
    ApiScope.site_hook_read,
    ApiScope.site_hook_update,
    ApiScope.site_hook_delete,
  ],
  release: [
    ApiScope.site_releases_list,
    ApiScope.release_upload,
    ApiScope.release_read,
    ApiScope.release_update,
    ApiScope.release_delete,
  ],
};
