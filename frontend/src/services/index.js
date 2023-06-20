import { api_url, headerToken, memberType, user, userEmail, userId} from "./config";
import { fetchPosts, fetchPostsPrivate } from "./fetchPosts";
import { getAvatar } from "./getAvatar";
import { getImgPost } from "./getImgPost";
import { getConments, newConment } from "./getConments";
import { delConment, editConment, replyConment } from "./conmentsActions";
import {setLikes, getLikes} from './likes'
import {logout} from './logout'
import {deleteUser} from './deleteUser'
import {confirmEmail} from './confirm'

export {
  api_url,
  memberType,
  user,
  userEmail,
  userId,
  fetchPosts,
  fetchPostsPrivate,
  getAvatar,
  getImgPost,
  headerToken,
  getConments,
  newConment,
  delConment,
  editConment,
  replyConment,
  setLikes,
  getLikes,
  logout,
  deleteUser,
  confirmEmail
};
