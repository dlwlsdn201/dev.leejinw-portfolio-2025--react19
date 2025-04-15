import { COLOR_THEME } from '@app/config/colors';
import { IconType } from 'react-icons';
import { RiDeleteBinLine } from 'react-icons/ri';

type Tools = 'delete';

/**
 * @desc React Icon
 * @see https://simpleicons.org/?q=react
 */
// const RiDeleteBinLineIcon = (
//   <RiDeleteBinLine size={IconSize.MEDIUM} color={COLOR_THEME.light.danger} />
// );

const iconMaps: {
  [key in Tools]: {
    name: string;
    IconElement: IconType;
  };
} = {
  delete: { name: 'delete', IconElement: RiDeleteBinLine },
};

export const toolsIconProvider = ({ keys }: { keys: Tools[] }) => {
  return keys.map((key) => iconMaps[key]);
};
