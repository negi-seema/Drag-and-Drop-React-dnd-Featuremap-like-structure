import { createSlice } from "@reduxjs/toolkit";

export const groupHoverSlice = createSlice({
  name: "group",
  initialState: false,
  reducers: {
    grouphover(state, action) {
      return { state: true, gId: action.payload };
    },
    groupLeave(state, action) {
      return { state: false, gId: action.payload };
    },
  },
});

export const { grouphover, groupLeave } = groupHoverSlice.actions;

//////////////////////////////////////layerHoverSlice//////////////////////////////////////////////////

export const layerHoverSlice = createSlice({
  name: "group",
  initialState: false,
  reducers: {
    layerhover(state, action) {
      return { state: true, lId: action.payload };
    },
    layerleave(state, action) {
      return { state: false, lId: action.payload };
    },
  },
});

export const { layerhover, layerleave } = layerHoverSlice.actions;

///////////////////////////////////////epicHoverSlice//////////////////////////////////////////////////

export const epicHoverSlice = createSlice({
  name: "group",
  initialState: false,
  reducers: {
    epichover(state, action) {
      return { state: true, eId: action.payload };
    },
    epicleave(state, action) {
      return { state: false, eId: action.payload };
    },
  },
});

export const { epichover, epicleave } = epicHoverSlice.actions;

//////////////////////////////////////addHoverSlice//////////////////////////////////////////////////

export const addHoverSlice = createSlice({
  name: "group",
  initialState: false,
  reducers: {
    addhover(state, action) {
      return { state: true, gId: action.payload };
    },
    addleave(state, action) {
      return { state: false, gId: action.payload };
    },
  },
});

export const { addhover, addleave } = addHoverSlice.actions;

export const groupAddHoverSlice = createSlice({
  name: "group",
  initialState: false,
  reducers: {
    groupaddhover(state, action) {
      return true;
    },
    groupaddleave(state, action) {
      return false;
    },
  },
});

export const { groupaddhover, groupaddleave } = groupAddHoverSlice.actions;

export const layerAddHoverSlice = createSlice({
  name: "group",
  initialState: false,
  reducers: {
    layeraddhover(state, action) {
      return true;
    },
    layeraddleave(state, action) {
      return false;
    },
  },
});

export const { layeraddhover, layeraddleave } = layerAddHoverSlice.actions;