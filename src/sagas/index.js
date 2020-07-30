// import { takeLatest, put, delay, call, all } from 'redux-saga/effects';  // takeEvery:快速点击多次都会执行；takeLatest:快速点击多次只会执行最后一次点击
// import axios from 'axios';
// import { INCREMENT, INCREMENT_ASYNC, FETCH_USER_REQUEST } from '../constants/counter';


// // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// function* incrementAsync() {
//   yield delay(2000);
//   yield put({type:INCREMENT})
// }

// export function* watchIncrementAsync() {
//   yield takeLatest(INCREMENT_ASYNC, incrementAsync);
// }


// export function* fetchUser() {
//   const user = yield call(axios.get, "https://jsonplaceholder.typicode.com/users");
//   console.log(user);
// }

// export function* watchFetchUser() {
//   yield takeLatest(FETCH_USER_REQUEST, fetchUser);
// }


// export default function* rootSage() {
//   yield all([
//     watchIncrementAsync(),
//     watchFetchUser()
//   ]);
// }

// --------------------------------------------------------------分文件1

// import { all, fork } from 'redux-saga/effects';

// import * as counterSagas from './counter';
// import * as userSagas from './user';

// export default function* rootSage() {
//   yield all([
//     ...Object.values(counterSagas), 
//     ...Object.values(userSagas) 
//   ].map(fork));
// }

// --------------------------------------------------------------分文件2

import { all, takeEvery, select, take } from 'redux-saga/effects';

import { counterSagas } from './counter';
import { userSagas } from './user';

function* watchAndLog() {  // take可以监听action
  while(true) {
    const action = yield take('*')
    console.log('action', action)
    yield select((res)=>{
      console.log(res)
    })
  }
}

export default function* rootSage() {
  yield all([
    watchAndLog(),
    ...counterSagas,
    ...userSagas,
  ])
}
