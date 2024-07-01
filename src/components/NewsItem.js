import React, { Component } from "react";

export default class NewsItem extends Component {

    render() {
        let { title, desc, image, url, publishedAt, author, source } = this.props;
        return (
            <div className="card">
                <span class="position-absolute right-0 badge rounded-pill bg-danger"
                style={{display:'flex', justifyContent:'flex-end'}}>
                    {source}
                    <span class="visually-hidden">unread messages</span>
                </span>
                <img src={!image ? "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg" : image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{desc}</p>
                    <p className="card-text fw-light">by {author} on {new Date(publishedAt).toDateString()}</p>
                    <a href={url} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>
        );
    }
}