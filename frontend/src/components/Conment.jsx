import React from "react";
import {
  ChatBubbleBottomCenterIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
// import { Testimonial } from "../images";
import { ConmentForm } from "./";
const id = sessionStorage.getItem("userId");
import { replyConment, editConment, getConments, delConment } from "../services";
import {areYouSureAlert, SuccessAlert} from '../utils'

const Conment = ({
  avatar,
  _id,
  name,
  date,
  text,
  userId,
  setAffectedConment,
  affectedConment,
  replies,
  postId,
  setConments,
}) => {
  const repliesArr = replies.map((conment) => {
    return (
      <div
        key={conment._id}
        className="flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg max-w-md"
      >
        {conment.postedBy?.avatar?(
          <img
            src={conment.postedBy?.avatar}
            alt="User profile"
            className="w-9 h-9 object-cover rounded-full"
          />

        ):(
          <div className="w-9 h-9 rounded-full bg-green-400">
          <p className="text-center text-white">{conment.postedBy?.name[0]}</p>
          </div>
        )}

        <div className="flex-1 flex flex-col">
          <h5 className="font-bold text-black text-xs">
            {conment.postedBy?.name}
          </h5>
          <span className="text-xs text-gray-400">
            {new Date(conment.createdAt).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <div className="flex flex-wrap">
            <p className="font-sans mt-[10px] text-gray-400">{conment.reply}</p>
          </div>

          <div className="flex items-center gap-x-3 text-gray-400 text-sm mt-3 mb-3"></div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg max-w-md">
        {avatar?(
          <img
            src={avatar}
            alt="User profile"
            className="w-9 h-9 object-cover rounded-full"
          />
        ):(
          <div className="w-9 h-9 rounded-full bg-green-400">
          <p className="text-center text-white">{name[0]}</p>
          </div>
        )}

        <div className="flex-1 flex flex-col">
          <h5 className="font-bold text-black text-xs">{name}</h5>
          <span className="text-xs text-gray-400">
            {new Date(date).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <div className="flex flex-wrap">
            <p className="font-sans mt-[10px] text-gray-400">{text}</p>
          </div>

          <div className="flex items-center gap-x-3 text-gray-400 text-sm mt-3 mb-3">
            <button
              className="flex items-center space-x-2"
              onClick={() => setAffectedConment({ type: "reply", _id })}
            >
              <ChatBubbleBottomCenterIcon className="w-4 h-auto" />
              <span>Reply</span>
            </button>

            {userId === id && (
              <div className="flex gap-x-3">
                <button
                  className="flex items-center space-x-2"
                  onClick={() => setAffectedConment({ type: "edit", _id })}
                >
                  <PencilIcon className="w-4 h-auto" />
                  <span>Edit</span>
                </button>

                <button
                  className="flex items-center space-x-2"
                  onClick={() => {
                    setAffectedConment({ type: "delete", _id });

                    if (affectedConment?.type === "delete" && userId === id) {
                      areYouSureAlert('commnent').then(async(res)=> {
                        if (res.isConfirmed) {
                          const isDelComment = await delConment(_id);
        
                          if (isDelComment) {
                            SuccessAlert('Delete Comment', 'Comment deleted successfuly');
                            getConments(setConments, postId);
                          }
                        }
                      })
                    }
                  }}
                >
                  <TrashIcon className="w-4 h-auto" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
          {affectedConment?.type === "reply" &&
            userId !== id &&
            affectedConment._id === _id && (
              <ConmentForm
                handleSubmit={async (e) => {
                  e.preventDefault();
                  const { text } = e.target;
                  const value = text.value;
                  const res = await replyConment(_id, value);
                  if (res) getConments(setConments, postId);
                  affectedConment.type = "";
                }}
                placeholder={"Reply this conment"}
                formCancel={{
                  state: true,
                  func() {
                    setAffectedConment({ type: "" });
                  },
                }}
              />
            )}

          {affectedConment?.type === "edit" && userId === id && (
            <ConmentForm
              handleSubmit={async (e) => {
                e.preventDefault();
                const { text } = e.target;
                const value = text.value;
                const res = await editConment(_id, value);
                if (res) getConments(setConments, postId);
                affectedConment.type = "";
              }}
              placeholder={"Edit this comment"}
              formCancel={{
                state: true,
                func() {
                  setAffectedConment({ type: "" });
                },
              }}
            />
          )}

          {replies.length > 0 && repliesArr}
        </div>
      </div>
    </>
  );
};

export default Conment;
