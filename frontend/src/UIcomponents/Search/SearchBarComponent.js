import React from 'react';
import { Autocomplete, Button } from 'react-md';
import SearchService from "../../Services/SearchService";
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify';
import BookService from "../../Services/BookService";
class SearchBarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterType: Autocomplete.fuzzyFilter,
            data: [],
            searchValue: ""
        }
    }

    componentDidMount() {
        SearchService.autoCompleteKeyWords()
            .then((data) => {
                this.setState({
                    data: [...data]
                });
            }).catch((e) => {
            console.error(e);});
    }

    searchBySearchBar =() =>{
        if(this.state.searchValue === '') {
            toast.error('Please input a book or author name');
            return;
        }

        this.props.history.push(`/searchResult?query=${this.state.searchValue}`)

        if(this.props.searchNewBook){
            this.props.searchNewBook();
            return;
        }
    };
    render() {
        return (
            <div className="md-grid md-block-centered" style={Object.assign({background:'white', opacity:'90%'}, this.props.style)}>
                <Autocomplete style={{width:'300px'}}
                    id="search-bar"
                    label="Search Book or Author Name"
                    placeholder="Search"
                    data={this.state.data}
                    onAutocomplete={(value) => this.setState({searchValue: value})}
                    onChange={(value) => this.setState({searchValue: value})}
                    filter={this.state.filterType}
                />
                <Button raised primary  style={{
                            height: '53.63px',
                            fontSize: '15px',
                            color: 'white',
                            marginTop: '8px'
                        }} onClick={() => this.searchBySearchBar()}
                        >Search</Button>
            </div>
        );
    }
}
export default withRouter(SearchBarComponent);
