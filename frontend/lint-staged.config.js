import { relative } from 'path';

const eslintCommand = (filenames) =>
  `eslint ${filenames.map((f) => relative(process.cwd(), f)).join(' ')}`;


export default {
  '*.{js,jsx,ts,tsx}': [eslintCommand],
};