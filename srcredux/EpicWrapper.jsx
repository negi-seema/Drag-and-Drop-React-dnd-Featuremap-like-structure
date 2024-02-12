import React from "react";
import { Epic } from "./Epic";
import { useDrop, useDrag } from "react-dnd";
import {
  epicAdd,
  epicDelete,
  epicUpdate,
  groupBin,
  groupUpdateIndex,
} from "./store/slices/AppSlice";
import {
  addhover,
  addleave,
  grouphover,
  groupLeave,
} from "./store/slices/HoverSlice";
import { useDispatch, useSelector } from "react-redux";

export const EpicWrapper = ({ filterEpicForGroup, group, gIndex }) => {
  const addHover = useSelector((state) => state.addhovereffect);
  const groupHover = useSelector((state) => state.grouphovereffect);
  const dispatch = useDispatch();

  const [, groupDragRef] = useDrag({
    type: "GROUPREF",
    item: { group, gIndex, type: "GROUPREF" },
  });

  const [, epicDropRef] = useDrop({
    accept: ["EPICREF", "GROUPREF"],
    drop: (item) => {
      if (item.type == "EPICREF") {
        const newDropEpicIndex = filterEpicForGroup.length + 1
        const updateEpic = {
          ...item.epic,
          gId: group.gId,
          eIndex:newDropEpicIndex
        };
        dispatch(epicDelete(item.epic.eId));
        dispatch(epicUpdate(updateEpic));
      }
      if (item.type == "GROUPREF") {
       dispatch(groupUpdateIndex({item:item ,targetGIndex:gIndex}))
      }
    },
  });

  return (
    <>
      <div
        ref={(node)=>groupDragRef(epicDropRef(node))}
        key={gIndex}
        className={groupHover.state ? "groupBox ghover" : "groupBox"}
        onMouseEnter={() => dispatch(grouphover(group.gId))}
        onMouseLeave={() => dispatch(groupLeave(group.gId))}
      >
        <button
          className={
            groupHover.state && groupHover.gId === group.gId
              ? "groupBin groupBinShow"
              : "groupBin"
          }
          onClick={() => dispatch(groupBin(group.gId))}
        >
          &#128465;
        </button>
        <div className="groupChild">{group.title}</div>
        <div className="epicWrapper" ref={epicDropRef}>
          {filterEpicForGroup.map((epic, eIndex) => {
            return <Epic key={eIndex} epic={epic} eIndex={eIndex} />;
          })}
          <button
            className={
              addHover.state && groupHover.gId === group.gId
                ? "epicAdd epicAddHover"
                : "epicAdd"
            }
            onMouseEnter={() => dispatch(addhover(group.gId))}
            onMouseLeave={() => dispatch(addleave(group.gId))}
            onClick={() => dispatch(epicAdd({"groupId":group.gId ,"data" :filterEpicForGroup}))}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};
