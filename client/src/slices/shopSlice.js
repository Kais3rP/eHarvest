import { createSlice } from "@reduxjs/toolkit"

export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    cart: [],
    totalPrice: 0,
    offersItems: [],
    mostSoldItems: [],
    vegetables: [],
    fruit: [],
    productRegistrationResponse: "",
    productRatingResponse: "",
    payResponse: "",
    ProductClicked: {},
    publicUser: {},
  },
  reducers: {
    addToCart: (state, action) => {
      for (const item of state.cart) {
        if (
          item.productName === action.payload.productName &&
          item.sellerName === action.payload.sellerName
        ) {
          item.quantityInCart += 1
          return
        }
      }
      state.cart.push(action.payload)
    },
    increaseCart: (state, action) => {
      for (const item of state.cart) {
        if (
          item.productName === action.payload.productName &&
          item.sellerName === action.payload.sellerName
        ) {
          item.quantityInCart += 1
        }
      }
    },
    decreaseCart: (state, action) => {
      for (const item of state.cart) {
        if (
          item.productName === action.payload.productName &&
          item.sellerName === action.payload.sellerName
        ) {
          if (item.quantityInCart === 0) return
          item.quantityInCart -= 1
        }
      }
    },
    resetCart: (state, action) => {
      state.cart = []
      state.totalPrice = 0
    },
    setOffers: (state, action) => {
      state.offersItems = action.payload
    },
    setMostSold: (state, action) => {
      state.mostSoldItems = action.payload
    },
    setVegs: (state, action) => {
      state.vegetables = action.payload
    },
    setFruit: (state, action) => {
      state.fruit = action.payload
    },
    calculateTotalPrice: (state, action) => {
      let total = 0
      for (const item of state.cart) {
        total += item.price * item.quantityInCart
      }
      state.totalPrice = total
    },
    setProductRegistrationResponse: (state, action) => {
      state.productRegistrationResponse = action.payload
    },
    setProductRatingResponse: (state, action) => {
      state.productRatingResponse = action.payload
    },
    setPayResponse: (state, action) => {
      state.payResponse = action.payload
    },
    setProductClicked: (state, action) => {
      state.productClicked = action.payload
    },
    setPublicUser: (state, action) => {
      state.publicUser = action.payload
    },
  },
})

export const {
  addToCart,
  resetCart,
  setOffers,
  setMostSold,
  calculateTotalPrice,
  setVegs,
  setFruit,
  increaseCart,
  decreaseCart,
  setProductRegistrationResponse,
  setProductRatingResponse,
  setPayResponse,
  setProductClicked,
  setPublicUser,
} = shopSlice.actions

// Thunks
export const fetchItems = () => async (dispatch) => {
  console.log("Fetching list of products")
  try {
    const res = await fetch("/products/get-products")
    const data = await res.json()
    const vegs = []
    const fruit = []

    if (data.length > 0) {
      for (const item of data) {
        item.quantityInCart = 1 // Adds the cart quantity property
        item.price = parseFloat(item.price) // converts the price string to number
        item.rating = item.rating.toFixed(1)
        if (item.type === "Vegetables") vegs.push(item)
        if (item.type === "Fruit") fruit.push(item)
      }
    }

    const mostSold = findFiveMostSold(data)
    const offers = findFiveCheapest(data)
    dispatch(setOffers(offers))
    dispatch(setMostSold(mostSold))
    dispatch(setVegs(vegs))
    dispatch(setFruit(fruit))
  } catch (err) {
    console.log(err)
  }
}

export const fetchRegisterProduct = (productObject) => async (dispatch) => {
  // To pass variables to a thunk you just need to pass it to the first action creator
  try {
    const res = await fetch("/products/add-product", {
      method: "POST",
      body: productObject,
    })
    const data = await res.json()
    if (res.ok) {
      dispatch(fetchItems())
      dispatch(setProductRegistrationResponse(data.msg))
    } else dispatch(setProductRegistrationResponse(data.msg))
  } catch (err) {
    console.log(err)
  }
}

export const rateProduct = (ratingData) => async (dispatch) => {
  try {
    const res = await fetch("/products/rate-product", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ratingData),
    })
    const data = await res.json()
    if (res.ok) dispatch(fetchItems())
    dispatch(setProductRatingResponse(data.msg))
    setTimeout(() => {
      dispatch(setProductRatingResponse(""))
    }, 3000)
  } catch (err) {
    console.log(err)
  }
}

export const pay = (payData) => async (dispatch) => {
  try {
    const res = await fetch("/products/pay", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payData),
    })
    const data = await res.json()
    if (res.ok) {
      dispatch(resetCart())
    }
    dispatch(setPayResponse(data.msg))
    setTimeout(() => {
      dispatch(setPayResponse(""))
    }, 3000)
  } catch (err) {
    console.log(err)
  }
}

export const asyncUploadProductPicture = (productData) => async (dispatch) => {
  try {
    const res = await fetch(
      `/products/upload-product-picture/${productData.name}`,
      {
        method: "POST",
        body: productData.productPic,
      }
    )
    console.log("Uploading Product Pic")
    if (res.ok) {
      dispatch(fetchItems())
    }
  } catch (err) {
    console.log(err)
  }
}

export const asyncGetPublicUser = (id) => async (dispatch) => {
  try {
    console.log(id)
    const res = await fetch(`/public/get-user-data/${id}`) //Gonna search through the id of the obj
    console.log("Fetching public User Data")
    const data = await res.json()
    console.log(data)
    if (res.ok) {
      dispatch(setPublicUser(data))
    }
  } catch (err) {
    console.log(err)
  }
}
/// Helper functions:
function findFiveMostSold(arr) {
  return arr.sort((a, b) => b.sold - a.sold).slice(0, 5)
}

function findFiveCheapest(arr) {
  return arr.sort((a, b) => a.price - b.price).slice(0, 5)
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.value

export default shopSlice.reducer
