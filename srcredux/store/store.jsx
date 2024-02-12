import { configureStore } from "@reduxjs/toolkit";
import { dataSlice } from "./slices/AppSlice";
import { groupHoverSlice, layerHoverSlice,epicHoverSlice, addHoverSlice, groupAddHoverSlice, layerAddHoverSlice } from "./slices/HoverSlice";

export const Store = configureStore({
    reducer:{
        data : dataSlice.reducer,
        grouphovereffect:groupHoverSlice.reducer,
        layerhovereffect:layerHoverSlice.reducer,
        epichovereffect:epicHoverSlice.reducer,
        addhovereffect:addHoverSlice.reducer,
        groupaddhovereffect:groupAddHoverSlice.reducer,
        layeraddhovereffect:layerAddHoverSlice.reducer,
    }
})