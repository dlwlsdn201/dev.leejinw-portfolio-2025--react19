import { COLOR_THEME } from '@app/config/colors';
import { IconSize } from '@app/config/icon';
import { RiDeleteBinLine } from 'react-icons/ri';

type Tools = 'delete';

/**
 * @desc React Icon
 * @see https://simpleicons.org/?q=react
 */
const RiDeleteBinLineIcon = (
  <RiDeleteBinLine size={IconSize.SMALL} color={COLOR_THEME.light.danger} />
);

const iconMaps: {
  [key in Tools]: {
    name: string;
    icon: React.ReactElement;
  };
} = {
  delete: { name: 'delete', icon: RiDeleteBinLineIcon },
};

export const toolsIconProvider = ({ keys }: { keys: Tools[] }) => {
  return keys.map((key) => iconMaps[key]);
};
