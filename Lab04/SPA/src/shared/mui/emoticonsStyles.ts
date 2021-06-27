import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const emoticonStyles = makeStyles((theme: Theme) => createStyles({
  extended: {
    marginRight: theme.spacing(.5),
    fontSize: 12,
    width: 'auto',
    height: '22px',
    padding: '0 4px',
    minWidth: '32px',
    minHeight: 'auto',
  },
}),
);

export const tooltipStyles = makeStyles(() => 
  createStyles({
    tooltip: {
      fontSize: 16
    },
  }));

  
export const iconStyles = makeStyles(() => createStyles({
  root: {
    fontSize: 16,
    minHeight: '16px',
    maxHeight: '16px',
    minWidth: '16px',
    maxWidth: '16px',
  },
}));
