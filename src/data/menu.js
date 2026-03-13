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
    // {
    //   name: "Tests",
    //   to: "tests",
    //   icon: "si si-settings",
    // },
    // {
    //   name: "Components",
    //   to: "components",
    //   icon: "si si-settings",
    // },

    {
      name: "HR Management",
      icon:  "si si-people",
      subActivePaths: "/hr/",
      sub: [
    {
      name: "Departments",
      to: "hr-departments",
      icon: "si si-layers",
    },
    {
      name: "Job Titles",
      to: "hr-job-titles",
      icon: "si si-briefcase",
    },
    {
      name: "Job Groups",
      to: "hr-job-groups",
      icon: "si si-briefcase",
    },
    {
      name: "Leave Types",
      to: "hr-leave-types",
      icon: "si si-calendar",
    },
    {
      name: "Payroll",
      to: "hr-payroll-settings",
      icon: "si si-wallet",
    },
    {
      name: "Public Holidays",
      to: "hr-public-holidays",
      icon: "si si-globe",
    },
    {
      name: "Statutory Rates",
      to: "hr-statutory-rates",
      icon: "si si-calculator",
    },
    {name: "Work Shifts",
     to: "hr-work-shifts",
     icon: "si si-clock",
    },
    {
      name: "Worker Union",
      to: "hr-worker-unions",
      icon: "si si-users",

    },
  ],
},

    {
      name: "IAM & Admin",
      heading: true,
    },

    {
      name: "Access Control",
      icon:  "si si-lock",
      subActivePaths: "/iam/accesscontrol",
      sub: [
    {
      name: "Groups",
      to: "iam-groups",
      icon: "si si-users",
    },
    {
      name: "Permissions",
      to: "iam-permissions",
      icon: "si si-lock",
    },
    {
      name: "Roles",
      to: "iam-roles",
      icon: "si si-briefcase",
    },
    // {
    //   name: "Rules",
    //   to: "iam-rules",
    //   icon: "si si-shield",
    // },
    {
      name: "Users",
      to: "iam-users",
      icon: "si si-user", 

    },
      ],
    },
    
    {
      name: "Log Management",
      icon: "si si-docs",
      subActivePaths: "/iam/logmanagement",
      sub: [
    {
      name: "Access Logs",
      to: "admin-access-logs",
      icon: "si si-notebook",
    },
    {
      name: "Audit Trails",
      to: "admin-audit-trails",
      icon: "si si-docs",
    },
    {
      name: "Error Logs",
      to: "admin-error-logs",
      icon: "si si-wrench",
    },
      ],
    },
    {
      name: "Settings",
      icon: "si si-settings",
      subActivePaths: "/admin/settings",
      sub: [
    {
      name: "General",
      to: "admin-settings-generals",
      icon: "si si-settings",
    },
    {
      name: "Mailer",
      to: "admin-settings-mailers",
      icon: "si si-envelope-letter",
    },
    {
      name: "Security",
      to: "admin-settings-securitys",
      icon: "si si-shield",
    },
    {
      name: "Theme",
      to: "admin-settings-themes",
      icon: "si si-magic-wand",
    },
  
      ],
    },
    {
      name: "Task Manager",
      to: "admin-task-managers",
      icon: "si si-rocket",
    }   
  ],


};
