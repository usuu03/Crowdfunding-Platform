// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// tailwind.config.js
// const defaultTheme = require("tailwindcss/defaultTheme");

// module.exports = {
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ["Inter var", ...defaultTheme.fontFamily.sans],
//       },
//     },
//   },
//   // ...
// };

import keepPreset from "keep-react/preset";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [keepPreset],
};
