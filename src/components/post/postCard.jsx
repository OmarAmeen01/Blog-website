import storageService from "../../appwrite services/storage";
import { Link } from "react-router-dom";

function PostCard({ $id, featuredImage, title }) {
  return (
    <div className="shadow-xl mt-4 p-2 shadow-3xl m-1 rounded-lg  transition ease-in-out delay-150 hover:scale-110 duration-300">
      <Link to={`/post/${$id}`}>
        <img
          className="rounded-lg h-[150px] object-cover object-[1px_10%] w-[150px]"
          src={storageService.previewFile(featuredImage)}
          alt={title}
        />
        <h3 className="text-md p-2 text-left font-bold">{title}</h3>
      </Link>
    </div>
  );
}

export default PostCard;
