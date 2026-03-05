import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
"@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    {
      name: '@storybook/addon-coverage',
      options: {
        istanbul: {
          include: ['src/components/**'],
          exclude: ['**/*.stories.*', '**/*.test.*', '**/index.ts'],
        },
      },
    },
    "@storybook/addon-vitest",
  ],
  "framework": "@storybook/nextjs-vite",
  "staticDirs": [
    "../public"
  ],
  docs: {
    autodocs: 'tag',
  }
};
export default config;