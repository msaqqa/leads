tailwind.config = {
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      body: ["Poppins", "sans-serif"],
      mono: ["ui-monospace", "monospace"],
    },
    extend: {
      colors: {
        "neutral-900": "#121212",
        "blue-500": "#0074d9",
        accent: "#ff5323",
        gray: {
          300: "#e0e0e0",
          400: "#bdbdbd",
          500: "#616161",
        },
      },
      transitionDuration: {
        DEFAULT: "500ms",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
