import { useState } from "react";

import SpaceTimeFabric from "./SpaceTimeFabric.jsx";
import ObjectCluster from "./ObjectCluster.jsx";

export default function SceneContainer({ payload }) {
  const [objectInfo, setObjectInfo] = useState([]);

  function getObjectsData(info) {
    setObjectInfo(info);
  }

  return (
    <>
      <SpaceTimeFabric objectData={objectInfo} />

      <ObjectCluster getObjectsData={getObjectsData} payload={payload} />
    </>
  );
}
