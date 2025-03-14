import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

 
export const fetchRoutes = createAsyncThunk(
  "routes/fetchRoutes",
  async (role, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://iam-2qmv.onrender.com/api/roles?role=${role}`);
      console.log("Fetched Routes:", response.data);
 
      const roleData = response.data.find((r) => r.role === role);
      return roleData ? roleData.routes : [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching roles");
    }  
  }
);

const routeSlice = createSlice({
  name: "route",
  initialState: {
    routes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        state.loading = false;
        state.routes = action.payload;
      })
      .addCase(fetchRoutes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default routeSlice.reducer;
