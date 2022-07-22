import React, { useEffect } from "react";
import { updateState } from "../../redux/userSlice";
import { useAppDispatch } from "../../redux/hooks";
import { navigate } from "gatsby-link";
import { gql, useQuery } from "@apollo/client";
import { UserType } from "../../interfaces/UserType";

import Cookies from "js-cookie";
import Layout from "../Layout/Layout";
import Apollo from "./Apollo";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export default function PrivateRoute({ path, component: Component, ...rest }) {
  if (
    Cookies.get("signedin") == "false" ||
    Cookies.get("jwt") == "null" ||
    !Cookies.get("signedin")
  ) {
    navigate("/login");
  }

  const dispatch = useAppDispatch();

  const { loading, error, data } = useQuery<
    { getUserData: UserType },
    {
      ID: string;
    }
  >(GET_USER_DATA, {
    variables: {
      ID: Cookies.get("userID"),
    },
  });

  useEffect(() => {
    dispatch(updateState(data?.getUserData));
  }, [data]);

  if (loading)
    return (
      <LoadingWrapper>
        <CircularProgress />
      </LoadingWrapper>
    );

  if (error) {
    console.log(error);
    return null;
  }
  return <Component {...rest} />;
}
const GET_USER_DATA = gql`
  query getUserData($ID: String!) {
    getUserData(ID: $ID) {
      id
      Firstname
      Surname
      Email
      Avatar
      Friends {
        id
        User1 {
          Firstname
          Surname
          id
          Avatar
        }
        User2 {
          Firstname
          Surname
          id
          Avatar
        }
        Since
      }
    }
  }
`;
