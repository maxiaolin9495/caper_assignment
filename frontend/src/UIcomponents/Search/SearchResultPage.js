import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import SearchResultCard from "./SearchResultCard";
import SearchBarComponent from "./SearchBarComponent";


class SearchResultPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            value: [],
        }
    }

    onChange = (event) => {
        this.setState({
            value: [...event.target.value]
        });
    };

    componentWillReceiveProps(props, content) {
        this.setState({
            cards: props.filteredData.map(d => {
                return (<SearchResultCard
                    key={d.id}
                    book={d}/>)
            })
        });
        this.setState({
        })
    }

    renderCards = () => {
        this.props.data.map(d => {
            return (<SearchResultCard
                key={d.id}
                tutor={d} />
            )
        });
    };
    render() {

        return (
            <div style={{ marginBottom: "40px" }}>
                <div className="md-block-centered" style={{
                    flexDirection: 'row',
                    width: '74%',
                    height: '100px',
                    padding: '20px',
                    paddingBottom: '20px'
                }}>

                </div>

                <div style={{
                    position: 'relative',
                }}>
                    {this.state.cards}
                </div>
                <SearchBarComponent
                    style={{position:'absolute',
                        right: '15.5%',
                        top: '8%'
                    }}
                    searchNewBook={() => this.props.searchNewBook()}
                />
            </div>
        );
    }
}

export default withRouter(SearchResultPage);

