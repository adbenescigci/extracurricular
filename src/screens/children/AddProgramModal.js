import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Controller from "../../common/Controller";
import { modalStyles } from "../styles";

const AddProgramModal = ({ open, onClose, addNewProgram, user, programs }) => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [manager, setManager] = useState([]);
  const [filterManager, setFilterManager] = useState(null);
  let teachers = user?.teachers;

  const {
    register,
    handleSubmit,
    reset,
    formState,
    control,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      programType: "",
      level: "",
      duration: "",
      manager: [],
      schoolYear: "",
      director: "",
    },
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({});
      setManager([]);
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState, reset]);

  useEffect(() => {
    const subscription = watch((data) => {
      if (data.director) {
        setFilterManager(data.director);
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  const onCloseModal = (el, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    setManager([]);
    setStart(null);
    setEnd(null);
    setFilterManager(null);
    reset({});
    onClose(el, reason);
  };

  const addProgram = (data) => {
    let manager = [];
    data.manager.forEach((el) => manager.push(el.id));
    data.director = data.director.id;
    data.manager = manager;
    data.abbreviation = data.abbreviation.toUpperCase();

    setStart(null);
    setEnd(null);
    setFilterManager(null);
    addNewProgram(data);
  };

  const handleStartDateChange = (value) => {
    setValue("start", value);
    setStart(value);
    if (value > end) {
      setEnd(null);
      setValue("end", null);
    }
  };

  const handleEndDateChange = (value) => {
    setValue("end", value);
    setEnd(value);
  };

  const handleManagerChange = (event) => {
    const {
      target: { value },
    } = event;
    setManager(typeof value === "string" ? value.split(",") : value);
    setValue("manager", value);
    clearErrors("manager");
  };

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid container sx={modalStyles.wrapper} spacing={2}>
        <Grid item xs={8} justifyContent="center">
          <TextField
            name="name"
            label="Program Name"
            fullWidth
            variant="outlined"
            {...register("name", {
              required: "required",
            })}
            error={errors.name ? true : false}
            helperText={errors.name?.message}
          />
        </Grid>

        <Grid item xs={4} justifyContent="center">
          <TextField
            name="abbreviation"
            label="Abbreviation"
            fullWidth
            variant="outlined"
            {...register("abbreviation", {
              required: "required",
              maxLength: {
                value: 5,
                message: "max 5 char",
              },
              pattern: {
                value: /^[A-Za-z0-9]*$/,
                message: "just number & letter",
              },
              validate: (value) =>
                programs.filter(
                  (el) => el.abbreviation.toUpperCase() === value.toUpperCase()
                ).length === 0 || "already taken",
            })}
            error={errors.abbreviation ? true : false}
            helperText={errors.abbreviation?.message}
          />
        </Grid>

        <Grid item xs={4} justifyContent="center">
          <TextField
            label="Type"
            select
            fullWidth
            defaultValue=""
            {...register("programType", {
              required: "control",
            })}
            error={errors.programType ? true : false}
          >
            {["Type 1", "Type 2", "Type 3"].map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={4} justifyContent="center">
          <TextField
            select
            label="Level"
            fullWidth
            defaultValue=""
            {...register("level", {
              required: "control",
            })}
            error={errors.level ? true : false}
          >
            {["Elementary", "Middle", "High"].map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={4} justifyContent="center">
          <TextField
            id="select-program-duration"
            select
            label="Duration"
            fullWidth
            defaultValue=""
            {...register("duration", {
              required: "control",
            })}
            error={errors.duration ? true : false}
          >
            {[10, 15, 20, 25, 30].map((option, index) => (
              <MenuItem key={index} value={option}>
                {option} h
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid item xs={4} justifyContent="center">
            <DesktopDatePicker
              {...register("start", {
                required: "control",
              })}
              label="Start Date"
              inputFormat="MM/dd/yy"
              value={start}
              minDate={new Date()}
              onChange={handleStartDateChange}
              renderInput={(params) => (
                <TextField error={errors.start ? true : false} {...params} />
              )}
              onError={(reason, value) => console.log(reason, value)}
            />
          </Grid>
          <Grid item xs={4} justifyContent="center">
            <DesktopDatePicker
              {...register("end", {
                required: "control",
              })}
              label="End Date"
              inputFormat="MM/dd/yy"
              value={end}
              minDate={start}
              onChange={handleEndDateChange}
              renderInput={(params) => <TextField {...params} />}
              error={errors.end ? true : false}
            />
          </Grid>
        </LocalizationProvider>

        <Grid item xs={4} justifyContent="center">
          <TextField
            select
            label="School Year"
            fullWidth
            defaultValue=""
            {...register("schoolYear", {
              required: "control",
            })}
            error={errors.schoolYear ? true : false}
          >
            {[2022, 2023, 2024].map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={5} justifyContent="center">
          <TextField
            select
            label="Director"
            defaultValue=""
            fullWidth
            {...register("director", {
              required: "control",
            })}
            error={errors.director ? true : false}
          >
            {teachers
              .filter((el) => manager.indexOf(el) === -1)
              .map((teacher, index) => (
                <MenuItem key={index} value={teacher}>
                  {`${teacher.firstName} ${teacher.lastName}`}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item xs={7} justifyContent="center">
          <Controller
            {...{
              control,
              name: "manager",
              register,
              rules: {
                required: true,
              },
              render: (props) => (
                <FormControl
                  error={errors.manager ? true : false}
                  sx={{ width: "100%", maxWidth: "100%" }}
                >
                  <InputLabel id="demo-multiple-select">Manager(s)</InputLabel>
                  <Select
                    {...props}
                    multiple
                    fullWidth
                    value={manager}
                    onChange={handleManagerChange}
                    input={<OutlinedInput label="Manager(s)" />}
                    renderValue={(selected) => {
                      let data = [];
                      selected.forEach((el) =>
                        data.push(`${el.firstName} ${el.lastName}`)
                      );
                      return data.join(", ");
                    }}
                  >
                    {teachers
                      .filter((el) => el !== filterManager)
                      .map((teacher) => (
                        <MenuItem key={teacher.id} value={teacher}>
                          <ListItemText
                            primary={`${teacher.firstName} ${teacher.lastName}`}
                          />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              ),
            }}
          />
        </Grid>

        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          sx={modalStyles.buttons}
        >
          <Grid item xs="auto">
            <Button onClick={handleSubmit(addProgram)}>Submit</Button>
          </Grid>
          <Grid item xs="auto">
            <Button onClick={onCloseModal}>Esc</Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default AddProgramModal;
