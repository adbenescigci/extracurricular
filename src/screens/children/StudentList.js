import { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import { updateProgram } from "../../api/index";
import { updateOne } from "../../providers/Redux/slices/programSlice";

const StudentList = ({ open, anchorEl, handleClose, program, students }) => {
  const [student, setStudents] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStudents(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = async () => {
    let ids = [];
    student.forEach((el) => ids.push(el.id));
    console.log(students);
    await updateProgram(program.id, { students: ids });
    dispatch(updateOne({ id: program.id, newIds: ids }));
    handleClose();
  };

  const handleClosePopover = () => {
    setStudents([]);
    handleClose();
  };

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
      <Grid item container justifyContent="center" alignItems="center">
        <Grid item xs={12} align="center">
          {program.name} {program.abbreviation}
        </Grid>
        <Grid item xs="auto">
          <Button onClick={handleSubmit}>Submit</Button>
        </Grid>
        <Grid item xs="auto">
          <Button onClick={handleClosePopover}>Esc</Button>
        </Grid>
      </Grid>
      <FormControl sx={{ m: 2, width: "50vh" }}>
        <InputLabel id="demo-multiple-select">Students</InputLabel>
        <Select
          multiple
          fullWidth
          value={student}
          onChange={handleChange}
          input={<OutlinedInput label="Students" />}
          renderValue={(selected) => {
            let data = [];
            console.log(selected);
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
    </Popover>
  );
};

export default memo(StudentList);
