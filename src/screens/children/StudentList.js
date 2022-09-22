import { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IconButton from "@mui/material/IconButton";
import { updateProgram } from "../../api/index";
import { updateOne } from "../../providers/Redux/slices/programSlice";

const StudentList = ({ open, anchorEl, handleClose, program, students }) => {
  const [student, setStudents] = useState([]);
  const dispatch = useDispatch();
  const programs = useSelector((state) => state.program.programs);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStudents(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = async () => {
    let ids = [...program.students];
    student.forEach((el) => ids.push(el.id));
    let students = [...new Set(ids)];
    let index = programs.indexOf(program);

    await updateProgram(program.id, { students });
    dispatch(updateOne({ index, students }));
    handleClose();
  };

  useEffect(() => {
    return () => setStudents([]);
  }, [program]);

  return (
    <Popover
      id="add-student-popover"
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "center",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
    >
      <Grid
        sx={{ p: 2, width: "100%" }}
        item
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={11}>
          <FormControl sx={{ width: "70vh" }}>
            <InputLabel id="multiple-select">Students</InputLabel>
            <Select
              multiple
              fullWidth
              value={student}
              onChange={handleChange}
              input={<Input label="Students" />}
              renderValue={(selected) => {
                let data = [];
                selected.forEach((el) =>
                  data.push(`${el.firstName}  ${el.lastName}`)
                );
                return data.join(", ");
              }}
            >
              {students
                .filter((el) => {
                  return (
                    el.schoolLevel === program.level &&
                    program?.students?.indexOf(el.id) === -1
                  );
                })
                .map((el) => (
                  <MenuItem key={el.id} value={el}>
                    <Checkbox checked={student?.indexOf(el) > -1} />
                    <ListItemText primary={`${el.firstName} ${el.lastName}`} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            sx={{ color: "primary.main" }}
            disabled={student.length === 0}
            onClick={handleSubmit}
          >
            <CheckCircleIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Popover>
  );
};

export default memo(StudentList);
