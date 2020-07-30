import { takeEvery, fork, call, put, select  } from 'redux-saga/effects';
import axios from 'axios';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// function* fetchUser() {  // fork 功能类似call，只是fork会并发执行
//   yield fork(delay, 5000);
//   const user = yield fork(axios.get, "https://jsonplaceholder.typicode.com/users");
//   console.log(user);
// }

function* fetchUser() {
  try {
    yield select((res)=>{
      console.log(res)
    })
    const user = yield call(axios.get, "https://jsonplaceholders.typicode.com/users");
    yield put({type: "FETCH_USER_SUCCEEDED", user: user});
  } catch(e) {
    yield put({type: "FETCH_USER_FAILURE", error: e.message});
  }
}

function* fetchTodos() {
  const todos = yield call(axios.get, "https://jsonplaceholder.typicode.com/todos");
  console.log(todos);
}

export function* watchFetchUser() {
  yield takeEvery('FETCH_USER_REQUEST', fetchUser);
}

export function* watchFetchTodos() {
  yield takeEvery('FETCH_TODOS_REQUEST', fetchTodos);
}




export const userSagas = [
  watchFetchUser(),
  watchFetchTodos()
]