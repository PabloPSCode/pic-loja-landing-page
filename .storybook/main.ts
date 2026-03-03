import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      builder: { useSWC: true },
      // nextConfigPath: './next.config.js', // <- uncomment if you use a custom path
    },
  },
  staticDirs: ["../public"],
  typescript: {
    check: false,
  },
};

export default config;
