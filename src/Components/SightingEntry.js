import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import AddComments from "./AddComments";

export default function SightingEntry(props) {
  let params = useParams();
  let navigate = useNavigate();
  const [sighting, setSighting] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const getSighting = async () => {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/sightings/${params.sightingId}`
    );
    setSighting(response.data);
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

  const commentsList = comments.map((comment, index) => (
    <li key={comment.id}>{comment.content}</li>
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
      <ul>{sightingEvent}</ul>

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
    </div>
  );
}
