import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: [],
  party: [],
  election: [],
  connection: [],
  vote: [],
  isLoading: false,
  isError: false,
};

// API Calls

// FETCH DATA
export const fetchData = createAsyncThunk(
  "fetchData",
  async ({ endpoint, dataType }) => {
    try {
      const res = await axios.get(process.env.REACT_APP_BASE_URL + endpoint);
      return { data: res.data.data, dataType };
    } catch (err) {
      throw err;
    }
  }
);

// POST DATA
export const postData = createAsyncThunk("postData", async (data) => {
  let { endpoint, payload, dataType } = data;
  try {
    const res = await axios.post(process.env.REACT_APP_BASE_URL + endpoint, payload);
    console.log("🚀 ~ postData ~ res:", res);
    return { data: res.data, dataType };
  } catch (err) {
    // Extract status code from the error object
    const statusCode = err.response ? err.response.status : 'Unknown';
    throw statusCode;
  }
});

// DELETE DATA
export const deleteData = createAsyncThunk("deleteData", async (data) => {
  let { endpoint, id, dataType } = data;
  try {
    const res = await axios.delete(process.env.REACT_APP_BASE_URL + endpoint + id);
    return { data: id, dataType };
  } catch (err) {
    // Extract status code from the error object
    const statusCode = err.response ? err.response.status : 'Unknown';
    throw statusCode;
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
        switch (dataType) {
          case "party":
            state.party = data;
            break;
          case "election":
            state.election = data;
            break;
          case "connection":
            state.connection = data;
            break;
          case "user":
            state.user = data;
            break;
          case "vote":
            state.vote = data;
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
        //
        switch (dataType) {
          case "party":
            state.party = state.party.concat(data.data);
            break;
          case "election":
            state.election = state.election.concat(data.data);
            break;
          case "connection":
            state.connection = state.connection.concat(data.data);
            break;
          case "user":
            state.user = state.user.concat(data.data);
            break;
          case "vote":
            state.vote = state.vote.concat(data.data);
            break;
          default:
            break;
        }
      })

      // DELETE METH
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

        switch (dataType) {
          case "party":
            state.party = state.party.filter((item) => item._id !== data);
            break;
          case "election":
            state.election = state.election.filter((item) => item._id !== data);
            break;
          case "connection":
            state.connection = state.connection.filter(
              (item) => item._id !== data
            );
            break;
          case "user":
            state.user = state.user.filter((item) => item._id !== data);
            break;
          case "vote":
            state.vote = state.vote.filter((item) => item._id !== data);
            break;
          default:
            break;
        }
      });
  },
});

export default adminSlice.reducer;
