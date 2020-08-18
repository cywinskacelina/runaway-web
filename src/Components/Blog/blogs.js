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
    const pageCount = Math.ceil(this.state.total/20);
    
    const blogStyle = {
        marginTop: "20px",

        width: "1050px",
        height: "auto",

        background: "#E3F1FC",
        borderRadius: "10px"
    }


    return (
        <div>
          <div className="row d-flex justify-content-center">
              { this.state.blogs.map(blog => (
                  <div key={blog._id} style={ blogStyle }> 
                        <h1 style={{ position: "relative", left: "25px", top: "15px", textAlign: "left" }}>{blog.title}</h1>
                        <h4 style={{ marginRight: "25px", textAlign: "right" }}>{blog.author}</h4>
                        <h4 style={{ marginRight: "25px", textAlign: "right" }}>{moment(blog.date).format("MMMM DD, Y")}</h4>
                        <img src={blog.imageURL} alt="img" style={{ height: "300px", width: "450px"}} onError={e => e.target.style.display="none"}/>
                        <p style={{ textAlign: "left",  marginLeft: "25px", marginTop: "15px"}} dangerouslySetInnerHTML={{ __html: blog.content }}/>
                </div>
              )) }
          </div>
        
        <ReactPaginate 
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={(e) => this.handlePageClick(e.selected)}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
      </div>
    );
  }
}

export default Blogs;
