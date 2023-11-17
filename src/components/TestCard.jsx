import React from "react";
import { Box } from "@mui/material";
import { Link } from 'react-router-dom'

// Stat Box
const TestCard = (props) => {
    const redirectUrl = {
        "Empty Filling": "/games/empty",
        "Single Choice": "/games/single",
        "Multi Choice": "/games/multi",
    }
    return (
        <Link to={redirectUrl[props.text]}>
            <Box sx={{ textAlign: "center", borderRadius: '13px', border: "2px solid", padding: '27px', cursor: 'pointer' }}>
                <img style={{ width: "300", marginBottom: "30px" }} src={props.img} alt={props.text}></img>
                <p style={{ fontFamily: 'SamuraiBlast' }}> {props.text} </p>
            </Box>
        </Link>
    );
};

export default TestCard;
