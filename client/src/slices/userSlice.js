import { createSlice } from '@reduxjs/toolkit';
import localForage from 'localforage';
import { fetchItems } from './shopSlice';


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    username: '',
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
    setUsername: (state, action) => {
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

export const isLoggedChecker = () => async dispatch => {
  try {
    let res = await fetch('/auth/isloggedin');
    if (res.ok)  {
      let data = await res.json();
      console.log(data)
        const username = `${data.name} ${data.surname}`
        dispatch(logIn());
        dispatch(setUsername(username));
      } else {
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
   
    
  } catch (err) {
    console.log(err);
  }
}


export const fetchRegister = (ev) => async dispatch => {
  try {
    const params = new URLSearchParams([...new FormData(ev.target).entries()]); //This spreads the form key-value pairs and puts them in a format sendable with a www-url-encoded mime-type
    let res = await fetch('/auth/register', {
      method: 'POST',
      body: params
    });
    let data = await res.json();
    console.log(data)
    dispatch(setRegistrationResponse(data.msg));
    setTimeout(() => {
      dispatch(setRegistrationResponse(''))
    }, 5000);
  } catch (err) {
    console.log(err);
  }
}

export const fetchLogin = (ev) => async dispatch => {
  try {
    const params = new URLSearchParams([...new FormData(ev.target).entries()]); //This spreads the form key-value pairs and puts them in a format sendable with a www-url-encoded mime-type
    let res = await fetch('/auth/login', {
      method: 'POST',
      body: params
    });
    let data = await res.json();
    console.log(data.msg)

    if (res.ok) {
      const username = `${data.user.name} ${data.user.surname}`
      dispatch(logIn());
      dispatch(setUsername(username));
      dispatch(setLoginResponse(data.msg));
    } else dispatch(setLoginResponse(data.msg));
    setTimeout(() => {
      dispatch(setLoginResponse(''));
    }, 3000);
  } catch (err) {
    console.log(err);
  }
}

export const fetchLogout = () => async dispatch => {
  try {
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
  } catch (err) {
    console.log(err);
  }
}

export const fetchPersonalProducts = () => async dispatch => {
  try {
    let res = await fetch('/user/get-user-products');
    let data = await res.json();
    console.log('Fetching Personal Products');
    if (res.ok) {
      for (let item of data) {
        item.price = parseFloat(item.price);  //converts the price string to number
        item.rating = (item.rating).toFixed(1);
      }
    }
    dispatch(setPersonalProducts(data));
  } catch (err) {
    console.log(err);
  }
}

export const fetchPersonalData = () => async dispatch => {
  let res = await fetch('/user/get-personal-data');
  let data = await res.json();
  console.log('Fetching Personal Data');
  if (res.ok) {
    dispatch(setPersonalData(data));
  }
}

export const fetchUserDataUpdate = (updatedData) => async dispatch => {
  console.log('UserData Update');
  if(!(updatedData.name && updatedData.surname && updatedData.email)) return;
  try {
    let res = await fetch('/user/update-personal-data', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });
    const username = `${updatedData.name} ${updatedData.surname}`
    if (res.ok) {
      if(updatedData.name) dispatch(setUsername(username));
      dispatch(fetchPersonalData());
      dispatch(fetchItems());
      dispatch(fetchPersonalProducts());
    };

  } catch (err) {
    console.log(err);
  }
}

export const asyncUpdateUserPicture = (userPic) => async dispatch => {
  try {
    let res = await fetch('/user/upload-personal-picture', {
      method: 'POST',
      body: userPic
    });
    console.log('Uploading User Pic');
    if (res.ok) {
      dispatch(fetchPersonalData());
    }
  } catch (err) {
    console.log(err);
  }
}
///Helper functions:


export default userSlice.reducer;