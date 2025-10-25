import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    // The 'intro.md' file at the root
    {
      type: 'doc',
      label: 'مقدمه',
      id: 'intro',
    },

    // The 'services' category
    {
      type: 'category',
      label: 'سرویس ها',
      link: {
        type: 'generated-index',
        description: 'سرویس ها برای ارتباط با APIها مورد استفاده قرار میگیرند.',
      },
      items: [
        'services/captcha-service',
        'services/api-communication-management',
      ],
    },
    {
      type: 'category',
      label: 'مدل ها',
      link: {
        type: 'generated-index',
      },
      items: ['models/api-response'],
    },

    // 🆕 New: The 'shared' category
    {
      type: 'category',
      label: 'کامپوننت های مشترک',
      link: {
        type: 'generated-index',
        description: 'کامپوننت های مشترک UI و ابزارها.',
      },
      items: [
        // 🔄 Existing Input Components Category
        {
          type: 'category',
          label: 'کامپوننت های ورودی',
          link: {
            type: 'generated-index',
            description: 'کامپوننت های ورودی برای دریافت داده از کاربر.',
          },
          items: [
            'shared/inputs/text-input-component',
            'shared/inputs/search-input-component',
            'shared/inputs/search-auto-complete-component',
            'shared/inputs/search-auto-complete-factory',
            'shared/inputs/password-input-component',
            'shared/inputs/checkbox-input-component',
            'shared/inputs/binary-radio-input-component',
            'shared/inputs/toggle-switch-input-component',
            'shared/inputs/date-picker-input-component',
            'shared/inputs/time-picker-input-component',
            'shared/inputs/captcha-input-component',
            'shared/inputs/select-input-component', // Added
          ],
        },

        // 🆕 New: Layout Components Category
        {
          type: 'category',
          label: 'کامپوننت های ساختار (Layout)',
          link: {
            type: 'generated-index',
            description: 'بخش‌های اصلی ساختار داشبورد (Header, Sidebar, Tabs).',
          },
          items: [
            'shared/layout/header',
            'shared/layout/sidebar',
            'shared/layout/mobile-side-bar',
            'shared/layout/tab-manager',
            'shared/layout/dashboard-content-manager',
            'shared/layout/footer',
          ],
        },

        // 🔄 Main Shared Components
        'shared/button-component',
        'shared/table-component',
        'shared/tree-table-checkbox',
        'shared/user-profile',
        'shared/wallet-profile',
        'shared/theme-managament',
        'shared/exit-confirmation-dialog-component',
        'shared/support-button-component',
      ],
    },

    // The 'tutorial-basics' category
    // {
    //   type: 'category',
    //   label: 'Tutorial - Basics',
    //   // Docusaurus will look at _category_.json for label and position if 'link' is not specified
    //   // and autogenerate the index page if there is no index.md inside.
    //   items: [
    //     'tutorial-basics/create-a-document',
    //     'tutorial-basics/create-a-page',
    //     'tutorial-basics/create-a-blog-post',
    //     'tutorial-basics/markdown-features',
    //     'tutorial-basics/deploy-your-site',
    //     'tutorial-basics/congratulations',
    //   ],
    // },
    //
    // // The 'tutorial-extras' category
    // {
    //   type: 'category',
    //   label: 'Tutorial - Extras',
    //   // Docusaurus will autogenerate the index page if there is no index.md inside.
    //   items: [
    //     'tutorial-extras/manage-docs-versions',
    //     'tutorial-extras/translate-your-site',
    //   ],
    // },
  ],
};

export default sidebars;
