import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, createComment } from "../features/commentslice";

const Comment = ({ postId }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const comments = useSelector((state) => state.comments.commentsByPostId[postId] || []);
    const loading = useSelector((state) => state.comments.loading);
  
    useEffect(() => {
      dispatch(fetchComments(postId));
    }, [dispatch, postId]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (text.trim() === "") return;
      dispatch(createComment({ post: postId, text }));
      setText(""); // clear input
    };
  
    return (
      <div>
        <ul className="list-unstyled">
          {loading ? (
            <li>Loading comments...</li>
          ) : (
            comments.map((comment) => {
              console.log("Profile Picture URL: ", comment.user_profile_picture); // Log the value to check
              return (
                <li key={comment.id} className="d-flex align-items-start mb-2">
                  <img
                    src={comment.user_profile_picture || "/static/defaultProfilePic.jpg"}   
                    alt="User"
                    className="rounded-circle mr-2"
                    style={{ width: "35px", height: "35px", objectFit: "cover" }}
                  />
                  <div>
                    <strong>{comment.user_username}</strong>
                    <p className="mb-1">{comment.text}</p>
                    <small className="text-muted">{new Date(comment.created_at).toLocaleString()}</small>
                  </div>
                </li>
              );
            })
          )}
        </ul>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn btn-sm btn-primary mt-1" type="submit">Post</button>
        </form>
      </div>
    );
};

export default Comment;
