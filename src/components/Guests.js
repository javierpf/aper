import React, { useContext, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useTranslation } from 'react-i18next';
import Toolbar from './Toolbar';
import { AuthenticationContext } from './Authenticator';
import axios from '../utils/axios';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    minHeight: '-webkit-fill-available',
    background: '#508991'
  },
  cardContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    alignItems: 'center'
  },
  card: {
    margin: theme.spacing(),
    maxWidth: '960px',
    padding: '95px 95px',
    borderRadius: 10,
    [theme.breakpoints.down('md')]: {
      padding: '0px 65px 0px 48px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0px 15px 0px 15px'
    }
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10
  },
  elementsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: theme.spacing()
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    alignItems: 'center'
  },
  text: {
    marginTop: theme.spacing()
  }
}));

const Guests = ({ history }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { authState } = useContext(AuthenticationContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios('current_user');
        localStorage.setItem('currentUser', JSON.stringify(result.data));
        let r = result.data.role;
        if (r === 'ADMIN' || r === 'USER') history.push('home');
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [history]);

  return (
    <div className={classes.mainContainer}>
      {authState.loggedIn && (
        <React.Fragment>
          <Toolbar history={history} />
          <div className={classes.cardContainer}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <div className={classes.elementsContainer}>
                  <Typography className={classes.text} variant="subtitle1">
                    {t('¡Bienvenido!')}
                  </Typography>
                  <Typography className={classes.text} variant="subtitle2">
                    {t('Pedile a un Administrador que te permita usar Aper')}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Guests;
