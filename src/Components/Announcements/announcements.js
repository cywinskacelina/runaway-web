import React from "react";
import axios from "axios";
import moment from "moment";

class Announcements extends React.Component {
    state = { 
        announcements: []
    }

    componentDidMount() {
        axios.get("https://runaway-practicum.herokuapp.com/api/announcement/get")
            .then((response) => {
                this.setState({ announcements: response.data });
            })
    }

    handleDelete = id => {
        axios.delete(`https://runaway-practicum.herokuapp.com/api/announcement/${id}`)
            .then((response) => {
                console.log(response.data);
                if (response.status === 200) {
                    const announcements = this.state.announcements.filter((a) => a._id !== id);
                    this.setState({ announcements });
                }
            });
    }

    render() { 
        return (
            <div style={{ marginTop: "50px" }}>
                <h1>Announcements</h1>
                <hr style={{ border: "1px lightgrey solid" }}></hr>
                {this.state.announcements.map(ann => (
                    <div key={ann._id} style={{position: "relative"}}> 
                        <header>
                            <h2 style={{ display: "inline-block" }}>{ann.name}</h2>
                            <span style={{ position: "absolute", left: "25px"}}>{moment(ann.date).format("MMMM DD, Y")}</span>
                        </header>
                        
                        <img src={ann.image} alt="img" style={{ height: "auto", maxWidth: "20%"}} onError={e => e.target.style.display="none"}/>
                        <p dangerouslySetInnerHTML={{ __html: ann.content }}></p>
                        <button type="button" 
                            style={{ position: "absolute", right: "150px", top: "50%", background: "#FF0000", borderRadius: "5px" }}
                            onClick={() => this.handleDelete(ann._id)}>
                            Delete
                        </button>
                        <hr style={{ border: "1px lightgrey solid" }}></hr>
                    </div>
                ))}
            </div>
        );
    }
}
 
export default Announcements;