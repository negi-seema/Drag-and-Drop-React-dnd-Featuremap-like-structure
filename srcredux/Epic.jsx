import React from "react";
import { useDrag } from "react-dnd";
import { epichover, epicleave } from "./store/slices/HoverSlice";
import { useDispatch, useSelector } from "react-redux";
import { epicBin } from "./store/slices/AppSlice";

export const Epic = ({ epic, eIndex }) => {
  const epicHover = useSelector((state) => state.epichovereffect);
  const dispatch = useDispatch();

  const [{ isDragging }, epicDragRef] = useDrag({
    type: "EPICREF",
    item:{epic ,type:'EPICREF'}
  });

  return (
    <div
      ref={epicDragRef}
      className={
        epicHover.state && epicHover.eId == epic.eId
          ? "epicBox epicHover"
          : "epicBox"
      }
      onMouseEnter={() => dispatch(epichover(epic.eId))}
      onMouseLeave={() => dispatch(epicleave(epic.eId))}
    >
      <button
        className={
          epicHover.state && epicHover.eId == epic.eId
            ? "epicBin epicBinShow"
            : "epicBin"
        }
        onClick={() => dispatch(epicBin(epic.eId))}
      >
        &#128465;
      </button>
      <div className="epicInnerBox"> {epic.title} {epic.eId}</div>
    </div>
  );
};
