import React, { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";

import IntroCloud from "../../../assets/q_1.png";
import IntroImg from "../../../assets/gif/4.gif";
import EmptyFillImg from "../../../assets/gif/5.gif";
import SingleChooseImg from "../../../assets/gif/6.gif";
import MultiChooseImage from "../../../assets/gif/7.gif";

import TestCard from "components/TestCard";

const Games = () => {
  const [text, setText] = useState("");
  const [nextState, setNextState] = useState(false);
  const [nextStep, setNextStep] = useState(0);
  const introText =
    "Welcome to the EDPG website, where the pursuit of a virtual degree becomes a thrilling adventure.";

  useEffect(() => {
    setText("");
    setNextState(false);
    let index = -1;
    const intervalId = setInterval(() => {
      setText((prevText) => prevText + introText[index]);
      console.log(text);
      index++;

      if (index === introText.length) {
        clearInterval(intervalId);
        setText(introText);
        setNextState(true);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  const handleNextStep = () => {
    setNextStep(1);
  };

  return nextStep === 0 ? (
    <Box
      sx={{
        maxWidth: "1600px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <p
          style={{
            maxWidth: 267,
            position: "absolute",
            top: "70px",
            left: "57px",
            color: "black",
            fontFamily: "Halloween Slime",
            fontSize: "24px",
          }}
        >
          {text}
          {nextState && (
            <Button
              sx={{ marginLeft: "142px", marginTop: "16px" }}
              variant="outlined"
              onClick={handleNextStep}
            >
              Continue
            </Button>
          )}
        </p>
        <img style={{ width: 380 }} src={IntroCloud} alt="Intro Image" />
      </Box>
      <img style={{ width: 400 }} src={IntroImg} alt="Intro Image" />
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "200px",
        height: "100%",
      }}
    >
      <TestCard img={EmptyFillImg} text="Empty Filling" />
      <TestCard img={SingleChooseImg} text="Single Choice" />
      <TestCard img={MultiChooseImage} text="Multi Choice" />
    </Box>
  );
};

export default Games;
