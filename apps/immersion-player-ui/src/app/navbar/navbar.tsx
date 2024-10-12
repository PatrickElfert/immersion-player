/* eslint-disable-next-line */
import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import { Library24Filled, Settings24Filled } from '@fluentui/react-icons';
import { ReactNode } from 'react';

const useNavbarStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    background: tokens.colorNeutralBackground3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const useNavbarItemStyles = makeStyles({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalM,
    ':hover': {
      color: tokens.colorBrandBackgroundHover,
    },
  },
  active: {
    color: tokens.colorBrandBackground,
  },
});

function NavbarItem({
  children,
  label,
  active,
}: {
  children: ReactNode;
  label: string;
  active: boolean;
}) {
  const classes = useNavbarItemStyles();

  return (
    <div
      className={
        active
          ? mergeClasses(classes.container, classes.active)
          : classes.container
      }
    >
      <div className={'icon'}>{children}</div>
      <label>{label}</label>
    </div>
  );
}

export function Navbar() {
  const classes = useNavbarStyles();

  return (
    <div className={classes.container}>
      <NavbarItem active={true} label={'Library'}>
        <Library24Filled />
      </NavbarItem>
      <NavbarItem active={false} label={'Settings'}>
        <Settings24Filled />
      </NavbarItem>
    </div>
  );
}

export default Navbar;
