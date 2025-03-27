import { IconSize } from '@app/config/icon';
import {
  SiEslint,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
  SiReactquery,
  SiMantine,
} from 'react-icons/si';

type Skills =
  | 'react'
  | 'styledComponents'
  | 'tailwindCss'
  | 'javascript'
  | 'typescript'
  | 'nextjs'
  | 'eslint'
  | 'tanstack/react-query'
  | 'mantineUI';

/**
 * @desc React Icon
 * @see https://simpleicons.org/?q=react
 */
const ReactIcon = <SiReact size={IconSize.SMALL} color="#61DAFB" />;
const StyledComponentsIcon = (
  <SiStyledcomponents size={IconSize.SMALL} color="#DB7093" />
);
const TailwindCssIcon = <SiTailwindcss size={IconSize.SMALL} color="#06B6D4" />;
const JavascriptIcon = <SiJavascript size={IconSize.SMALL} color="#F7DF1E" />;
const TypescriptIcon = <SiTypescript size={IconSize.SMALL} color="#3178C6" />;
const NextjsIcon = <SiNextdotjs size={IconSize.SMALL} color="#ffffff" />;
const EslintIcon = <SiEslint size={IconSize.SMALL} color="#4B32C3" />;
const ReactqueryIcon = <SiReactquery size={IconSize.SMALL} color="#F1672E" />;
const SiMantineIcon = <SiMantine size={IconSize.SMALL} color="#339AF0" />;

const iconMaps: {
  [key in Skills]: {
    name: string;
    icon: React.ReactElement;
  };
} = {
  react: { name: 'React', icon: ReactIcon },
  styledComponents: { name: 'Styled-Components', icon: StyledComponentsIcon },
  tailwindCss: { name: 'tailwindCSS', icon: TailwindCssIcon },
  javascript: { name: 'JS (ES6)', icon: JavascriptIcon },
  typescript: { name: 'Typescript', icon: TypescriptIcon },
  nextjs: { name: 'Next.js', icon: NextjsIcon },
  eslint: { name: 'Eslint', icon: EslintIcon },
  'tanstack/react-query': {
    name: 'tanstack/react-query',
    icon: ReactqueryIcon,
  },
  mantineUI: { name: 'mantine UI', icon: SiMantineIcon },
};

export const skillsIconProvider = (skillKeys: Skills[]) => {
  return skillKeys.map((key) => iconMaps[key]);
};
