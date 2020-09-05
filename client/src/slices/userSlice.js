import { createSlice } from '@reduxjs/toolkit';



export const userSlice = createSlice({
  name: 'user',
  initialState: {
   isLoggedIn: false,
   userLogged: '',
   registrationResponse: {},
   loginResponse:{}
  },
  reducers: {
    setRegistrationResponse: (state, action) => {
state.registrationResponse = action.payload;
    },
  logIn: (state, action) => {
      state.isLoggedIn = true;
  },
  logOut: (state, action) => {
    state.isLoggedIn = false;
},
setUserLogged: (state, action) => {
    state.userLogged = action.payload;
},
setLoginResponse: (state,action) => {
  state.loginResponse = action.payload;
}
  }
});

export const { logIn, logOut, setUserLogged, setRegistrationResponse, setLoginResponse } = userSlice.actions;

//Thunks

export const fetchRegister = (ev) => async dispatch => {
    //To pass variables to a thunk you just need to pass it to the first action creator
     const params = new URLSearchParams([...new FormData(ev.target).entries()]); //This spreads the form key-value pairs and puts them in a format sendable with a www-url-encoded mime-type
   let res = await fetch('/auth/register', {
         method: 'POST',
         body:params
 });
 let data = await res.json();
 console.log(data)

dispatch(setRegistrationResponse(data));

 }

export const fetchLogin = (ev) => async dispatch => {
   //To pass variables to a thunk you just need to pass it to the first action creator
   //This is how you manage to pass the form data as urlencoded params with a custom fetch
    const params = new URLSearchParams([...new FormData(ev.target).entries()]); //This spreads the form key-value pairs and puts them in a format sendable with a www-url-encoded mime-type
  let res = await fetch('/auth/login', {
        method: 'POST',
        body:params
});
let data = await res.json();
console.log(data)
if (data.isOk) {
dispatch(logIn());
dispatch(setUserLogged(data.user))
}
dispatch(setLoginResponse(data))
}

export const fetchLogout = () => async dispatch => {
    let res = await fetch('/auth/logout');
    let data = await res.json();

if(data.isOk) {
    dispatch(logOut());
    dispatch(setUserLogged(''));
}
}
///Helper functions:


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value;

export default userSlice.reducer;