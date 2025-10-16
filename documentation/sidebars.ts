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
    'intro',

    // The 'services' category
    {
      type: 'category',
      label: 'سرویس ها',
      link: {
        type: 'generated-index',
        description: 'سرویس ها برای ارتباط با APIها مورد استفاده قرار میگیرند.',
      },
      items: [
        {
          type: 'category',
          label: 'پایانه‌های API',
          link: {
            type: 'doc',
            id: 'services/api_routes/index',
          },
          items: [
            {
              type: 'category',
              label: 'Software User API',
              link: {
                // Added a link property to point to the main index file
                type: 'doc',
                id: 'services/api_routes/software_user_api/index',
              },
              items: [
                // Added sub-items array
                {
                  type: 'doc',
                  label: 'CAPTCHA',
                  id: 'services/api_routes/software_user_api/captcha/index',
                },
              ],
            },
            {
              type: 'doc',
              label: 'Load Allocation API',
              id: 'services/api_routes/load_allocation_api/index',
            },
            {
              type: 'doc',
              label: 'Load Capacitor API',
              id: 'services/api_routes/load_capacitor_api/index',
            },
            {
              type: 'doc',
              label: 'Reports API',
              id: 'services/api_routes/reports_api/index',
            },
            {
              type: 'doc',
              label: 'Ticket API',
              id: 'services/api_routes/ticket_api/index',
            },
            {
              type: 'doc',
              label: 'Transportation API',
              id: 'services/api_routes/transportation_api/index',
            },
            {
              type: 'doc',
              label: 'Wallet and Traffic API',
              id: 'services/api_routes/wallet_and_traffic_api/index',
            },
          ],
        },
      ],
    },

    // The 'tutorial-basics' category
    {
      type: 'category',
      label: 'Tutorial - Basics',
      // Docusaurus will look at _category_.json for label and position if 'link' is not specified
      // and autogenerate the index page if there is no index.md inside.
      items: [
        'tutorial-basics/create-a-document',
        'tutorial-basics/create-a-page',
        'tutorial-basics/create-a-blog-post',
        'tutorial-basics/markdown-features',
        'tutorial-basics/deploy-your-site',
        'tutorial-basics/congratulations',
      ],
    },

    // The 'tutorial-extras' category
    {
      type: 'category',
      label: 'Tutorial - Extras',
      // Docusaurus will autogenerate the index page if there is no index.md inside.
      items: [
        'tutorial-extras/manage-docs-versions',
        'tutorial-extras/translate-your-site',
      ],
    },
  ],
};

export default sidebars;
