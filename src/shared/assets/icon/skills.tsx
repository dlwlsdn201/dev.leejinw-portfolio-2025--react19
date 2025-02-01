import { IconSize } from '@app/config/icon';
import {
  SiEslint,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

type Skills =
  | 'react'
  | 'styledComponents'
  | 'tailwindCss'
  | 'javascript'
  | 'typescript'
  | 'nextjs'
  | 'eslint';

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

const iconMaps: { [key in Skills]: React.ReactElement } = {
  react: ReactIcon,
  styledComponents: StyledComponentsIcon,
  tailwindCss: TailwindCssIcon,
  javascript: JavascriptIcon,
  typescript: TypescriptIcon,
  nextjs: NextjsIcon,
  eslint: EslintIcon,
};

export const SkillsIconProvider = (skillKeys: Skills[]) => {
  return skillKeys.map((key) => iconMaps[key]);
};
