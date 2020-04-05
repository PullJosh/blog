import React from "react";
import classNames from "classnames";

import "./StyledContent.css";

export function StyledContent({ children, className, ...props }) {
  return (
    <div className={classNames("StyledContent", className)} {...props}>
      {children}
    </div>
  );
}
