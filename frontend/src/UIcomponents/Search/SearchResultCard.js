import React, { Component } from 'react';
import { Avatar } from "antd";
import { withRouter } from 'react-router-dom'


class SearchResultCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="md-block-centered" style={{
                marginTop: '20px',

                boxShadow: '10px 10px 20px gray',
                width: '70%',
                display: 'flex',
                paddingTop: '1%',
                paddingBottom: '1%',
                paddingLeft: '1%',
                background: 'white',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <div className="md-grid md-full-width">
                    <div className="md-cell md-cell--5">

                        <h3 style={{
                            color: 'gray',
                            fontWeight: 'bolder',
                            fontFamily: 'cursive'
                        }}>Title</h3>
                        <h2 style={{
                            marginTop: '0px',
                            color: 'black'
                        }}
                        >{this.props.book.title}</h2>
                        <h3 style={{
                            color: 'gray',
                            fontWeight: 'bolder',
                            fontFamily: 'cursive'
                        }}>Authors</h3>
                        <h2 style={{
                            color: 'black',
                        }}>{this.props.book.authors.toString()} </h2>
                        <h3 style={{
                            color: 'gray',
                            fontWeight: 'bolder',
                            fontFamily: 'cursive'
                        }}>DESCRIPTION</h3>
                        <h4 style={{ color: 'black',
                            fontWeight: 'bolder',
                            fontFamily: 'cursive' }}>{this.props.book.description?this.props.book.description.slice(0, 50) + '...' : ''}
                        </h4>
                    </div>
                    <div className="md-cell md-cell--3">
                        <div>
                        <Avatar 
                            src={this.props.book.avatar}
                        />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SearchResultCard);
