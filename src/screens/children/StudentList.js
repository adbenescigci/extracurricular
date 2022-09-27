import { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import { updateProgram } from "../../api/index";
import { updateEnrolledStudents } from "../../providers/Redux/slices/programSlice";

const StudentList = ({ open, anchorEl, handleClose, program, students }) => {
  const [student, setStudents] = useState([]);
  const [enabled, setEnabled] = useState(true);
  const dispatch = useDispatch();
  const programs = useSelector((state) => state.program.programs);

  const styles = {
    select: {
      width: `${student.length > 0 && enabled ? "58vh" : "65vh"} `,
      "&>*": {
        whiteSpace: "pre-line ! important",
      },
    },
    icon: {
      "&:hover": {
        color: "primary.main",
      },
    },
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStudents(typeof value === "string" ? value.split(",") : value);
  };
  const handleCloseSelect = () => {
    setEnabled(true);
  };
  const handleOpenSelect = () => {
    setEnabled(false);
  };

  const handleSubmit = async () => {
    let ids = [...program.students];
    student.forEach((el) => ids.push(el.id));
    let students = [...new Set(ids)];
    let index = programs.indexOf(program);

    await updateProgram(program.id, { students });
    dispatch(updateEnrolledStudents({ index, students }));
    handleClose();
  };

  useEffect(() => {
    return () => setStudents([]);
  }, [program]);

  return (
    <Popover
      id="add-student-popover"
      elevation={1}
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
      <FormControl
        sx={{ width: "65vh", m: 2, display: "flex", flexDirection: "row" }}
      >
        <InputLabel sx={{ m: 0 }}>Students</InputLabel>
        <Select
          sx={styles.select}
          multiple
          fullWidth
          value={student}
          onChange={handleChange}
          onClose={handleCloseSelect}
          onOpen={handleOpenSelect}
          input={<OutlinedInput label="Students" />}
          renderValue={(selected) => {
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value.id}
                    label={`${value.firstName}  ${value.lastName}`}
                    variant="outlined"
                  />
                ))}
              </Box>
            );
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
        {student.length > 0 && enabled && (
          <IconButton sx={styles.icon} onClick={handleSubmit}>
            <AddCircleIcon sx={{ fontSize: "40px" }} />
          </IconButton>
        )}
      </FormControl>
    </Popover>
  );
};

export default memo(StudentList);
