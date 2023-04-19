import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";


export const tokens=(mode) => ({
    ...(mode==='dark'
      ? {
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414"
            },
            lightgreen: {
                100: "#FFFFFF",
                200: "#d5f7e1",
                300: "#c1f4d2",
                400: "#acf0c3",
                500: "#97ecb4",
                600: "#79bd90",
                700: "#5b8e6c",
                800: "#3c5e48",
                900: "#1e2f24"
            },
            blue: {
                100: "#d0d1d5",
                200: "#a1a4ab",
                300: "#727681",
                400: "#434957",
                500: "#141b2d",
                600: "#101624",
                700: "#0c101b",
                800: "#080b12",
                900: "#040509"
            },
            darkblue: {
                100: "#dbf5ee",
                200: "#b7ebde",
                300: "#94e2cd",
                400: "#70d8bd",
                500: "#4cceac",
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1e5245",
                900: "#0f2922"
            },
            primary: {
                100: "#cdd3d3",
                200: "#9aa8a8",
                300: "#043030",
                400: "#015B5D",
                500: "#032525",
                600: "#063C3C",
                700: "#004142",
                800: "#010f0f",
                900: "#010707"
            },
            yellow: {
                100: "#fdfdec",
                200: "#fbfbd9",
                300: "#f8fac5",
                400: "#f6f8b2",
                500: "#f4f69f",
                600: "#c3c57f",
                700: "#92945f",
                800: "#626240",
                900: "#313120"
            },
        }
     :  {
            grey: {
                100: "#141414",
                200: "#292929",
                300: "#3d3d3d",
                400: "#525252",
                500: "#666666",
                600: "#858585",
                700: "#a3a3a3",
                800: "#c2c2c2",
                900: "#e0e0e0",
            },
            lightgreen: {
                100: "#FFFFFF",
                200:"#d5f7e1",
                300: "#B3FBCB",
                400: "#9EF3BB",
                500: "#97ecb4",
                600: "#acf0c3",
                700: "#c1f4d2",
                800: "#d5f7e1",
                900: "#eafbf0",
            },
            blue: {
                100: "#040509",
                200: "#080b12",
                300: "#0c101b",
                400: "#101624",
                500:"#FFFFFF",
                600: "#434957",
                700: "#727681",
                800: "#a1a4ab",
                900: "#d0d1d5",
            },
            darkblue: {
                100: "#0f2922",
                200: "#1e5245",
                300: "#2e7c67",
                400: "#3da58a",
                500: "#4cceac",
                600: "#70d8bd",
                700: "#94e2cd",
                800: "#b7ebde",
                900: "#dbf5ee",
            },
            primary: {
                100: "#010707",
                200: "#010f0f",
                300: "#021616",
                400: "#021e1e",
                500: "#032525",
                600: "#355151",
                700: "#687c7c",
                800: "#FFFFFF",
                900: "#cdd3d3",
            },
            yellow: {
                100: "#313120",
                200: "#626240",
                300: "#B2E9C5",
                400: "#c3c57f",
                500: "#f4f69f",
                600: "#f6f8b2",
                700: "#f8fac5",
                800: "#fbfbd9",
                900: "#fdfdec",
            },
        }
    ),
});



export const themeSettings=(mode) => {
    const colors=tokens(mode);
    return {
        palette:{
            mode:mode,
            ...(mode==='dark'
              ?{
                    primary:{
                        main:colors.primary[300],
                    },
                    secondary:{
                        main:colors.lightgreen[500],
                    },
                    neutral:{
                        dark:colors.grey[700],
                        main:colors.grey[500],
                        light:colors.grey[100]
                    },
                    background:{
                        default:colors.primary[500],
                    }
                }:
                {
                    primary:{
                        main:'#fcfcfc',
                    },
                    secondary:{
                        main:colors.lightgreen[500],
                    },
                    neutral:{
                        dark:colors.grey[700],
                        main:colors.grey[500],
                        light:colors.grey[100]
                    },
                    background:{
                        default:"white",
                    },
                }  
            ),
        },
        typography:{
            fontFamily:"Poppins",
            fontSize:14,
            h1:{
                fontFamily:"Poppins",
                fontSize:40,
            },
            h2:{
                fontFamily:"Poppins",
                fontSize:32,
            },
            h3:{
                fontFamily:"Poppins",
                fontSize:24,
            },
            h4:{
                fontFamily:"Poppins",
                fontSize:20,
            },
            h5:{
                fontFamily:"Poppins",
                fontSize:16,
            },
            h6:{
                fontFamily:"Poppins",
                fontSize:14,
            },
        },
    };
};


export const ColorModeContext=createContext({
    toggleColorMode:() => {}
});

export const useMode=() => {
    const [mode,setMode]=useState("dark");

    const colorMode=useMemo(
        () => ({
            toggleColorMode:() =>
                setMode((prev) => (prev==="light"?"dark":"light")),
        }),
        []
    );

    const theme=useMemo(() => createTheme(themeSettings(mode)),[mode]);
    return [theme,colorMode];
}

