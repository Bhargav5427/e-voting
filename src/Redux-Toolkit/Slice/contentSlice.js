import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  contents: [],
  isLoading: false,
  error: null,
};

// Api Calls
export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  async () => {
    try {
      const res = await axios.get("http://localhost:3002/products");
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const PostContent = createAsyncThunk(
  "content/PostContent",
  async (payload) => {
    try {
      const res = await axios.post("http://localhost:3002/products", payload);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const DeleteContent = createAsyncThunk(
  "content/DeleteContent",
  async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3002/products/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const PutContent = createAsyncThunk(
  "content/PutContent",
  async (payload) => {
    try {
      const res = await axios.put(
        `http://localhost:3002/products/${payload.id}`,
        payload
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch method
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = action.payload || [];
    });
    builder.addCase(fetchContent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Post method
    builder.addCase(PostContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(PostContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = state.contents.concat(action.payload);
    });
    builder.addCase(PostContent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error ? action.error.message : "An error occurred";
    });

    // Delete method
    builder.addCase(DeleteContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = state.contents.filter(
        (val) => val.id !== action.payload.id
      );
    });
    builder.addCase(DeleteContent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Update method
    builder.addCase(PutContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(PutContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = state.contents.map((update) => {
        if (update.id == action.payload.id)
          return {
            ...update,
            ...action.payload,
          };
        else {
          return update;
        }
      });
    });
    builder.addCase(PutContent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default contentSlice.reducer;
