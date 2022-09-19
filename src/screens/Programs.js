import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { parseISO, format } from "date-fns";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
  const user = useOutletContext();
  const [programs, setPrograms] = useState([]);

  console.log(user);

  useEffect(() => {
    if (user.userType === "admin") {
      fetch(`http://localhost:5000/programs`)
        .then((response) => response.json())
        .then(({ programs }) => {
          setPrograms(programs);
        })
        .catch(() => console.log("error"));
    } else setPrograms(user?.programs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id) => async () => {
    await deleteProgram(id);
    const newProgramsList = programs.filter((el) => el.id !== id);
    setPrograms(newProgramsList);
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
            onClick={() => console.log("onClick")}
            size="small"
            sx={cardStyles.addNewButton}
          >
            Add New
          </Button>
        </Box>
      )}
      <CardContent sx={{ height: "max-content" }}>
        <List dense={true}>
          {programs?.length > 0 ? (
            programs?.map((el) => (
              <ListItem
                key={el.id}
                secondaryAction={
                  user.userType === "admin" && (
                    <>
                      <IconButton
                        onClick={() => console.log("edit")}
                        edge="end"
                        aria-label="delete"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={handleDelete(el.id)}
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  onClick={() => console.log("item")}
                  primary={`${el.name} - ${el.abbreviation}`}
                  secondary={`${format(
                    parseISO(el.start),
                    "MM/dd/yyyy"
                  )} - ${format(parseISO(el.end), "MM/dd/yyyy")}`}
                />
              </ListItem>
            ))
          ) : (
            <Typography sx={{ color: "#546e7a" }} align="center">
              {"There is no program on your list"}
            </Typography>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default Programs;
