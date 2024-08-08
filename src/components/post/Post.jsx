import PropTypes from "prop-types";
import { useState } from "react";
import verified from "../../assets/images/verified.svg";
import { ShimmerSocialPost } from "react-shimmer-effects";
import CustomCarousel from "./CustomCarousel";
import left from "../../assets/carousel/left.svg";
import right from "../../assets/carousel/right.svg";
import dotsactive from "../../assets/carousel/dotsactive.svg";
import dotsinactive from "../../assets/carousel/dotsinactive.svg";
import { useSelector } from "react-redux";
import Modals from "../modals/Modal";
import Edit from "./Edit";
import "../style.css";
import { RxDotsHorizontal } from "react-icons/rx";
import rtkMutation from "../../utils/rtkMutation";
import { useDeletePostMutation } from "../../service/admin/post.service";
import { showAlert } from "../../static/alert";
import moment from "moment";

function Post({
  fullname,
  username,
  verifiedUser,
  postTime,
  content,
  media_urls,
  avatar,
  post_id,
  department,
  type,
  userId,
  category
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  //   const user = useSelector((state) => state.user.user);
  const id = useSelector((state) => state.user?.user?._id);

  const handlePostActionClick = () => {
    setShowPopup(!showPopup);
  };
  const [deletePost] = useDeletePostMutation();

  const removeFeed = async (id) => {
    console.log(id);
    setShowPopup(false);
    await rtkMutation(deletePost, id);
    showAlert("", "Post deleted successfully", "success");
  };

  const handleShowEditModal = () => {
    setShowEditModal(true);
    setShowPopup(false);
  };

  return (
    <div className="w-full max-w-[450px]">
      <div className="pt-3 w-full">
        {content ? (
          <div className="post-card border shadow-lg p-5 h-auto">
            <div className="relative flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <div className={`rounded-full border-4 w-[40px] h-[40px]`}>
                  <img
                    src={avatar}
                    className="rounded-full w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <div>
                  <div className="flex gap-2 items-center">
                    <p className="post-name pb-1">{fullname}</p>{" "}
                    {verifiedUser && (
                      <span>
                        <img src={verified} alt="" className="pb-1" />
                      </span>
                    )}
                  </div>
                  <div className="username flex gap-1 items-center">
                    <p className="flex flex-row post-username">
                      @{username}{" "}
                      <p className="flex">
                        {department || ""}{" "}
                        <span className="post-time ml-2">
                          {moment(postTime).fromNow()}
                        </span>
                      </p>
                    </p>
                  </div>
                </div>
              </div>

              <RxDotsHorizontal
                className="ml-auto cursor-pointer"
                onClick={handlePostActionClick}
              />

              {showPopup && (
                <div className="absolute -right-4 top-[30px] z-50 popup rounded-md bg-[#ffffff] p-2">
                  <div className="  w-[110px] h-[69px] bg-[#ffffff] rounded-[10px] p-2 flex items-center justify-center flex-col gap-2">
                    {/* EDIT POST */}

                    <button
                      onClick={() => handleShowEditModal(true)}
                      className={`${
                        type == "diary" ? "disabled" : ""
                      }flex w-[89px] h-[26px] px-[19px] py-[6px] bg-[#EFF4FF] text-[10px] text-[#838383] justify-center items-center border rounded-md hover:text-black`}
                    >
                      Edit post
                    </button>

                    <button
                      onClick={() => removeFeed(post_id)}
                      className="flex w-[89px] h-[26px] px-[15px] py-[6px] bg-[#EFF4FF] text-[10px] text-[#E71D36] justify-center items-center border rounded-md hover:text-white hover:bg-red-600"
                    >
                      Delete post
                    </button>
                  </div>{" "}
                </div>
              )}
            </div>
            <div className="w-full text-start flex-wrap post-content mt-3">
              {content}
            </div>
            <div className="post-media rounded-md w-full py-3">
              <CustomCarousel
                media_urls={media_urls}
                left={left}
                right={right}
                dotsinactive={dotsinactive}
                dotsactive={dotsactive}
              />
            </div>
          </div>
        ) : (
          <ShimmerSocialPost type="both" />
        )}
      </div>
      {showEditModal && type == "post" ? (
        <Modals
          title={"Edit post"}
          openModal={showEditModal}
          modalSize="2xl"
          onClose={() => setShowEditModal(false)}
        >
          <div className="pt-4 post-wrapper max-h-[550px] w-full">
            <div className="post-media rounded-md w-full py-3">
              <Edit
                content={content}
                medias={media_urls}
                avatar={avatar}
                userId={userId}
                onClose={() => setShowEditModal(false)}
                postId={post_id}
                category={category}
              />
            </div>
          </div>
        </Modals>
      ) : null}
    </div>
  );
}

Post.propTypes = {
  userId: PropTypes.string,
  fullname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  postTime: PropTypes.string.isRequired,
  content: PropTypes.string,
  media_urls: PropTypes.arrayOf(
    PropTypes.shape({
      media_type: PropTypes.string.isRequired,
      media_url: PropTypes.string.isRequired
    })
  ).isRequired,
  avatar: PropTypes.string,
  post_id: PropTypes.string.isRequired,
  type: PropTypes.string,
  category: PropTypes.string
};

export default Post;
