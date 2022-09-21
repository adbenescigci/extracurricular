import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Contents from "./children/ContentsOfPrograms";
import AddProgramModal from "./children/AddProgramModal";

import { deleteOne } from "../providers/Redux/slices/authSlice";
import { addNewProgram, updateProgram, deleteProgram } from "../api/index";

const cardStyles = {
  wrapper: {
    width: "95%",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: "8px",
    minHeight: "35vh",
    marginTop: "5px",
  },
  addNewButton: {
    fontSize: ["0.8rem", "1.05rem"],
    backgroundColor: "primary.main",
    color: "white",
  },
};

const Programs = () => {
  const [open, setOpen] = useState(false);
  const user = useOutletContext();
  const dispatch = useDispatch();

  const handleDelete = (id) => async () => {
    await deleteProgram(id);
    dispatch(deleteOne(id));
  };

  const onCloseModal = (e, reason) => {
    setOpen(false);
  };

  const onOpenModal = (e, reason) => {
    setOpen(true);
  };

  const addNewProgram = (program) => {
    console.log(program);
  };

  return (
    <Card sx={cardStyles.wrapper}>
      {user.userType === "admin" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            bgcolor: "#f5f5f5",
            padding: 1,
          }}
        >
          <Button
            variant="outlined"
            onClick={onOpenModal}
            size="small"
            sx={cardStyles.addNewButton}
          >
            Add New
          </Button>
        </Box>
      )}
      <Contents user={user} handleDelete={handleDelete} />
      <AddProgramModal
        user={user}
        open={open}
        onClose={onCloseModal}
        addNewProgram={addNewProgram}
      />
    </Card>
  );
};

export default Programs;
