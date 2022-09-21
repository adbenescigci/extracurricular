import { parseISO, format } from "date-fns";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";

const Contents = ({ user, handleDelete }) => {
  return (
    <CardContent sx={{ height: "max-content" }}>
      <List dense={true}>
        {user?.programs?.length > 0 ? (
          user?.programs?.map((el) => (
            <ListItem
              key={el.id}
              secondaryAction={
                user?.userType === "admin" && (
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
  );
};

export default Contents;
