export const stylesHeader = {
  box: {
    width: "98.5%",
    display: "flex",
    position: "sticky",
    top: "0",
    zIndex: "1",
    flexDirection: "row",
    fontSize: ["13px", "15px"],
    fontWeight: "700",
    borderBottom: [0, 7],
    color: "primary.main",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: ["50px", "65px"],
    margin: 0,
    padding: 1,

    //label
    label: {
      fontSize: ["29px", "37px"],
    },

    ".MuiAvatar-circular": {
      backgroundColor: "primary.main",
      color: "white",
      borderColor: "#b28900",
      float: "right",
      "&:hover": {
        cursor: "pointer",
        backgroundColor: "white",
        color: "primary.main",
      },
    },
  },

  grid: {
    textAlign: "center",
    opacity: 0.78,
  },
};
