export const modalStyles = {
  wrapper: {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -30%)",
    width: ["90%", "50%"],
    bgcolor: "#fff8e1",
    borderRadius: 1,
    boxShadow: 24,
    p: [1, 4],
    overflow: "auto",
    maxHeight: "90%",
  },
  buttons: {
    bottom: "1px",
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "10px",
    zIndex: 10,
    padding: 1,
    ".MuiButton-text": {
      color: "#212121",
    },
    ".MuiButton-text:hover": {
      fontWeight: 700,
      color: "primary.main",
    },
  },
};
