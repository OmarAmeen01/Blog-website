import React, { useState, useEffect } from "react";
import databaseServices from "../../appwrite services/database";
import { PostCard } from "../bridge";

function Home() {
  console.log("helllow");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    databaseServices.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="rounded-lg bg-white p-3 mt-5 mb-11">
      <h2 className="text-xl p-2 border-b-2 font-bold">
        Checkout latest posts
      </h2>
      <div className="mb-[90px] max-[640px]:flex-col flex flex-row ">
        {posts.map((post) => {
          return (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
