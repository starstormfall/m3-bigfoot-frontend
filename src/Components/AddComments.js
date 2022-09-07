import { useState, useEffect } from "react";
import axios from "axios";

export default function AddComments(props) {
  const [comment, setComment] = useState("");

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    let newComment = {
      content: comment,
      sightingId: props.sightingId,
    };
    let response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/sightings/${props.sightingId}/comments`,
      newComment
    );
    console.log(response);

    setComment("");
  };

  return <div></div>;
}
