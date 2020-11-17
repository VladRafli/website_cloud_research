import React, { useEffect, useState } from "react";
import "../css/style.css";
import axios from "axios";

export default class MainMenu extends React.Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    this.getBlogPost();
  }

  getBlogPost() {
    axios
      .get("http://localhost:5000/get")
      .then((res) => {
        const data = res.data.result;
        this.setState({ posts: data });
        console.log("Data has been recieved!");
        console.log(data);
      })
      .catch(() => {
        alert("Error on retrieving data!");
      });
  }

  displayFeaturedBlogPost(posts) {
    if (!posts.length) return null;

    return posts.map((post, index) => {
      if (index === 0) {
        return (
          <article className="featured-post-content" key={index}>
            <header className="featured-post-title">
              <h1>{post.post_title}</h1>
            </header>
            <section className="featured-post-body">
              <figure>
                <img
                  src={decodeURIComponent(post.post_image)}
                  alt="Image Alt"
                />
                <figcaption>Image Caption</figcaption>
              </figure>
              <div>
                <p>{post.post_body}</p>
                <a href="#">Read more...</a>
              </div>
            </section>
            <footer className="featured-post-footer">
              <pre>Date: {post.post_date_posted}</pre>
              <pre>By: {post.post_author}</pre>
            </footer>
          </article>
        );
      }
    });
  }

  displayNormalBlogPost(posts) {
    let c = "normal-post-body normal-post-";
    if (!posts.length) return null;

    return posts.map((post, index) => {
      if (index !== 0) {
        return (
          <article className="normal-post-content" key={index}>
            <header className="normal-post-title">
              <h1>{post.post_title}</h1>
            </header>
            <section className={c.concat(index + 1)}>
              <figure>
                <img
                  src={decodeURIComponent(post.post_image)}
                  alt="Image Alt"
                />
                <figcaption>Image Caption</figcaption>
              </figure>
              <div>
                <p>{post.post_body}</p>
                <a href="#">Read more...</a>
              </div>
            </section>
            <footer className="normal-post-footer">
              <pre>Date: {post.post_date_posted}</pre>
              <pre>By: {post.post_author}</pre>
            </footer>
          </article>
        );
      }
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
