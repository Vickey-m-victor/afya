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
      name: "User Interface",
      heading: true,
    },

    {
      name: "Multi Level Menu",
      icon: "si si-puzzle",
      sub: [
        {
          name: "Link 1-1",
          to: "#",
        },
        {
          name: "Link 1-2",
          to: "#",
        },
        {
          name: "Sub Level 2",
          sub: [
            {
              name: "Link 2-1",
              to: "#",
            },
            {
              name: "Link 2-2",
              to: "#",
            },
            {
              name: "Sub Level 3",
              sub: [
                {
                  name: "Link 4-1",
                  to: "#",
                },
                {
                  name: "Link 4-2",
                  to: "#",
                },
                {
                  name: "Sub Level 5",
                  sub: [
                    {
                      name: "Link 5-1",
                      to: "#",
                    },
                    {
                      name: "Link 5-2",
                      to: "#",
                    },
                    {
                      name: "Sub Level 6",
                      sub: [
                        {
                          name: "Link 6-1",
                          to: "#",
                        },
                        {
                          name: "Link 6-2",
                          to: "#",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Pages",
      heading: true,
    },
    {
      name: "Generic",
      icon: "si si-layers",
      subActivePaths: "/backend/pages/generic",
      sub: [
        {
          name: "Profile",
          to: "dashboard",
        },
        {
          name: "Profile Edit",
          to: "dashboard",
        },

        {
          name: "Maintenance",
          to: "specials-maintenance",
        },
        {
          name: "Status",
          to: "specials-status",
        },
        {
          name: "Installation",
          to: "specials-installation",
        },
       
        {
          name: "Coming Soon",
          to: "specials-coming-soon",
        },
      ],
    },
    {
      name: "Authentication",
      icon: "si si-lock",
      subActivePaths: "/backend/pages/auth",
      sub: [
       

        {
          name: "Sign In 3",
          to: "auth-signin3",
        },

        {
          name: "Sign Up 3",
          to: "auth-signup3",
        },

        {
          name: "Lock Screen 3",
          to: "auth-lock3",
        },

        {
          name: "Pass Reminder 3",
          to: "auth-reminder3",
        },

        {
          name: "Two Factor 3",
          to: "auth-two-factor3",
        },
      ],
    },
    {
      name: "Error Pages",
      icon: "si si-fire",
      subActivePaths: "/backend/pages/errors",
      sub: [
   
        {
          name: "400",
          to: "error-400",
        },
        {
          name: "401",
          to: "error-401",
        },
        {
          name: "403",
          to: "error-403",
        },
        {
          name: "404",
          to: "error-404",
        },
        {
          name: "500",
          to: "error-500",
        },
        {
          name: "503",
          to: "error-503",
        },
      ],
    },
  ],
  boxed: [
    {
      name: "Dashboard",
      to: "backend-boxed-dashboard",
      icon: "si si-compass",
    },
    {
      name: "Pages",
      heading: true,
    },

    {
      name: "Go Back",
      to: "dashboard",
      icon: "si si-action-undo",
    },
  ],
  demo: [
    {
      name: "Home",
      to: "#",
      icon: "fa fa-home",
      badge: 5,
    },

    {
      name: "Personal",
      heading: true,
    },
    {
      name: "Profile",
      icon: "far fa-user",
      sub: [
        {
          name: "Edit",
          to: "#",
        },
        {
          name: "Settings",
          to: "#",
        },
        {
          name: "Log out",
          to: "#",
        },
      ],
    },
  ],
};
