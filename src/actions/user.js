import { FETCH_USER_REQUEST  } from '../constants/counter';


export const get_user = () => {
  return {
    type: FETCH_USER_REQUEST
  }
};