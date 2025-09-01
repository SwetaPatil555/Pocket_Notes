import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentActiveGroup: null,
  groups: [],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    changeCurrentActiveGroup: (state, action) => {
      state.currentActiveGroup = action.payload;
    },

    createGroup: (state, action) => {
      const { groupName, groupColor } = action.payload;

      const shortName = groupName
        .split(" ")
        .reduce((response, word) => response + word.slice(0, 1), "")
        .toUpperCase()
        .slice(0, 2);

      const newGroup = {
        id: Date.now(),
        groupName: groupName.trim(),
        groupShortName: shortName,
        groupColor,
        notes: [],
      };

      
      state.groups.push(newGroup);
      state.currentActiveGroup = newGroup.id;
    },

    createNote: (state, action) => {
      const { content, groupId } = action.payload;
      const date = new Date();
      const time = date.toLocaleTimeString();

      const group = state.groups.find((g) => g.id === groupId);
      if (group) {
        group.notes.push({
          id: Date.now(),
          content,
          date: date.toDateString().slice(4),
          time: time.slice(0, 5) + time.slice(-3),
        });
      }
    },
  },
});

export const {
  changeCurrentActiveGroup,
  createGroup,
  createNote,
  deleteNote,
  editNote,
  deleteGroup,
} = noteSlice.actions;

export default noteSlice.reducer;
