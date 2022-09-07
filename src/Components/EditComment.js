import { useState, useEffect } from "react";
import axios from "axios";

export default function EditComments(props) {
  const [comment, setComment] = useState("");

  const handleSubmitUpdatedComment = async (e, commentId) => {
    e.preventDefault();
    let updatedComment = {
      content: comment,
      id: props.commentId,
    };
    let response = await axios.put(
      `${process.env.REACT_APP_API_SERVER}/sightings/${props.sightingId}/comments`,
      updatedComment
    );
    console.log(response.data);
    props.toggleEditComment();
    props.refreshComments();
  };

  return (
    <div>
      <form onSubmit={handleSubmitUpdatedComment}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="start typing..."
        />
        <input type="submit" />
      </form>
    </div>
  );
}
