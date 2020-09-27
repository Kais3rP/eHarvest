import { createSlice } from '@reduxjs/toolkit';
import localForage from 'localforage';
import { fetchItems } from './shopSlice';


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    username:'',
    personalData: {},
    registrationResponse: '',
    loginResponse: '',
    personalProducts: [],

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
    setPersonalData: (state, action) => {
      state.personalData = action.payload;
    },
    setLoginResponse: (state, action) => {
      state.loginResponse = action.payload;
    },
    setPersonalProducts: (state, action) => {
      state.personalProducts = action.payload;
    },
    setUsername: (state,action) => {
      state.username = action.payload
    }
  }
});

export const { 
  logIn,
  logOut,
  setUserData,
  setRegistrationResponse,
  setLoginResponse,
  setPersonalProducts,
  setPersonalData,
setUsername } = userSlice.actions;

//Thunks

export const fetchRegister = (ev) => async dispatch => {
  //To pass variables to a thunk you just need to pass it to the first action creator
  const params = new URLSearchParams([...new FormData(ev.target).entries()]); //This spreads the form key-value pairs and puts them in a format sendable with a www-url-encoded mime-type
  let res = await fetch('/auth/register', {
    method: 'POST',
    body: params
  });
  let data = await res.json();
  console.log(data)
  if (res.ok) dispatch(setRegistrationResponse(data.msg));
  else dispatch(setRegistrationResponse(data.msg));
  setTimeout(() => {
    dispatch(setRegistrationResponse(''))
  }, 3000)
}

export const fetchLogin = (ev) => async dispatch => {
  //To pass variables to a thunk you just need to pass it to the first action creator
  //This is how you manage to pass the form data as urlencoded params with a custom fetch
  const params = new URLSearchParams([...new FormData(ev.target).entries()]); //This spreads the form key-value pairs and puts them in a format sendable with a www-url-encoded mime-type
  let res = await fetch('/auth/login', {
    method: 'POST',
    body: params
  });
  let data = await res.json();
  console.log(data.msg)
  const username = `${data.user.name} ${data.user.surname}`
  if (res.ok) {
    dispatch(logIn());
    dispatch(setUsername(username));
    dispatch(setLoginResponse(data.msg));
  } else dispatch(setLoginResponse(data.msg));
  setTimeout(() => {
    dispatch(setLoginResponse(''));
  }, 3000)
}

export const fetchLogout = () => async dispatch => {
  let res = await fetch('/auth/logout');

  if (res.ok) {
    dispatch(logOut());
    dispatch(setUsername(''));
    dispatch(setPersonalData({}));
    dispatch(setLoginResponse(''));
    localForage.clear().then(() => {
      console.log('Forage cleared')
    }).catch((err) => {
      console.log(err)
    });

  }
}

export const fetchPersonalProducts = () => async dispatch => {
  let res = await fetch('/user/get-user-products');
  let data = await res.json();
  console.log('Fetching Personal Products');

  for (let item of data) {
    item.price = parseFloat(item.price);  //converts the price string to number
    item.rating = (item.rating).toFixed(1);
  }
  dispatch(setPersonalProducts(data));
}

export const fetchPersonalData = () => async dispatch => {
  let res = await fetch('/user/get-personal-data');
  let data = await res.json();
  console.log('Fetching Personal Data');

  dispatch(setPersonalData(data));
}

export const fetchUserDataUpdate = (newPersonalData) => async dispatch => {
  try{
    let res = await fetch('/user/update-personal-data', {
      method: 'POST',
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify(newPersonalData)
    });
   let data = await res.json();
   const username = `${newPersonalData.name} ${newPersonalData.surname}`
    if (res.ok) {
      dispatch(fetchPersonalData());
      dispatch(setUsername(username));
      dispatch(fetchItems());
      dispatch(fetchPersonalProducts());
    };
   
   } catch(err){
     console.log(err);
   }
}
///Helper functions:


export default userSlice.reducer;