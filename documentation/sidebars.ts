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
          type: 'doc',
          label: 'CaptchaService',
          id: 'services/captcha-service/index',
        },
        {
          type: 'doc',
          label: 'APICommunicationManagementService',
          id: 'services/api-communication-management/index',
        },
      ],
    },
    {
      type: 'category',
      label: 'مدل ها',
      link: {
        type: 'generated-index',
      },
      items: [
        {
          type: 'doc',
          label: 'ApiResponse',
          id: 'models/api-response/index',
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
