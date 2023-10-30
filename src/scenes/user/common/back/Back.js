import React from "react";
import { useLocation } from "react-router-dom";

const Back = ({ title }) => {
  return (
    <>
      <section className="back">
        <h1>{title}</h1>
      </section>
      <div className="margin"></div>
    </>
  );
};

export default Back;
