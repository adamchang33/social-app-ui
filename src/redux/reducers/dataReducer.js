import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  CREATE_POST,
  SET_POST,
  SUBMIT_COMMENT,
} from "../types";

const initialstate = {
  posts: [],
  post: {},
  loading: false,
};

export default function (state = initialstate, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      console.log(`action payload: ${action.payload.likeCount}`);
      console.log(`state post: ${state.post}`);
      if (state.post.postId === action.payload.postId) {
        return {
          ...state,
          post: action.payload,
        };
      }
      return {
        ...state,
      };
    case DELETE_POST:
      let index2 = state.posts.findIndex(
        (post) => post.postId === action.payload
      );
      state.posts.splice(index2, 1);
      return {
        ...state,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload.resPost, ...state.posts],
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
        },
      };
    default:
      return state;
  }
}
