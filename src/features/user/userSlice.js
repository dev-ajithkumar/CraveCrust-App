import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

const initialState = {
  username: '',
  status: 'idle',
  position: {},
  error: '',
  address: '',
};

const getPosition = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function fetchAddress() {
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    return { position, address };
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = 'idle';
        state.position = action.payload.position; // corrected
        state.address = action.payload.address; // corrected
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error = `There Was a Problem getting your address. Make sure to fill the field!`;
      });
  },
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
