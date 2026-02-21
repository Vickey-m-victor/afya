/*
 * Main and demo navigation arrays
 *
 * 'to' attribute points to the route name, not the path url
 */

export default {
  main: [
    {
      name: "Dashboard",
      to: "dashboard",
      icon: "si si-speedometer",
    },
    {
      name: "IAM",
      heading: true,
    },
    {
      name: "Users",
      to: "iam/users",
      icon: "fa fa-users",
    },
    {
      name: "RBAC",
      icon: "fa fa-shield-halved",
      subActivePaths: "/iam/rbac",
      sub: [
        {
          name: "Roles",
          to: "iam/rbac/roles",
          icon: "fa fa-user-shield",
        },
        {
          name: "Permissions",
          to: "iam/rbac/permissions",
          icon: "fa fa-key",
        },
        {
          name: "Groups",
          to: "iam/rbac/groups",
          icon: "fa fa-user-group",
        },
        {
          name: "Business Rules",
          to: "iam/rbac/rules",
          icon: "fa fa-gavel",
        },
      ],
    },
    {
      name: "Admin",
      heading: true,
    },
    {
      name: "Logs Management",
      icon: "fa fa-file-lines",
      subActivePaths: "/admin/logs",
      sub: [
        {
          name: "Access Logs",
          to: "admin/logs/access",
          icon: "fa fa-door-open",
        },
        {
          name: "Audit Trail",
          to: "admin/logs/audit",
          icon: "fa fa-clipboard-list",
        },
        {
          name: "Error Logs",
          to: "admin/logs/errors",
          icon: "fa fa-circle-exclamation",
        },
      ],
    },
    {
      name: "Tests",
      heading: true,
    },
    {
      name: "Tests",
      to: "tests/components",
      icon: "si si-settings",
    },
  ],


};
