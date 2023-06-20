import React, { useState } from "react";
import { download } from "../assets";
import { downloadImage } from "../utils";
import { Copy, Done, Heart, HeartColor } from "../images";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate, useLocation} from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {userId} from '../services';

const Card = ({
  _id,
  name,
  prompt,
  photo,
  idInfo,
  category,
  avatar,
  isWithAI,
  isGlobal
}) => {
  // console.log(avatar?.avatar);
  const navigate = useNavigate();
  const location = useLocation();
  const [copy, setCopy] = useState(false);
  const [heart, setHeart] = useState(false);
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card transform hover:scale-[1.02] transition-transform">
      <LazyLoadImage
        src={photo}
        alt={prompt}
        loading="lazy"
        className="w-full h-auto object-cover rounded-xl min-w[1024px]"
        onClick={() => {
          navigate(`/image/${idInfo}`);
        }}
        effect="black-and-white"
        placeholderSrc={photo}
        useIntersectionObserver={true}
      />

      {isWithAI === true && (
        <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute top-0 left-0 bg-[#10131f] m-2 p-4 rounded-md">
          <div>
            <p className="text-white text-sm overflow-y-auto font-medium">AI</p>
          </div>
        </div>
      )}
      {isGlobal === false && location.pathname != '/' &&(
        <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute top-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
          <div>
            <p className="text-white text-sm overflow-y-auto font-medium cursor-pointer">Share</p>
          </div>
        </div>
      )}
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <div className="flex flex-col gap-2">
          <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>
          <span className="text-white text-sm overflow-y-auto rounded-md bg-indigo-500 inline px-4 py-2">
            {category}
          </span>
        </div>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {avatar ? (
                <img
                  src={avatar?.avatar}
                  alt={name}
                  className="rounded-full object-cover w-full h-full"
                />
              ) : (
                <span>{name[0]}</span>
              )}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>

          <div className="flex gap-5">
            <button
              type="button"
              onClick={() => downloadImage(_id, photo)}
              className="outline-none bg-transparent border-none"
            >
              <img
                src={download}
                alt="download"
                className="w-6 h-6 object-contain invert"
              />
            </button>
            <CopyToClipboard text={photo}>
              <button
                type="button"
                onClick={() => {
                  setCopy(true);
                  setTimeout(() => {
                    setCopy(false);
                  }, 1000);
                }}
                className="outline-none bg-transparent border-none"
              >
                {copy ? (
                  <img
                    src={Done}
                    alt="copy"
                    className="w-6 h-6 object-contain invert"
                  />
                ) : (
                  <img
                    src={Copy}
                    alt="copy"
                    className="w-6 h-6 object-contain invert"
                  />
                )}
              </button>
            </CopyToClipboard>
            <button
              type="button"
              onClick={() => setHeart(!heart)}
              className="outline-none bg-transparent border-none"
            >
              {heart ? (
                <img
                  src={HeartColor}
                  alt="copy"
                  className="w-6 h-6 object-contain invert"
                />
              ) : (
                <img
                  src={Heart}
                  alt="copy"
                  className="w-6 h-6 object-contain invert"
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                navigate(`/image/${idInfo}`);
              }}
              className="relative outline-none bg-transparent border-none"
            >
              <ChatBubbleBottomCenterIcon className="w-6 h-6 invert" />
              {/* <span className="text-xs text-white absolute top-6 right-[0.35rem]">
                0
              </span> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
