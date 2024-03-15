import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseServices from "../../appwrite services/database";
import { Button } from "../bridge";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import storageService from "../../appwrite services/storage";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      databaseServices.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    databaseServices.deletePost(post.$id).then((status) => {
      if (status) {
        storageService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="p-3 mx-5 bg-white  mb-[200px] rounded-xl shadow-xl">
      <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
        <img
          className="rounded-lg w-full h-[400px] object-cover
            aspect-video object-[5px_30%]"
          src={storageService.previewFile(post.featuredImage)}
          alt={post.title}
        />

        {isAuthor && (
          <div className="absolute right-6 top-6">
            <Link to={`/edit-post/${post.$id}`}>
              <Button className="w-12 mr-3 bg-white text-black">Edit</Button>
            </Link>
            <Button className="w-20  bg-white text-black" onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}
      </div>
      <div className="w-full mb-6">
        <h1 className="text-2xl font-bold">{post.title}</h1>
      </div>
      <div className="browser-css">{parse(post.content)}</div>
    </div>
  ) : null;
}
