import React, { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";

import IntroCloud from "../../../assets/q_1.png";
import GuideCloud from "../../../assets/q_2.png";
import IntroImg from "../../../assets/gif/4.gif";
import EmptyFillImg from "../../../assets/gif/5.gif";
import SingleChooseImg from "../../../assets/gif/6.gif";
import MultiChooseImage from "../../../assets/gif/7.gif";

import Correct0 from "../../../assets/correct/2.png";
import Correct1 from "../../../assets/correct/5.png";
import Wrong0 from "../../../assets/wrong/2.gif";
import Wrong1 from "../../../assets/wrong/3.gif";

import TestCard from "components/TestCard";

import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";

const Games = () => {
  const [text, setText] = useState("");
  const [nextState, setNextState] = useState(false);
  const [nextStep, setNextStep] = useState(0);
  const introText =
    "Welcome to the EDPG website, where the pursuit of a virtual degree becomes a thrilling adventure.";

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      const currentText = text + introText[index];
      setText((prevText) => prevText + currentText);
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

const EmptyTest = () => {
  // useEffect(() => {
  //   const handleContextMenu = (event) => {
  //     event.preventDefault();
  //   };

  //   const handleKeyDown = (event) => {
  //     // Check for Ctrl+R (key code 82)
  //     if (event.ctrlKey && event.keyCode === 82) {
  //       event.preventDefault();
  //     }

  //     // Check for Ctrl+Shift+R (key code 82)
  //     if (event.ctrlKey && event.shiftKey && event.keyCode === 82) {
  //       event.preventDefault();
  //     }

  //     // Check for F5 key (key code 116)
  //     if (event.keyCode === 116) {
  //       event.preventDefault();
  //     }
  //   };

  //   window.addEventListener("contextmenu", handleContextMenu);
  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("contextmenu", handleContextMenu);
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <React.Fragment>
      <Box>
        <button className="html_btn">HTML</button>
      </Box>
      <MobileStepper
        variant="progress"
        steps={11}
        position="static"
        activeStep={activeStep}
        sx={{
          margin: "auto",
          maxWidth: 800,
          flexGrow: 1,
          "& .MuiLinearProgress-colorPrimary": {
            background: "rgb(74 81 119)",
          },
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#1da320",
          },
        }}
        nextButton={
          <Button
            sx={{ color: "white" }}
            size="small"
            onClick={handleNext}
            disabled={activeStep === 10}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            sx={{ color: "white" }}
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </React.Fragment>
  );
};
const SingleTest = () => {
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.keyCode === 82) {
        event.preventDefault();
      }

      if (event.ctrlKey && event.shiftKey && event.keyCode === 82) {
        event.preventDefault();
      }

      if (event.keyCode === 116) {
        event.preventDefault();
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const theme = useTheme();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);
  const [showTest, setShowTest] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [correct, setCorrect] = React.useState(false);
  const [correctNum, setCorrectNum] = React.useState(0);
  const [wrong, setWrong] = React.useState(false);
  const [category, setCategory] = React.useState("html");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setCorrect(false);
    setWrong(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCorrect(false);
    setWrong(false);
  };

  const handleGetTestData = async (value) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/management/questions?category=${value}&type=single`
      );

      if (data.length > 0) {
        setShowTest(true);
        setData(data);
        setCategory(value);
      }
    } catch (error) {
      console.error(error.response); // Log the error response for more details
    }
  };

  const handleResetActiveStep = async () => {
    try {
      const score = (10 / data.length) * correctNum;
      await axios.post(`${baseUrl}/management/save-score`, {
        user_id: localStorage.getItem("login-user"),
        score,
        category,
        type: "single",
      });
    } catch (error) {
      console.error("Error saving or updating score:", error);
    }
    setActiveStep(0);
    setCorrectNum(0);
  };
  const handleAnswer = (answer) => {
    if (data[activeStep].answers[0] === answer) {
      setCorrect(true);
      setWrong(false);
      setCorrectNum((prev) => prev + 1);
    } else if (data[activeStep].answers[0] !== answer) {
      setWrong(true);
      setCorrect(false);
    }
    if (answer === -1) {
      const isInArray = data[activeStep].answers.some((value) =>
        data[activeStep].cases.includes(value)
      );
      if (isInArray === false) {
        setCorrect(true);
        setWrong(false);
        setCorrectNum((prev) => prev + 1);
      } else {
        setCorrect(false);
        setWrong(true);
      }
    }
    setTimeout(() => {
      setCorrect(false);
      setWrong(false);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }, 1000);
  };

  const handleTestMenu = () => {
    navigate("/games");
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "50px",
          justifyContent: "center",
        }}
      >
        <button
          className="test_btn html_btn"
          onClick={() => handleGetTestData("html")}
        >
          HTML
        </button>
        <button
          className="test_btn css_btn"
          onClick={() => handleGetTestData("css")}
        >
          CSS
        </button>
        <button
          className="test_btn js_btn"
          onClick={() => handleGetTestData("html")}
        >
          JavaScript
        </button>
      </Box>
      {showTest && (
        <>
          <MobileStepper
            variant="progress"
            steps={data.length + 1}
            position="static"
            activeStep={activeStep}
            sx={{
              display: activeStep === data.length && "none",
              margin: "auto",
              maxWidth: 800,
              flexGrow: 1,
              "& .MuiLinearProgress-colorPrimary": {
                background: "rgb(74 81 119)",
              },
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#1da320",
              },
            }}
            nextButton={
              <Button
                sx={{
                  color: "white",
                }}
                size="small"
                onClick={handleNext}
                disabled={activeStep === data.length}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                sx={{
                  color: "white",
                }}
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              padding: "150px",
            }}
          >
            <Box>
              <img
                style={{ width: "300px", cursor: "pointer" }}
                src={IntroImg}
                alt="Guide Image"
                onClick={handleTestMenu}
              />
            </Box>
            <Box>
              {data[activeStep] ? (
                <>
                  <p>{data[activeStep].question}</p>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {data[activeStep].cases.map((item, index) => (
                      <Button
                        sx={{
                          my: "10px",
                          color: "white",
                          textTransform: "unset",
                        }}
                        key={index}
                        variant="outlined"
                        onClick={() => handleAnswer(item)}
                      >
                        {item}
                      </Button>
                    ))}
                    <Button
                      sx={{
                        my: "10px",
                        color: "white",
                        textTransform: "unset",
                      }}
                      key={-1}
                      variant="outlined"
                      onClick={() => handleAnswer(-1)}
                    >
                      Nothing
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <p>Your Score is {(10 / data.length) * correctNum}</p>
                  <button
                    className="test_btn reset_btn"
                    onClick={() => handleResetActiveStep()}
                  >
                    Reset
                  </button>
                </>
              )}
            </Box>
            <Box>
              {correct && (
                <img
                  src={data.length % 2 === 0 ? Correct0 : Correct1}
                  alt="Correct Image"
                />
              )}
              {wrong && (
                <img
                  src={data.length % 2 === 0 ? Wrong0 : Wrong1}
                  alt="Wrong Image"
                />
              )}
            </Box>
          </Box>
        </>
      )}
    </React.Fragment>
  );
};

const MultiTest = () => {
  // useEffect(() => {
  //   const handleContextMenu = (event) => {
  //     event.preventDefault();
  //   };

  //   const handleKeyDown = (event) => {
  //     // Check for Ctrl+R (key code 82)
  //     if (event.ctrlKey && event.keyCode === 82) {
  //       event.preventDefault();
  //     }

  //     // Check for Ctrl+Shift+R (key code 82)
  //     if (event.ctrlKey && event.shiftKey && event.keyCode === 82) {
  //       event.preventDefault();
  //     }

  //     // Check for F5 key (key code 116)
  //     if (event.keyCode === 116) {
  //       event.preventDefault();
  //     }
  //   };

  //   window.addEventListener("contextmenu", handleContextMenu);
  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("contextmenu", handleContextMenu);
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);
  const theme = useTheme();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);
  const [showTest, setShowTest] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [correct, setCorrect] = React.useState(false);
  const [correctNum, setCorrectNum] = React.useState(0);
  const [wrong, setWrong] = React.useState(false);
  const [category, setCategory] = React.useState("html");
  const [answers, setAnswers] = React.useState([]);
  const [selectedChoices, setSelectedChoices] = React.useState([]);

  const handleNext = () => {
    if (JSON.stringify(answers) === JSON.stringify(data[activeStep].answers)) {
      setCorrect(true);
      setWrong(false);
      setCorrectNum((prev) => prev + 1);
    } else {
      setCorrect(false);
      setWrong(true);
    }
    if (answers.length === 1 && answers[0] === -1) {
      const noIdentical = data[activeStep].answers.every((element1) =>
        data[activeStep].cases.every((element2) => element1 !== element2)
      );
      if (noIdentical === true) {
        setCorrect(true);
        setWrong(false);
        setCorrectNum((prev) => prev + 1);
      } else {
        setWrong(true);
        setCorrect(false);
      }
    }
    setTimeout(() => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setCorrect(false);
      setWrong(false);
      setSelectedChoices([]);
      setAnswers([]);
    }, 1500);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCorrect(false);
    setWrong(false);
  };

  const handleGetTestData = async (value) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/management/questions?category=${value}&type=multi`
      );

      if (data.length > 0) {
        setShowTest(true);
        setData(data);
        setCategory(value);
      }
    } catch (error) {
      console.error(error.response); // Log the error response for more details
    }
  };

  const handleResetActiveStep = async () => {
    try {
      console.log("saveScpre");
      const score = (10 / data.length) * correctNum;
      await axios.post(`${baseUrl}/management/save-score`, {
        user_id: localStorage.getItem("login-user"),
        score,
        category,
        type: "multi",
      });
    } catch (error) {
      console.error("Error saving or updating score:", error);
    }
    setActiveStep(0);
    setCorrectNum(0);
  };
  const handleAnswer = (answer, index) => {
    const updatedChoices = [...selectedChoices];
    const indexInArray = updatedChoices.indexOf(index);
    if (indexInArray !== -1) {
      updatedChoices.splice(indexInArray, 1);
    } else {
      updatedChoices.push(index);
    }
    setSelectedChoices(updatedChoices);
    setAnswers((prevValue) => [...prevValue, answer]);
  };

  const handleTestMenu = () => {
    navigate("/games");
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "50px",
          justifyContent: "center",
        }}
      >
        <button
          className="test_btn html_btn"
          onClick={() => handleGetTestData("html")}
        >
          HTML
        </button>
        <button
          className="test_btn css_btn"
          onClick={() => handleGetTestData("css")}
        >
          CSS
        </button>
        <button
          className="test_btn js_btn"
          onClick={() => handleGetTestData("html")}
        >
          JavaScript
        </button>
      </Box>
      {showTest && (
        <>
          <MobileStepper
            variant="progress"
            steps={data.length + 1}
            position="static"
            activeStep={activeStep}
            sx={{
              display: activeStep === data.length && "none",
              margin: "auto",
              maxWidth: 800,
              flexGrow: 1,
              "& .MuiLinearProgress-colorPrimary": {
                background: "rgb(74 81 119)",
              },
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#1da320",
              },
            }}
            nextButton={
              <Button
                sx={{
                  color: "white",
                }}
                size="small"
                onClick={handleNext}
                disabled={activeStep === data.length}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                sx={{
                  color: "white",
                }}
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              padding: "150px",
            }}
          >
            <Box>
              <img
                style={{ width: "300px", cursor: "pointer" }}
                src={IntroImg}
                alt="Guide Image"
                onClick={handleTestMenu}
              />
            </Box>
            <Box>
              {data[activeStep] ? (
                <>
                  <p>{data[activeStep].question}</p>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {data[activeStep].cases.map((item, index) => (
                      <Button
                        sx={{
                          my: "10px",
                          color: "white",
                          textTransform: "unset",
                          backgroundColor: selectedChoices.includes(index)
                            ? "#291281"
                            : "unset",
                        }}
                        key={index}
                        variant="outlined"
                        onClick={() => handleAnswer(item, index)}
                      >
                        {item}
                      </Button>
                    ))}
                    <Button
                      sx={{
                        my: "10px",
                        color: "white",
                        textTransform: "unset",
                        backgroundColor: selectedChoices.includes(-1)
                          ? "#291281"
                          : "unset",
                      }}
                      key={-1}
                      variant="outlined"
                      onClick={() => handleAnswer(-1, -1)}
                    >
                      Nothing
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <p>Your Score is {(10 / data.length) * correctNum}</p>
                  <button
                    className="test_btn reset_btn"
                    onClick={() => handleResetActiveStep()}
                  >
                    Reset
                  </button>
                </>
              )}
            </Box>
            <Box>
              {correct && (
                <img
                  src={data.length % 2 === 0 ? Correct0 : Correct1}
                  alt="Correct Image"
                />
              )}
              {wrong && (
                <img
                  src={data.length % 2 === 0 ? Wrong0 : Wrong1}
                  alt="Wrong Image"
                />
              )}
            </Box>
          </Box>
        </>
      )}
    </React.Fragment>
  );
};

export { Games, EmptyTest, SingleTest, MultiTest };
