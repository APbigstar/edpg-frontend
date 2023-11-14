import React from "react";
import { Box } from "@mui/material";


// Stat Box
const TestCard = (props) => {
    // theme
    return (
        <Box sx={{ textAlign: "center", borderRadius: '13px', border: "2px solid", padding: '27px', cursor: 'pointer' }}>
            <img style={{ width: "300", marginBottom: "30px" }} src={props.img} alt={props.text}></img>
            <p style={{ fontFamily: 'SamuraiBlast' }}> {props.text} </p>
        </Box>
    );
};

export default TestCard;
