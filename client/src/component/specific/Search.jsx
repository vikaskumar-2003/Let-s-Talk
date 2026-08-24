import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useInputValidation } from "6pp";
import SearchIcon from "@mui/icons-material/Search";
import UserItem from "../shared/UserItem";
import { sampleUser } from "../../Constant/sampleData";

const Search = () => {
  const search = useInputValidation();

  const [users, setUsers] = useState(sampleUser);

  let IsLoadingFriendRequest = false;

  const addFreindHandler = (id) => {
    console.log(id);
  };

  return (
    <Dialog open>
      <Stack direction={"column"} sx={{ width: "25rem", p: "2rem" }}>
        <DialogTitle sx={{ textAlign: "center" }}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        <List>
          {users.map((i) => {
            return (
              <UserItem
                user={i}
                key={i._id}
                handler={addFreindHandler}
                handlerIsLoading={IsLoadingFriendRequest}
              />
            );
          })}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
