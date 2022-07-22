import React from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "../../redux/hooks";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { switchReportModal } from "../../redux/modalStates";

const Overflow = styled.div`
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  z-index: 9999;
  justify-content: center;
`;

const Container = styled.div`
  background-color: var(--blue);
  color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 40px 60px;
  gap: 20px;
`;

const Exit = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

export default function Report() {
  const dispatch = useAppDispatch();

  return (
    <Overflow>
      <Container>
        <Exit>
          <CloseIcon onClick={() => dispatch(switchReportModal("off"))} />
        </Exit>
        <RadioGroup
          defaultValue="Spam"
          name="report-causes"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            value="Spam"
            control={
              <Radio
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                  },
                }}
              />
            }
            label="Spam"
          />
          <FormControlLabel
            value="Promoting hatred"
            control={
              <Radio
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                  },
                }}
              />
            }
            label="Promoting hatred"
          />
          <FormControlLabel
            value="persecution"
            control={
              <Radio
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                  },
                }}
              />
            }
            label="persecution"
          />
          <FormControlLabel
            value="violence"
            control={
              <Radio
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                  },
                }}
              />
            }
            label="violence"
          />
        </RadioGroup>
        <Button
          onClick={() => dispatch(switchReportModal("off"))}
          sx={{
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
        >
          <Typography
            sx={{
              color: "var(--blue)",
            }}
          >
            Report
          </Typography>
        </Button>
      </Container>
    </Overflow>
  );
}
