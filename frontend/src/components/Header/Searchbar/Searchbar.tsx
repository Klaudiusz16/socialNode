import { Grow, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { switchSearchbarModal } from "../../../redux/modalStates";
import { gql, useQuery } from "@apollo/client";
import ResultItem from "./ResultItem";

const Container = styled.div`
  height: 60px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
  background: transparent;
`;

const IconWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  color: var(--blue);
  min-height: 40px;
  min-width: 40px;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
`;

const SeachbarWrapper = styled.div`
  position: fixed;
  top: 90px;
  left: 1.5%;
  width: 95%;
  max-height: 90%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  height: 70px;

  @media (min-width: 768px) {
    position: initial;
    max-height: 40px;
  }
`;

const ResultContainer = styled.div`
  position: absolute;
  top: 70px;
  left: 0px;
  background-color: white;
  width: 300px;
  max-height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 15px;
  gap: 5px;
  box-sizing: border-box;
  padding: 10px;
`;

const isMobilePhone = window.innerWidth < 768;

export default function Searchbar() {
  const [inputValue, setInputValue] = useState<string>("");
  const { searchbar: isOpen } = useAppSelector((state) => state.modals);
  const [isTyping, setTypingState] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [searchResults, updateSearchResults] = useState([]);

  const { data, refetch } = useQuery(GET_ALL_USERS);

  useEffect(() => {
    if (!isMobilePhone) dispatch(switchSearchbarModal("on"));
  }, []);

  useEffect(() => {
    if (data?.getAllUsers) {
      updateSearchResults(
        data.getAllUsers.filter((user) => {
          const fullName = (user.Firstname + " " + user.Surname).toLowerCase();
          return fullName.includes(inputValue.toLowerCase());
        })
      );
    }
  }, [data, isTyping, inputValue]);

  return (
    <Container className="navbar_searchbar">
      {isMobilePhone ? (
        <IconWrapper
          isOpen={isOpen}
          onClick={() =>
            isOpen
              ? dispatch(switchSearchbarModal("off"))
              : dispatch(switchSearchbarModal("on"))
          }
        >
          <SearchIcon />
        </IconWrapper>
      ) : null}

      <Grow in={!isMobilePhone ? true : isOpen}>
        <SeachbarWrapper>
          <TextField
            label={isTyping || inputValue.length ? "Typing..." : "Search"}
            value={inputValue}
            InputLabelProps={
              isTyping || inputValue.length
                ? {
                    style: {
                      color: "white",
                      background: "#928dab",
                      width: "80px",
                      borderRadius: "15px",
                      textAlign: "center",
                      marginLeft: "-4px",
                    },
                  }
                : {}
            }
            sx={{
              backgroundColor: "white",
              borderRadius: "15px",
              border: "none",

              "& fieldset": {
                borderRadius: "15px",
                borderColor: "white",
                border: "none !important",
              },
            }}
            data-testid="global_searchbar"
            size="small"
            onFocus={() => setTypingState(true)}
            onBlur={() => setTypingState(false)}
            onChange={(e) => {
              refetch();
              setInputValue(e.target.value);
            }}
          />
        </SeachbarWrapper>
      </Grow>
      <Grow in={isTyping}>
        <ResultContainer>
          {searchResults.map((result) => (
            <ResultItem key={result.id} result={result} />
          ))}
        </ResultContainer>
      </Grow>
    </Container>
  );
}

const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      Firstname
      Surname
      id
      Avatar
    }
  }
`;
