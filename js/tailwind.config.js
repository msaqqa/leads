tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      transitionDuration: {
        DEFAULT: "500ms",
      },
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      body: ["Poppins", "sans-serif"],
      mono: ["ui-monospace", "monospace"],
    },
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
  },
  corePlugins: {
    preflight: false,
  },
};
