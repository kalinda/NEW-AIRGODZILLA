import { HOST } from '../constants';
import { resetRoute } from './nav';
import { normalizeProfile } from '../utils';
import { backhandler } from 'react-native';

export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_PROFILE = 'SET_PROFILE';
export const SET_PAYMENT = 'SET_PAYMENT';


export function setAccessToken(accessToken) {
  return {
    type: SET_ACCESS_TOKEN,
    accessToken,
  };
}

export function setProfile(profile) {
  return {
    type: SET_PROFILE,
    profile,
  };
}

export function setPayment(payment) {
  return {
    type: SET_PAYMENT,
    payment,
  };
}

export function loginWithFaceboof(facebookAccessToken) {
  return (dispatch) => {
  return fetch(`${HOST}/api/v1/facebook `), {
    method: 'POST',
    body: JSON.stringify({
      facebook_access_token: facebookAccessToken,
    }),
    headers: {"content-type": "application/jason" },
  })
  .then( response => response.json())
  .then(json => {
    console.log(json);

    if (json.acces_token)
    dispatch(setAccessToken(json.access_token));
    dispatch(setProfile (normalizeProfile(json.email,json.fullname, json.image)));
    dispatch(setPayment(!!json.stripe_id));
    dispatch(resetRoute({ routeName: 'Main'}))
     } else {
      alert(json.error);
    }
   })
   .catch(e => alert(e));
 };
}

export function logout() {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken;
    dispatch(SetAccessToken(null));
    dispatch(SetProfile(null));
    dispatch(SetPayment(null));

    fetch(`${HOST}/api/v1/logout?access_token=${accessToken}`)
    .then(response => Backhandler.exitApp() )
    .catch(e => Backhandler.exitApp());

  };
}
