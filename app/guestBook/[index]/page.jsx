"use client";
import CollapsibleTable from "@/components/table/index";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
 

export default function guestBook() {
 
  return (
    <>
      <h1>guestBook</h1> 
          <CollapsibleTable></CollapsibleTable> 
    </>
  );
}
