import { createSlice } from "@reduxjs/toolkit";
const initial = {
  group: [
    { gId: 1, title: "group1", gIndex: 0 },
    { gId: 2, title: "group2", gIndex: 1 },
    { gId: 3, title: "group3", gIndex: 2 },
  ],
  epic: [
    { eId: 20, gId: 1, title: "epic1", eIndex: 0 },
    { eId: 21, gId: 1, title: "epic2", eIndex: 1 },
    { eId: 22, gId: 2, title: "epic3", eIndex: 0 },
    { eId: 23, gId: 3, title: "epic4", eIndex: 0 },
  ],
  layer: [
    { lId: 30, title: "layer1", lIndex: 0 },
    { lId: 31, title: "layer2", lIndex: 1 },
    { lId: 32, title: "layer3", lIndex: 2 },
  ],
  card: [
    { cId: 40, lId: 30, eId: 20, gId: 1, title: "card1", cIndex: 0 },
    { cId: 43, lId: 30, eId: 20, gId: 1, title: "card2", cIndex: 1 },
    { cId: 48, lId: 30, eId: 20, gId: 1, title: "card3", cIndex: 2 },
    { cId: 41, lId: 30, eId: 21, gId: 1, title: "card9", cIndex: 0 },
    { cId: 45, lId: 30, eId: 21, gId: 1, title: "card10", cIndex: 1 },
    { cId: 42, lId: 31, eId: 22, gId: 3, title: "card4", cIndex: 0 },
  ],
};

export const dataSlice = createSlice({
  name: "dataSlice",
  initialState: initial,
  reducers: {
    groupAdd(state, action) {
      const groupId = state.group.length;
      const dynamicId = Math.floor(Math.random() * 990);
      const dynamicGroup = {
        gId: dynamicId,
        title: `group${dynamicId}`,
        gIndex: groupId,
      };
      return {
        ...state,
        group: [...state.group, dynamicGroup],
      };
    },
    groupBin(state, action) {
      const newGroup = state.group.filter((group) => {
        return group.gId !== action.payload;
      });
      return {
        ...state,
        group: newGroup,
      };
    },
    groupUpdateIndex(state, action) {
      const { item, targetGIndex } = action.payload;
      const dragGIndex = item.gIndex;
      const updatedGroups = state.group.slice();
      const [movedItem] = updatedGroups.splice(dragGIndex, 1);
      updatedGroups.splice(targetGIndex, 0, movedItem);
      const updatedGroupsWithIndex = updatedGroups.map((group, index) => ({
        ...group,
        gIndex: index,
      }));
      return { ...state, group: updatedGroupsWithIndex };
    },
    epicAdd(state, action) {
      const epicNewIndex = action.payload.data.length;
      const dynamicId = Math.floor(Math.random() * 990);
      const dynamicEpic = {
        eId: dynamicId,
        gId: action.payload.groupId,
        title: `epic${dynamicId}`,
        eIndex: epicNewIndex,
      };
      return {
        ...state,
        epic: [...state.epic, dynamicEpic],
      };
    },
    epicUpdate(state, action) {
      return {
        ...state,
        epic: [...state.epic, action.payload],
      };
    },
    epicDelete(state, action) {
      const newepic = state.epic.filter((epic) => {
        return epic.eId !== action.payload;
      });
      return {
        ...state,
        epic: newepic,
      };
    },
    epicBin(state, action) {
      const newEpic = state.epic.filter((epic) => {
        return epic.eId !== action.payload;
      });
      return {
        ...state,
        epic: newEpic,
      };
    },
    cardAdd(state, action) {
      const { lId, eId, gId, cardMatch } = action.payload;
      const cardIndex = cardMatch.length;
      const dynamicId = Math.floor(Math.random() * 990);
      const dynamicCard = {
        cId: dynamicId,
        lId: lId,
        eId: eId,
        gId: gId,
        cIndex: cardIndex,
        title: `card${dynamicId}`,
      };
      return {
        ...state,
        card: [...state.card, dynamicCard],
      };
    },
    cardDelete(state, action) {
      const newcard = state.card.filter((card) => {
        return card.cId !== action.payload;
      });
      const updatedState = {
        ...state,
        card: newcard,
      };
     return updatedState
    },
    cardUpdate(state, action) {
      return {
        ...state,
        card: action.payload,
      };
    },
    cardSameBoxDrag(state, action){
      return {
        ...state,
        card: action.payload,
      };
    },
    cardDropDifferentEpic(state, action) {
      return {
        ...state,
        card: [...state.card , action.payload],
      };
    },
    layerAdd(state, action) {
      const layerIndex = state.layer.length;
      const dynamicId = Math.floor(Math.random() * 990);
      const dynamicLayer = {
        lId: dynamicId,
        title: `layer${dynamicId}`,
        lIndex: layerIndex,
      };
      return {
        ...state,
        layer: [...state.layer, dynamicLayer],
      };
    },
    layerBin(state, action) {
      const newLayer = state.layer.filter((layer) => {
        return layer.lId !== action.payload;
      });
      return {
        ...state,
        layer: newLayer,
      };
    },
    layerUpdateIndex(state, action) {
      const { item, targetLIndex } = action.payload;
      const dragLIndex = item.layer.lIndex;
      const updatedLayer = state.layer.slice();
      const [movedItem] = updatedLayer.splice(dragLIndex, 1);
      updatedLayer.splice(targetLIndex, 0, movedItem);
      const updatedlayerWithIndex = updatedLayer.map((layer, index) => ({
        ...layer,
        lIndex: index,
      }));
      return { ...state, layer: updatedlayerWithIndex };
    },
  },
});

export const {
  groupAdd,
  epicAdd,
  cardAdd,
  layerAdd,
  layerBin,
  groupBin,
  epicBin,
  cardDelete,
  cardUpdate,
  cardDropDifferentEpic,
  epicUpdate,
  epicDelete,
  groupUpdateIndex,
  layerUpdateIndex,
  cardSameBoxDrag
} = dataSlice.actions;
