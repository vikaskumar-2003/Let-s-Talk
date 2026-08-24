import React from "react";
import { transformImage } from "../../lib/features";
import FileOpenIcon from "@mui/icons-material/FileOpen";

const RenderAttachment = ({ file, url }) => {
  console.log("from attachment", file);

  switch (file) {
    case "video":
      return <video src={url} preload="none" width={"200px"} controls />;
       break

    case "image":
      return (
        <img
          src={transformImage(url, 200)}
          alt="attachment"
          width={"200px"}
          height={"150px"}
          style={{ objectFit: "contain" }}
        />
      );
     break


    case "audio":
      return <audio src={url} preload="none" controls />;
     break

    default:
      return <FileOpenIcon />;
  }
};

export default RenderAttachment;
