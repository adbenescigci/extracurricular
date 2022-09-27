import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Contents from "./children/ContentsOfPrograms";
import AddProgramModal from "./children/AddProgramModal";
import StudentList from "./children/StudentList";
import { addNewProgram, updateProgram, deleteProgram } from "../api/index";
import {
  fetchData,
  deleteOne,
  addOne,
} from "../providers/Redux/slices/programSlice";

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
  const [selectedProgram, setProgram] = useState("");
  const user = useSelector((state) => state.auth.user);
  const programs = useSelector((state) => state.program.programs);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickEnroll = (el) => (event) => {
    setProgram(el);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e, reason) => {
    setAnchorEl(null);
    setProgram("");
  };
  const openPopover = Boolean(anchorEl);

  useEffect(() => {
    fetch(
      user.userType === "admin"
        ? "https://school-out-activities.herokuapp.com/programs"
        : `https://school-out-activities.herokuapp.com/programs/enrolled/${user._id}`
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch(fetchData(json));
      })
      .catch(() => console.log("error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id) => async () => {
    await deleteProgram(id);
    dispatch(deleteOne(id));
  };

  const handleAddProgram = async (program) => {
    const { result } = await addNewProgram(program);
    dispatch(addOne(result.data));
  };
  const onCloseModal = (e, reason) => {
    setOpen(false);
  };

  const onOpenModal = (e, reason) => {
    setOpen(true);
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
      <Contents
        user={user}
        programs={programs}
        handleClickEnroll={handleClickEnroll}
        handleDelete={handleDelete}
      />
      {user.userType === "admin" && (
        <AddProgramModal
          user={user}
          open={open}
          programs={programs}
          onClose={onCloseModal}
          addNewProgram={handleAddProgram}
        />
      )}
      {user.userType === "teacher" && (
        <StudentList
          program={selectedProgram}
          open={openPopover}
          anchorEl={anchorEl}
          handleClose={handleClose}
          students={user.students}
          dispatch={dispatch}
          programs
        />
      )}
    </Card>
  );
};

export default Programs;
