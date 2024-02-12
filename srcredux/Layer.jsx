import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Cards from "./Cards";
import { useDispatch } from "react-redux";
import { layerBin, layerUpdateIndex } from "./store/slices/AppSlice";
import { layerhover, layerleave } from "./store/slices/HoverSlice";
import { useDrag, useDrop } from "react-dnd";

const Layer = ({ layer, lIndex }) => {
  const data = useSelector((state) => state.data);
  const groupHover = useSelector((state) => state.grouphovereffect);
  const layerHover = useSelector((state) => state.layerhovereffect);
  const addHover = useSelector((state) => state.addhovereffect);
  const groupaddHover = useSelector((state) => state.groupaddhovereffect);
  const dispatch = useDispatch();

  const cardLoop = () => {
    const newGroupCard = [];
    data.group.forEach((groupItem) => {
      const groupWithEpic = data.epic.filter((epicItem) => {
        return epicItem.gId == groupItem.gId;
      });
      newGroupCard.push(groupWithEpic);
    });
    return newGroupCard;
  };
  const newGroupEpic = cardLoop();

  const [{ isDragging }, layerDragRef, preview] = useDrag({
    type: "LAYERREF",
    item: { layer },
    collect: (monitor) => {
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
  });

  const [{ isOver }, layerDropRef] = useDrop({
    accept: "LAYERREF",
    drop: (item) => {
      dispatch(layerUpdateIndex({ item: item, targetLIndex: lIndex }));
    },
  });

  // preview(layerDragRef);

  // const handleDragStart = (e) => {
  //   var crt = document.createElement("div");
  //   crt.style.backgroundColor = "orange";
  //   crt.style.width = "200px";
  //   crt.style.height = "200px";
  //   crt.style.opacity = 1;
  //   document.body.appendChild(crt);
  //   e.dataTransfer.setDragImage(crt, 30, 30);
  // };

  return (
    <div
      ref={(node) => layerDragRef(layerDropRef(node))}
      className="layerboxwrap"
      // onDragStart={handleDragStart}
    >
      <div className="layerbBox">
        <div
          className={
            layerHover.state && layerHover.lId == layer.lId
              ? "layerChild layerHover"
              : "layerChild"
          }
          onMouseEnter={() => dispatch(layerhover(layer.lId))}
          onMouseLeave={() => dispatch(layerleave(layer.lId))}
        >
          <button
            className={
              layerHover.state && layerHover.lId == layer.lId
                ? "layerBin layerBinShow"
                : "layerBin"
            }
            onClick={() => dispatch(layerBin(layer.lId))}
          >
            &#128465;
          </button>
          <div className="layerLeftBox"></div>
        </div>
        <div className="cardWrapper">
          {newGroupEpic.map((groupEpic, index) => {
            return (
              <div
                className={
                  (groupHover.state && groupHover.gId == groupEpic[0]?.gId) ||
                  (layerHover.state && layerHover.lId == layer.lId)
                    ? "cardbox cardboxhover"
                    : "cardbox"
                }
                key={index}
              >
                {groupEpic.map((groupEpicItem, groupEpicIndex) => {
                  return (
                    <div key={groupEpicIndex} className="cardslayer">
                      <Cards
                        epicItemId={groupEpicItem.eId}
                        layerId={layer.lId}
                        groupId={groupEpicItem.gId}
                        groupEpic={groupEpic}
                      />
                    </div>
                  );
                })}
                <div
                  className={
                    (addHover.state && groupHover.gId === groupEpic[0]?.gId) ||
                    (layerHover.state && layerHover.lId == layer.lId)
                      ? "sidebar sidebarhover"
                      : "sidebar"
                  }
                >
                  cardsidebar
                </div>
              </div>
            );
          })}
          <div className={groupaddHover ? "sidebar groupaddhover" : "sidebar"}>
            xsidebar
          </div>
        </div>
      </div>
    </div>
  );
};
export default Layer;
