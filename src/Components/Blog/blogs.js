import React from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import '../../styles/blogs.css'
import moment from "moment";

class Blogs extends React.Component {
  state = {
    blogs: [],
    total: null,
    currentPage: 1
  };

  componentDidMount() {
    this.handlePageClick(1);
  }

  handlePageClick = page => {
    axios.get(`https://runaway-practicum.herokuapp.com/api/volunteer/blog/get/${page}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          blogs: response.data.blogs,
          total: response.data.totalBlogs,
          currentPage: response.data.page
        })
        console.log(this.state.total);
      })
  }

  render() {
    const pageCount = Math.ceil(this.state.total / 20);

    const blogStyle = {
      marginTop: "20px",

      width: "1050px",
      height: "auto",

      background: "#E3F1FC",
      borderRadius: "10px"
    }


    return (
      <div style={{ maxHeight: "90vh", overflow: "scroll" }}>
        <div className="row d-flex justify-content-center">
          {this.state.blogs.map(blog => (
            <div key={blog._id} style={blogStyle}>
              <div style={{left: "30%",width:"100%",textAlign:"middle"}}>
                <h2 style={{ position: "relative",marginRight: "15px", textAlign: "left", display: "inline-block" }}>{blog.title}</h2>
                <h5 style={{ marginRight: "25px", textAlign: "right", display: "inline-block",fontWeight:"300" }}>{blog.author}</h5>
              </div>
              <h4 style={{ marginRight: "25px", textAlign: "right" }}>{moment(blog.date).format("MMMM DD, Y")}</h4>
              <img src={blog.imageURL} alt="img" style={{ height: "100px", display: "inline-block", justifyItems: "left", verticalAlign: "top" }} onError={e => e.target.style.display = "none"} />
              <p style={{ textAlign: "left", marginLeft: "25px", marginTop: "15px", display: "inline-block", maxHeight:"100px",overflow:"hidden"}} dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          ))}
        </div>

        <ReactPaginate
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(e) => this.handlePageClick(e.selected)}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} />
      </div>
    );
  }
}

export default Blogs;
