import React from "react";
import { useSelector } from "react-redux";
import Layer from "./Layer";
import { useDispatch } from "react-redux";
import { groupAdd, layerAdd } from "./store/slices/AppSlice";
import {
  groupaddhover,
  groupaddleave,
  layeraddhover,
  layeraddleave,
} from "./store/slices/HoverSlice";
import { EpicWrapper } from "./EpicWrapper";

const App = () => {
  const data = useSelector((state) => state.data);
  const groupaddHover = useSelector((state) => state.groupaddhovereffect);
  const layeraddHover = useSelector((state) => state.layeraddhovereffect);

  const dispatch = useDispatch();

  const epicAndGroup = (groupId) => {
    return data.epic.filter((epic) => epic.gId === groupId);
  };

  return (
    <>
      {/* <div
        style={{
          position: "fixed",
          background: "green",
          height: 30,
          width: "100%",
          top:0
        }}
      >
        Header{" "}
      </div> */}
      <div style={{ marginTop: 20 }}>
        <div className="groupWrapper">
          {data.group.map((group, gIndex) => {
            const filterEpicForGroup = epicAndGroup(group.gId);
            return (
              <EpicWrapper
                filterEpicForGroup={filterEpicForGroup}
                group={group}
                gIndex={gIndex}
                key={gIndex}
              />
            );
          })}
          <button
            className={groupaddHover ? "groupAdd groupaddhover" : "groupAdd"}
            onMouseEnter={() => dispatch(groupaddhover())}
            onMouseLeave={() => dispatch(groupaddleave())}
            onClick={() => dispatch(groupAdd())}
          >
            +
          </button>
        </div>
        <div className="layerWrapper">
          {data.layer.map((layer, lIndex) => (
            <Layer layer={layer} key={lIndex} lIndex={lIndex} />
          ))}
          <div className="bottomlayer">
            <button
              className={layeraddHover ? "layerAdd layerAddhover" : "layerAdd"}
              onMouseEnter={() => dispatch(layeraddhover())}
              onMouseLeave={() => dispatch(layeraddleave())}
              onClick={() => dispatch(layerAdd())}
            >
              +
            </button>
            <div
              className={
                layeraddHover ? "bottombar layerAddhover" : "bottombar"
              }
            >
              bottom bar
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
