import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Post from "../components/post/Post";
import Profile from "../components/profile/Profile";
import PostSkeleton from "../util/PostSkeleton";

import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";

class homepage extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.data;
    let recentPostsJSX =
      !loading && Array.isArray(posts) ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>
          <PostSkeleton />
        </p>
      );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          <p>{recentPostsJSX}</p>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

homepage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getPosts,
};
export default connect(mapStateToProps, mapActionsToProps)(homepage);
