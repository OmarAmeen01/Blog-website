import React, { useCallback, useEffect, useState } from "react";
import { Input, Button, Select, RTE } from "../bridge";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import databaseServices from "../../appwrite services/database";
import { set, useForm } from "react-hook-form";
import storageService from "../../appwrite services/storage";
function PostForm({ post }) {
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        status: post?.status || "active",
        slug: post?.slug || "",
      },
    });

  const submit = async (data) => {
    if (post) {
      setIsUploading(true);
      const file = await storageService.uploadFile(data.image[0]);
      if (file) {
        await storageService.deleteFile(post.featuredImage);
      }

      const postUpdate = await databaseServices.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (postUpdate) {
        setIsUploading(false);
        navigate(`/post/${postUpdate.$id}`);
      }
    } else {
      setIsUploading(true);
      const file = await storageService.uploadFile(data.image[0]);

      if (file) {
        data.featuredImage = file.$id;
        const postUpdate = await databaseServices.createPost({
          ...data,
          userId: userData.$id,
        });
        if (postUpdate) {
          setIsUploading(false);
          navigate(`/post/${postUpdate.$id}`);
        }
      }
    }
  };

  const slugGenerator = useCallback((value) => {
    if (value && typeof value === "string")
      return value.toLowerCase().replace(/ /g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscribe = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugGenerator(value.title, { shoudValidate: true }));
      }
    });
    return () => {
      subscribe.unsubscribe();
    };
  }, [setValue, slugGenerator]);

  return isUploading ? (
    <div className="h-[80vh] lg:h-[22.8vh] flex justify-center items-center">
      <p className="text-3xl font-bold text-black animate-pulse absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
        Uploading your post please wait....
      </p>
    </div>
  ) : (
    <div className="max-w-md m-auto   mb-[198px] bg-white p-5 rounded-xl shadow-xl  flex flex-col place-items-center mt-5  ">
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex  flex-col  gap-3">
          <Input
            label="Title "
            type="text"
            className=" text-md  max-[520px]:mt-4 p-2 rounded-xl border border-black ml-12"
            placeholder="What is on your mind..."
            {...register("title", {
              required: true,
            })}
          />
          <Input
            label="Slug"
            type="text"
            placeholder="What is on your mind..."
            className="text-md max-[520px]:mt-4 ml-12 p-2  rounded-xl border border-slate-400 "
            onInput={(e) =>
              setValue("slug", slugGenerator(e.currentTarget.value), {
                shouldValidate: true,
              })
            }
            {...register("slug", {
              required: true,
              disabled: true,
            })}
          />
          <Input
            label="Upload image "
            type="file"
            className="text-sm max-[520px]:ml-12  mt-3 text-neutral-400   ml-4 p-1 w-90 rounded-xl border  w-48 hover:cursor-pointer hover:outline border-black"
            accept="image/png, image/jpeg, image/jpg, image/gif"
            {...register("image", {
              required: !post,
            })}
          />

          <RTE
            control={control}
            label="Description "
            name="description"
            defaultValue={getValues("content")}
            {...register("content", {
              required: true,
            })}
          />
        </div>
        <div className="mt-10 flex  justify-between ">
          <Select
            options={["Active", "Hidden"]}
            label="Status "
            className=" ml-5 max-[520px]:text-sm p-2 text-lg  font-semibold rounded-lg border border-black rounder-lg   "
            {...register("status", { required: true })}
          />

          <div>
            <Button
              type="submit"
              className=" "
              children={post ? "Update" : "Create"}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
