import React, { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setGameType } from "../../../features/game/game";

import IntroCloud from "../../../assets/q_1.png";
import IntroImg from "../../../assets/gif/4.gif";
import EmptyFillImg from "../../../assets/gif/5.gif";
import SingleChooseImg from "../../../assets/gif/6.gif";
import MultiChooseImage from "../../../assets/gif/7.gif";

import Correct from "../../../assets/correct.png";
import Wrong from "../../../assets/wrong.png";

import Cloud1 from "../../../assets/q_1.png";
import Cloud2 from "../../../assets/a_2.png";

import TestCard from "components/TestCard";

import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";

const Games = (props) => {
  const [text, setText] = useState("");
  const [nextState, setNextState] = useState(false);
  const [nextStep, setNextStep] = useState(0);
  const gameType = useSelector((state) => state.gameTypeSetter.value);

  const introText =
    "Welcome to the EDPG website, where the pursuit of a virtual degree becomes a thrilling adventure.";

  useEffect(() => {
    if (gameType === "nStart") {
      handleNextStep();
    }
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
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    const handleKeyDown = (event) => {
      // Check for Ctrl+R (key code 82)
      if (event.ctrlKey && event.keyCode === 82) {
        event.preventDefault();
      }

      // Check for Ctrl+Shift+R (key code 82)
      if (event.ctrlKey && event.shiftKey && event.keyCode === 82) {
        event.preventDefault();
      }

      // Check for F5 key (key code 116)
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
  const [answers, setAnswers] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState();
  const dispatch = useDispatch();

  const handleNext = () => {
    if (Object.keys(answers).length === 0) {
      setErrorMessage("Please Fill Empty Fields");
      return;
    }
    const replacedWords = data[activeStep].question
      .split(/\s+/)
      .map((word, index) => {
        const isReplacementWord = data[activeStep].answers.includes(word);
        return isReplacementWord ? "<input>" : word;
      });
    let i = 0;
    const checkQuestion = replacedWords.map((item) => {
      return item === "<input>" ? answers["answer" + i++] : item;
    });

    if (data[activeStep].question === checkQuestion.join(" ")) {
      setCorrectNum((prev) => prev + 1);
      setCorrect(true);
      setWrong(false);
    } else {
      setCorrect(false);
      setWrong(true);
    }
    setTimeout(() => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setCorrect(false);
      setWrong(false);
      let fields = {};
      data[activeStep].answers.map((item, index) => {
        let name = "answer" + index;
        fields[name] = "";
      });
      setAnswers(fields);
      setErrorMessage("");
    }, 1500);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCorrect(false);
    setWrong(false);
    let fields = {};
    data[activeStep].answers.map((item, index) => {
      let name = "answer" + index;
      fields[name] = "";
    });
    setAnswers(fields);
    setErrorMessage("");
  };

  const handleInputAnswers = (e) => {
    setErrorMessage("");
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetTestData = async (value) => {
    setActiveStep(0);
    setCorrect(false);
    setWrong(false);
    setErrorMessage("");
    try {
      const { data } = await axios.get(
        `${baseUrl}/management/questions?category=${value}&type=empty`
      );

      if (data.length > 0) {
        setShowTest(true);
        setData(data);
        setCategory(value);
        console.log(data);
        let fields = {};
        data[activeStep].answers.map((item, index) => {
          let name = "answer" + index;
          fields[name] = "";
        });
        setAnswers(fields);
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleResetActiveStep = async () => {
    try {
      const score = (10 / data.length) * correctNum;
      await axios.post(`${baseUrl}/management/save-score`, {
        user_id: localStorage.getItem("login-user"),
        score,
        category,
        type: "empty",
      });
    } catch (error) {
      console.error("Error saving or updating score:", error);
    }
    setActiveStep(0);
    setCorrectNum(0);
  };

  const handleTestMenu = () => {
    dispatch(setGameType("nStart"));
    navigate("/games");
  };

  return (
    <Box sx={{ paddingTop: "3%" }}>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            color: "white",
            marginBottom: "10px",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
          onClick={handleTestMenu}
        >
          {`< Back`}
        </Button>
      </Box>
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
          onClick={() => handleGetTestData("javascript")}
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
          <Box>
            {errorMessage && (
              <p style={{ textAlign: "center", color: "red" }}>
                {errorMessage}
              </p>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "50px 150px 0",
              height: "calc(100vh - 530px)",
            }}
          >
            <Box
              sx={{
                width: "700px",
                background: `url(${Cloud1})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                position: "relative",
              }}
            >
              {data[activeStep] ? (
                <Box sx={{ maxWidth: "60%", margin: "auto" }}>
                  <p
                    style={{
                      position: "absolute",
                      top: "35%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "black",
                      fontSize: "43px",
                      textAlign: "center",
                      lineHeight: "50px",
                      overflowX: "hidden",
                      overflowY: "scroll",
                      maxWidth: "300px",
                    }}
                  >
                    {data[activeStep].question
                      .split(/\s+/)
                      .map((word, index) => {
                        const isReplacementWord =
                          data[activeStep].answers.includes(word);
                        return isReplacementWord ? (
                          <>
                            <input
                              className="answer_empty"
                              style={{
                                width: "90px",
                                height: "32px",
                                border: "1px solid",
                                borderRadius: "7px",
                                textAlign: "center",
                              }}
                              key={index}
                              disabled
                            />
                          </>
                        ) : (
                          <span key={index}>{word} </span>
                        );
                      })}
                  </p>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p>Your Score is {(10 / data.length) * correctNum}</p>
                  <button
                    className="test_btn reset_btn"
                    onClick={() => handleResetActiveStep()}
                  >
                    Reset
                  </button>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                width: "700px",
                background: `url(${Cloud2})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                position: "relative",
              }}
            >
              {correct && (
                <img
                  src={Correct}
                  alt="Correct Image"
                  style={{
                    position: "absolute",
                    width: "200px",
                    top: "17%",
                    left: "37%",
                    zIndex: 999,
                  }}
                />
              )}

              {wrong && (
                <img
                  src={Wrong}
                  alt="Correct Image"
                  style={{
                    position: "absolute",
                    width: "200px",
                    top: "17%",
                    left: "37%",
                    zIndex: 999,
                  }}
                />
              )}

              <Box
                sx={{
                  position: "absolute",
                  top: "42%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                {data[activeStep].answers &&
                  data[activeStep].answers.map((answer, index) => (
                    <input
                      className="answer"
                      name={"answer" + index}
                      value={answers["answer" + index]}
                      style={{
                        width: "180px",
                        height: "32px",
                        color: "black",
                        border: "1px solid black",
                        borderRadius: "7px",
                        textAlign: "center",
                        marginBottom: "5px",
                      }}
                      onChange={handleInputAnswers}
                    />
                  ))}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
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
  const [answer, setAnswer] = React.useState("");
  const [selectedChoice, setSelectedChoice] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState();
  const dispatch = useDispatch();

  const handleNext = () => {
    if (answer === "") {
      setErrorMessage("Please choose correct answer");
      return;
    }
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
      setAnswer("");
      setSelectedChoice("");
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setErrorMessage("");
    }, 1500);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCorrect(false);
    setWrong(false);
    setAnswer("");
    setSelectedChoice("");
    setErrorMessage("");
  };

  const handleGetTestData = async (value) => {
    setCorrect(false);
    setWrong(false);
    setAnswer("");
    setSelectedChoice("");
    setActiveStep(0);
    setErrorMessage("");
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
  const handleAnswer = (answer, index) => {
    setErrorMessage("");
    setAnswer(answer !== -1 && answer.replace(/\s/g, ""));
    setSelectedChoice(index);
  };

  const handleTestMenu = () => {
    dispatch(setGameType("nStart"));
    navigate("/games");
  };

  return (
    <Box sx={{ paddingTop: "3%" }}>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            color: "white",
            marginBottom: "10px",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
          onClick={handleTestMenu}
        >
          {`< Back`}
        </Button>
      </Box>
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
          onClick={() => handleGetTestData("javascript")}
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
          <Box>
            {errorMessage && (
              <p style={{ textAlign: "center", color: "red" }}>
                {errorMessage}
              </p>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "150px",
            }}
          >
            <Box sx={{ width: "24%" }}>
              <img
                style={{ width: "100%", cursor: "pointer" }}
                src={IntroImg}
                alt="Guide Image"
              />
            </Box>
            <Box sx={{ width: "50%" }}>
              {data[activeStep] ? (
                <Box sx={{ maxWidth: "60%", margin: "auto" }}>
                  <p>{data[activeStep].question}</p>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {data[activeStep].cases.map((item, index) => (
                      <Button
                        sx={{
                          my: "10px",
                          color: "white",
                          textTransform: "unset",
                          background: selectedChoice === index && "#291281",
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
                        background: selectedChoice === -1 && "#291281",
                      }}
                      key={-1}
                      variant="outlined"
                      onClick={() => handleAnswer(-1, -1)}
                    >
                      Nothing
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p>Your Score is {(10 / data.length) * correctNum}</p>
                  <button
                    className="test_btn reset_btn"
                    onClick={() => handleResetActiveStep()}
                  >
                    Reset
                  </button>
                </Box>
              )}
            </Box>
            <Box sx={{ width: "24%", textAlign: "center" }}>
              {correct && <img src={Correct} alt="Correct" />}
              {wrong && <img src={Wrong} alt="Wrong" />}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

const MultiTest = () => {
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
  const [answers, setAnswers] = React.useState([]);
  const [selectedChoices, setSelectedChoices] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState();
  const dispatch = useDispatch();

  const handleNext = () => {
    if (answers.length === 0) {
      setErrorMessage("Please choose correct answers");
      return;
    }
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
      setErrorMessage("");
    }, 1500);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCorrect(false);
    setWrong(false);
    setSelectedChoices([]);
    setAnswers([]);
    setErrorMessage("");
  };

  const handleGetTestData = async (value) => {
    setActiveStep(0);
    setCorrect(false);
    setWrong(false);
    setSelectedChoices([]);
    setAnswers([]);
    setErrorMessage("");
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
    setErrorMessage("");
    const updatedChoices = [...selectedChoices];
    const indexInArray = updatedChoices.indexOf(index);
    if (indexInArray !== -1) {
      updatedChoices.splice(indexInArray, 1);
    } else {
      updatedChoices.push(index);
    }
    setSelectedChoices(updatedChoices);
    setAnswers((prevValue) => {
      if (prevValue.includes(answer)) {
        return prevValue.filter((item) => item !== answer);
      } else {
        return [
          ...prevValue,
          answer !== -1 ? answer.replace(/\s/g, "") : answer,
        ];
      }
    });
  };

  const handleTestMenu = () => {
    dispatch(setGameType("nStart"));
    navigate("/games");
  };

  return (
    <Box sx={{ paddingTop: "3%" }}>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            color: "white",
            marginBottom: "10px",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
          onClick={handleTestMenu}
        >
          {`< Back`}
        </Button>
      </Box>
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
          onClick={() => handleGetTestData("javascript")}
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
          <Box>
            {errorMessage && (
              <p style={{ textAlign: "center", color: "red" }}>
                {errorMessage}
              </p>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "150px",
            }}
          >
            <Box sx={{ width: "24%" }}>
              <img
                style={{ width: "100%", cursor: "pointer" }}
                src={IntroImg}
                alt="Guide Image"
              />
            </Box>
            <Box sx={{ width: "50%" }}>
              {data[activeStep] ? (
                <Box sx={{ maxWidth: "60%", margin: "auto" }}>
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
                </Box>
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
            <Box sx={{ width: "24%", textAlign: "center" }}>
              {correct && (
                // <img
                //   src={data.length % 2 === 0 ? Correct0 : Correct1}
                //   alt="Correct Image"
                // />
                <img src={Correct} alt="Wrong" />
              )}
              {wrong && (
                // <img
                //   src={data.length % 2 === 0 ? Wrong0 : Wrong1}
                //   alt="Wrong Image"
                // />
                <img src={Wrong} alt="Wrong" />
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export { Games, EmptyTest, SingleTest, MultiTest };
