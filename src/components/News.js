import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            disableNext: false,
            loading: false
        }
    }

    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d5060dce45d14c6aa86ceb2dded05173&page=${this.state.page}
        &pageSize=${this.props.pageSize}&category=${this.props.category}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(70);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    handleNext = async () => {

        if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
            this.updateNews();
            this.setState({
                page: this.state.page + 1,
                disableNext: (this.state.page + 1 === Math.ceil(this.state.totalResults / this.props.pageSize))
                    ? true : false,
                loading: false
            });
        } else {
            this.setState({
                disableNext: true
            });
        }
    }

    handlePrev = async () => {
        this.updateNews();
        this.setState({
            page: this.state.page - 1,
            disableNext: false,
            loading: false
        });
    }

    fetchMoreData = async() => {
        this.setState({loading: true});
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d5060dce45d14c6aa86ceb2dded05173&page=${this.state.page+1}
        &pageSize=${this.props.pageSize}&category=${this.props.category}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false,
            page: this.state.page + 1
        });
      };
    render() {
        return (
            <>
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length} //This is important field to render the next data
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.totalResults}
                    loader={this.state.loading && <Spinner />}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }

                    style={{overflowX: 'hidden'}}
                    // below props only if you need pull down functionality
                    refreshFunction={this.updateNews}
                    pullDownToRefresh
                    pullDownToRefreshThreshold={50}
                    pullDownToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                    }
                    releaseToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                    }
                >
                    <div className='row my-3'>
                        {this.state.articles.map((ele) => {
                            return <div className='col-sm-4 my-3' key={ele.url}>
                                <NewsItem title={ele.title} desc={ele.description}
                                    image={ele.urlToImage} url={ele.url} publishedAt={ele.publishedAt}
                                    author={ele.author} source={ele.source.name} />
                            </div>
                        })}
                    </div>

                </InfiniteScroll>


                {/* <div className="container d-flex justify-content-center">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-primary mx-4" onClick={this.handlePrev}>&larr; Previous</button>
                    <button type="button" className="btn btn-outline-dark mx-4">{this.state.page}</button>
                    <button type="button" disabled={this.state.disableNext} className="btn btn-primary mx-4" onClick={this.handleNext}>Next &rarr;</button>
                </div> */}
            </>
        );
    }
}