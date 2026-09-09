import nextConfig from 'eslint-config-next';

// eslint-config-next now ships a native flat-config array (core-web-vitals +
// TypeScript rules already combined) — no FlatCompat/legacy-shim needed.
const eslintConfig = [...nextConfig];

export default eslintConfig;
