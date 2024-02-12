import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cardAdd,
  cardDelete,
  cardUpdate,
  cardDropDifferentEpic,
  cardSameBoxDrag,
} from "./store/slices/AppSlice";
import { useDrag, useDrop } from "react-dnd";

const Cards = ({ layerId, epicItemId, groupId, groupEpic }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const epicHover = useSelector((state) => state.epichovereffect);
  const layerHover = useSelector((state) => state.layerhovereffect);

  const cardMatch = data.card.filter((cards) => {
    return cards.lId == layerId && cards.eId == epicItemId;
  });

  const [, dropoutside] = useDrop({
    accept: "CARDRFE",
    drop: (item) => {
      const updateCard = {
        ...item,
        eId: epicItemId,
        gId: groupId,
        lId: layerId,
      };
      dispatch(cardDelete(item.cId));
      dispatch(cardDropDifferentEpic(updateCard));
    },
  });
  return (
    <div
    
      className={
        (epicHover.state && epicHover.eId == epicItemId) ||
        (layerHover.state && layerHover.lId == layerId)
          ? "cardlayerBox cardlayerBoxhover"
          : "cardlayerBox"
      }
    >
      {cardMatch.map((cardmatch, cardIndex) => {
        return (
          <CardDataBox
            cardmatch={cardmatch}
            key={cardIndex}
            cardIndex={cardIndex}
            sameColumnGroupCard={cardMatch}
            epicItemId={epicItemId}
            layerId={layerId}
            groupId={groupId}
          />
        );
      })}
      <button
        className={
          (epicHover.state && epicHover.eId == epicItemId) ||
          (layerHover.state && layerHover.lId == layerId)
            ? "cardAdd cardAddHover"
            : "cardAdd "
        }
        onClick={() =>
          dispatch(
            cardAdd({
              lId: layerId,
              eId: epicItemId,
              gId: groupId,
              cardMatch: cardMatch,
            })
          )
        }
      >
        +
      </button>
      <div className="droparea" ref={dropoutside}></div>
    </div>
  );
};
export default Cards;

export const CardDataBox = ({
  cardmatch,
  cardIndex,
  epicItemId,
  layerId,
  groupId,
}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  const moveItem = (array, dragIndex, targetIndex) => {
    const newArray = [...array];
    const [movedItem] = newArray.splice(dragIndex, 1);

    const updatedItem = {
      ...movedItem,
      cIndex: targetIndex,
    };

    newArray.splice(targetIndex, 0, updatedItem);
    return newArray;
  };

  const [{ isDragging }, cardDrag, preview] = useDrag({
    type: "CARDRFE",
    item: cardmatch,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, cardDrop] = useDrop({
    accept: "CARDRFE",
    drop: (item, monitor) => {
      if (item.eId !== epicItemId && cardIndex >= 0) {
        dispatch(cardDelete(item.cId));
        const updatedCardArray = data.card.filter(
          (card) => card.cId !== item.cId
        );
        const cardArray = [...updatedCardArray];
        const findIndex = cardArray.findIndex((card) => card === cardmatch);
        const updateItem = {
          ...item,
          eId: epicItemId,
          lId: layerId,
          gId: groupId,
        };
        cardArray.splice(findIndex, 0, updateItem);
        dispatch(cardUpdate(cardArray));
      } else if (item.eId === epicItemId && item.lId === layerId) {
        const dragIndex = item.cIndex;
        const targetIndex = cardIndex;
        const movedArray = moveItem(
          data.card,
          dragIndex,
          targetIndex
        );

        const sameItem = movedArray
        .filter((item) => epicItemId === item.eId)
        .map((item, index) => ({
          ...item,
          cIndex: index,
        }));
        const otherItem = movedArray.filter((item) => epicItemId !== item.eId)
        const newItem = [...sameItem , ...otherItem]
        dispatch(cardSameBoxDrag(newItem))
      }
    },
  });

// preview(cardDrag)
  
//   const handleDragStart = (e) => {
//     // e.preventDefault();
//     var crt = document.createElement("div");
//     crt.style.backgroundColor = "orange";
//     crt.style.width = "200px";
//     crt.style.height = "200px";
//     crt.style.opacity = 1;
//     // crt.style.display = 'none';
//     document.body.appendChild(crt);
//     e.dataTransfer.setDragImage(crt, 0, 0);
//   };

  return (
    <div ref={(node) => cardDrag(cardDrop(node))} className="cards" 
    // onDragStart={handleDragStart}
    >
      {cardmatch.title}
    </div>
  );
};
