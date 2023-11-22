export default {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-modules", // Add this line
  ],
  plugins: [
    "@babel/plugin-proposal-private-methods",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-private-property-in-object",
  ],
};
