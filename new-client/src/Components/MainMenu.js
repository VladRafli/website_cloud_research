import React, { useEffect, useState } from "react";
import "../css/style.css";
import axios from "axios";

export default class MainMenu extends React.Component {
  state = {
    posts: []
  };

  componentDidMount() {
    this.getBlogPost();
  }

  getBlogPost() {
    axios
      .get("http://localhost:5000/get")
      .then((res) => {
        const data = res.data;
        this.setState({ posts: data });
        console.log("Data has been recieved!");
        console.log(data);
      })
      .catch(() => {
        alert("Error on retrieving data!");
      });
  }

  displayFeaturedBlogPost(posts) {
    let spanRes = posts.post_body;
    // spanRes.substring(0, 1)
    let bodyRes = posts.post_body;
    // bodyRes.substring(1, posts.post_body.length)
    let datePosted = posts.post_date_posted;
    // datePosted.toDateString()
    if (!posts.length) return null;

    return posts.map((post, index) => {
      return (
        <article className="featured-post-content" key={index}>
          <header className="featured-post-title">
            <h1>Featured Title!</h1>
          </header>
          <section className="featured-post-body">
            <figure>
              <img src={decodeURIComponent(post.post_image)} alt="Image Alt" />
              <figcaption>Image Caption</figcaption>
            </figure>
            <div>
              <p>
                <span>{spanRes}</span>
                {bodyRes}
              </p>
              <a href="#">Read more...</a>
            </div>
          </section>
          <footer className="featured-post-footer">
            <pre>Date: {datePosted}</pre>
            <pre>By: {post.post_author}</pre>
          </footer>
        </article>
      );
    });
  }

  displayNormalBlogPost(posts) {
    let c = "normal-post-body normal-post-";
    let spanRes = posts.post_body;
    // spanRes.substring(0, 1)
    let bodyRes = posts.post_body;
    // bodyRes.substring(1, posts.post_body.length)
    let datePosted = posts.post_date_posted;
    // datePosted.toDateString()
    if (!posts.length) return null;

    return posts.map((post, index) => {
      return (
        <article className="normal-post-content" key={index}>
          <header className="normal-post-title">
            <h1>Post Title!</h1>
          </header>
          <section className={c.concat(index + 1)}>
            <figure>
              <img src={decodeURIComponent(post.post_image)} alt="Image Alt" />
              <figcaption>Image Caption</figcaption>
            </figure>
            <div>
              <p>
                <span>{spanRes}</span>
                {bodyRes}
              </p>
              <a href="#">Read more...</a>
            </div>
          </section>
          <footer className="normal-post-footer">
            <pre>Date: {datePosted}</pre>
            <pre>By: {post.post_author}</pre>
          </footer>
        </article>
      );
    });
  }

  render() {
    console.log(this.state.posts);
    return (
      <main className="main-menu">
        <header className="banner">
          <div className="banner-filter">
            <h1>Sunib Blog</h1>
            <p>Knowledge sharing and Fun blogging!</p>
          </div>
        </header>
        <section className="content">
          <section className="featured-post">
            <header className="featured-post-header">
              <h1>Featured Post</h1>
            </header>
            {this.displayFeaturedBlogPost(this.state.posts)}
          </section>
          <section className="normal-post">
            <header className="normal-post-header">
              <h1>New Posts</h1>
            </header>
            {this.displayNormalBlogPost(this.state.posts)}
          </section>
        </section>
      </main>
    );
  }
}
