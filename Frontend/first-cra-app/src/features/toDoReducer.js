import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  toDos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk("todos/add", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4100/todo");
    const data = await res.json();
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const deleteTodos = createAsyncThunk(
  "todos/delete",
  async (id, thunkAPI) => {
    try {
      await fetch(`http://localhost:4100/todo/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
export const postTodos = createAsyncThunk(
  "todos/post",
  async (text, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4100/todo", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ text }),
      });
      return res.json();
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
export const patchTodos = createAsyncThunk(
  "todos/patch",
  async ({ id, compleate }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4100/todo/${id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ compleate: !compleate }),
      });
      return res.json();
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const toDoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.toDos = action.payload;
        state.loading = false
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTodos.rejected , (state, action) => {
        state.error = 'Ошибка при выводе списка дел'
        state.loading = false
      })

      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.toDos = state.toDos.filter((item) => {
          return item._id !== action.payload;
        });
        state.loading = false
      })
      .addCase(deleteTodos.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteTodos.rejected , (state, action) => {
        state.error = 'Ошибка при удалении дела'
        state.loading = false
      })

      .addCase(postTodos.fulfilled, (state, action) => {
        state.toDos.unshift(action.payload);
        state.loading = false
      })
      .addCase(postTodos.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(postTodos.rejected , (state, action) => {
        state.error = 'Ошибка при добавлени дела'
        state.loading = false
      })

      .addCase(patchTodos.fulfilled, (state, action) => {
        state.toDos.map((item) => {
          if (item._id === action.payload._id) {
            item.compleate = !item.compleate;
            return item;
          }
        });
        state.loading = false
      })
      .addCase(patchTodos.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(patchTodos.rejected , (state, action) => {
        state.error = 'Ошибка при изменении дела'
        state.loading = false
      })
  },
});

export default toDoSlice.reducer;
