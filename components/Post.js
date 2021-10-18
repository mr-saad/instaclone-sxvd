import React, { useEffect, useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as FilledHeart } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

const Post = ({ id, username, userImg, img, caption }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const send = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      username: session.user.username,
      userImage: session.user.image,
      comment: commentToSend,
      timestamp: serverTimestamp(),
    });
  };

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  return (
    <div className="bg-white border my-7 rounded-sm">
      {/* header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          className="rounded-full h-12 w-12 object-contain border mr-3"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5 cursor-pointer" />
      </div>
      {/* image */}
      <img src={img} className="object-cover w-full" />
      {/* buttons */}
      {session && (
        <div className="flex justify-between p-4 ">
          <div className="flex space-x-4 ">
            {hasLiked ? (
              <FilledHeart onClick={likePost} className="btn text-red-500" />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn rotate-45" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* caption */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="mr-3 font-bold">{username}</span>
        {caption}
      </p>
      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-auto scrollbar-thumb-black scrollbar-thin">
          {comments.map((all) => (
            <div key={all.id} className="flex items-center space-x-2 mb-3">
              <img
                className="h-7 rounded-full"
                src={all.data().userImage}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold mr-4">{all.data().username}</span>
                {all.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {all.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {/* input box */}

      {session && (
        <form className="flex  items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="Add a Comment..."
            type="text"
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            className="font-semibold text-blue-400"
            onClick={send}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
