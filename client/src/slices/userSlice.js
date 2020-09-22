import { createSlice } from '@reduxjs/toolkit';



export const userSlice = createSlice({
  name: 'user',
  initialState: {
   isLoggedIn: false,
   userData: {},
   registrationResponse: '',
   loginResponse:'',
   personalProducts:[],
   
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
setUserData: (state, action) => {
    state.userData = action.payload;
},
setLoginResponse: (state,action) => {
  state.loginResponse = action.payload;
},
setPersonalProducts: (state,action) => {
state.personalProducts = action.payload;
}
  }
});

export const { logIn, logOut, setUserData, setRegistrationResponse, setLoginResponse, setPersonalProducts } = userSlice.actions;

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
if (res.ok) dispatch(setRegistrationResponse(data.msg));
else dispatch(setRegistrationResponse(data.msg));
setTimeout(()=>{
dispatch(setRegistrationResponse(''))
},3000)
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
console.log(data.msg)
if (res.ok) {
dispatch(logIn());
dispatch(setUserData(data.user));
dispatch(setLoginResponse(data.msg));
} else dispatch(setLoginResponse(data.msg));
setTimeout(()=>{
  dispatch(setLoginResponse(''));
  },3000)
}

export const fetchLogout = () => async dispatch => {
    let res = await fetch('/auth/logout');

if(res.ok) {
    dispatch(logOut());
    dispatch(setUserData(''));
    dispatch(setLoginResponse(''));

}
}

export const fetchPersonalProducts = () => async dispatch => {
  let res = await fetch('/user/get-user-products');
  let data = await res.json();
  console.log('Fetching Personal Products');
  dispatch(setPersonalProducts(data));
}
///Helper functions:


export default userSlice.reducer;