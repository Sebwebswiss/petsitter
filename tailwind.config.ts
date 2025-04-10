import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xl": "1400px",
      },
      colors: {
        primary: "#D3B34F",
        secondary: "#666666",
        tertiary: "#EDEEF4",
        dark: "#0a0a0a"
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(to right, #B3932D, #F2D370, #D3B34F)",
      },
      textColor: {
        "primary-gradient": "text-transparent bg-clip-text",
      },
    },
  },
  plugins: [],
};
export default config;
