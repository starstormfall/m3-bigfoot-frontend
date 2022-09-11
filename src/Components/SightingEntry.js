import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import EditComment from "./EditComment";

export default function SightingEntry(props) {
  let params = useParams();
  let navigate = useNavigate();
  const [sighting, setSighting] = useState({
    date: "",
    locationdescription: "",
    notes: "",
  });
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [editCommentOn, setEditCommentOn] = useState(false);
  const [commentId, setCommentId] = useState();
  const [likeCount, setLikeCount] = useState();
  const [categories, setCategories] = useState([]);

  const getSighting = async () => {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/sightings/${params.sightingId}`
    );
    setSighting(response.data);
    setLikeCount(response.data.likes);
    setCategories(response.data.categories);
  };

  const getComments = async () => {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/sightings/${params.sightingId}/comments`
    );
    setComments(response.data);
  };

  useEffect(() => {
    getSighting();
    getComments();
  }, []);

  const sightingEvent = (
    <>
      <h5>Date: {moment(sighting.date).utc().format("DD-MMM-YYYY")}</h5>
      <h6>Location: {sighting.locationdescription}</h6>
      <p>Notes: {sighting.notes}</p>
    </>
  );

  const listCategories = categories.map((category, index) => (
    <li key={index}>{category.name}</li>
  ));

  const commentsList = comments.map((comment, index) => (
    <li key={comment.id}>
      {comment.content}{" "}
      <button
        onClick={(e) => {
          handleEditComment(comment.id, index, e);
        }}
      >
        Edit
      </button>
      <button onClick={(e) => handleDeleteComment(comment.id, index, e)}>
        Delete
      </button>
    </li>
  ));

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    let newComment = {
      content: comment,
      sightingId: params.sightingId,
    };
    let response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/sightings/${params.sightingId}/comments`,
      newComment
    );
    console.log(response);
    let updatedComments = [...comments];
    updatedComments.push(response.data);

    setComment("");
    setComments(updatedComments);
  };

  const handleEditComment = (commentId, index, e) => {
    setEditCommentOn(!editCommentOn);
    setCommentId(commentId);
  };

  const handleDeleteComment = async (commentId, index, e) => {
    console.log(commentId);
    let comment = {
      id: commentId,
    };
    let response = await axios.delete(
      `${process.env.REACT_APP_API_SERVER}/sightings/${params.sightingId}/comments`,
      { data: comment }
    );

    console.log(response);
    getComments();
  };

  const handleLike = async (sightingId) => {
    let response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/sightings/${params.sightingId}`
    );
    setLikeCount(response.data.likes);
  };

  return (
    <div>
      <br />
      <button
        onClick={() => {
          navigate(`/${params.sightingId}/edit`);
        }}
      >
        Edit Sighting
      </button>
      <ul>
        Categories:
        {categories && categories.length
          ? listCategories
          : " no categories listed"}
      </ul>
      <ul>{sightingEvent}</ul>
      <button onClick={() => handleLike()}>Like:{likeCount}</button>

      <hr />
      <h4>Add a Comment</h4>
      <form onSubmit={handleSubmitComment}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="start typing..."
        />
        <input type="submit" />
      </form>
      <hr />
      <h3>Comments</h3>
      {comments && comments.length ? commentsList : <p>loading comments</p>}
      {editCommentOn ? (
        <EditComment
          sightingId={params.sightingId}
          toggleEditComment={handleEditComment}
          commentId={commentId}
          refreshComments={getComments}
        />
      ) : null}
    </div>
  );
}
