import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { MAP } from "react-google-maps/lib/constants";

const CustomMapControl = (
  { position = window.google.maps.ControlPosition.BOTTOM_CENTER, children },
  context
) => {
  const map = context[MAP];
  const controlDiv = document.createElement("div");

  useEffect(() => {
    const controls = map.controls[position];
    const index = controls.length;

    controls.push(controlDiv);

    return () => {
      controls.removeAt(index);
    };
  }, [controlDiv, map.controls, position]);

  return createPortal(<div style={{ margin: 10 }}>{children}</div>, controlDiv);
};

export default CustomMapControl;
