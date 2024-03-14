import React, { useEffect, useState } from "react";
import { PostForm } from "../bridge";
import databaseServices from "../../appwrite services/database";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {
  const [post, setpost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      databaseServices.getPost(slug).then((post) => {
        if (post) {
          setpost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return (
    post && (
      <div>
        <PostForm post={post} />
      </div>
    )
  );
}

export default EditPost;
