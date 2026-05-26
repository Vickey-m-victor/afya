const layout = 'LayoutBackend';

export default [
  {
    path: '/admin/settings/general',
    name: 'admin/settings/general',
    component: () => import('../views/settings/GeneralSettingsView.vue'),
    meta: { title: 'Afya365 - General Settings', layout: layout }
  },
  {
    path: '/admin/settings/mailer',
    name: 'admin/settings/mailer',
    component: () => import('../views/settings/MailerSettingsView.vue'),
    meta: { title: 'Afya365 - Mailer Settings', layout: layout }
  },
  {
    path: '/admin/settings/security',
    name: 'admin/settings/security',
    component: () => import('../views/settings/SecuritySettingsView.vue'),
    meta: { title: 'Afya365 - Security Settings', layout: layout }
  },
  {
    path: '/admin/settings/theme',
    name: 'admin/settings/theme',
    component: () => import('../views/settings/ThemeSettingsView.vue'),
    meta: { title: 'Afya365 - Theme Settings', layout: layout }
  },
];
