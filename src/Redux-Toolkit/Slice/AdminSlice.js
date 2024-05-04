import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Base_url } from "../Constant";

const initialState = {
  user: [],
  party: [],
  election: [],
  connection: [],
  isLoading: false,
  isError: false,
};

// Api Calls
export const fetchData = createAsyncThunk(
  "fetchData",
  async ({ endpoint, dataType }) => {
    try {
      const res = await axios.get(Base_url + endpoint);
      return { data: res.data.data, dataType };
    } catch (err) {
      throw err;
    }
  }
);

export const postData = createAsyncThunk("postData", async (data) => {
  let { endpoint, payload, dataType } = data;
  try {
    const res = await axios.post(Base_url + endpoint, payload);
    // console.log(res);
    return { data: res.data, dataType };
  } catch (err) {
    throw err;
  }
});

export const deleteData = createAsyncThunk("deleteData", async (data) => {
  let { endpoint, id, dataType } = data;
  console.log(id);
  try {
    const res = await axios.delete(Base_url + endpoint + id);
    console.log(res, "delete");
  
    return { data: id, dataType };
  } catch (err) {
    throw err;
  }
});

// Slice
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch Meth

      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || [];
      })

      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, dataType } = action.payload;
        // console.log(data, "reducer");
        switch (dataType) {
          case "party":
            state.party = data;
            break;
          case "election":
            state.election = data;
            break;
          default:
            break;
        }
      })

      // Post Meth
      .addCase(postData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(postData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error
          ? action.error.message
          : "An error occurred";
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.isLoading = false;
        const { dataType, data } = action.payload;
        // console.log(data.data);
        switch (dataType) {
          case "party":
            state.party = state.party.concat(data);
            break;
          case "election":
            state.election = state.election.concat(data.data);
            break;
          default:
            break;
        }
      })

      .addCase(deleteData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error
          ? action.error.message
          : "An error occurred";
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.isLoading = false;
        const { dataType, data } = action.payload;
        console.log(data);
        console.log(dataType);
        switch (dataType) {
          case "party":
            state.party = state.party.filter((item) => item._id !== data);
            break;
          case "election":
            state.election = state.election.filter((item) => item._id != data);
            break;
          default:
            break;
        }
      });
  },
});

export default adminSlice.reducer;
