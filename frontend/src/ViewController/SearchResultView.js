import React from 'react';
import SearchResultPage from '../UIcomponents/Search/SearchResultPage';
import Background from '../Images/Searchresultbg.jpg';
import SearchService from "../Services/SearchService.js"
import UserService from "../Services/UserService.js"
import Navigation from "../UIcomponents/PageDesign/Navigation";

export class SearchResultView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            filteredData: [],
            error: undefined
        };
    }

    componentWillMount() {
        UserService.getCurrentUser().userType === 'admin' && this.props.history.push("/books");

        this.setState({
            loading: true
        });
        console.log(this.props);
        SearchService.getBooksByKeyword(this.props.location.search.split('=')[1])
            .then((data) => {
                this.setState({
                    data: data,
                    filteredData: [...data],
                    loading: false
                });
            }).catch((e) => {
            console.error(e);
        });

    }

    filterBook =() => {
        let filteredBooks = [];
        this.state.data.map(d => {
            filteredBooks.push(d)
        });
        this.setState({
            filteredData: filteredBooks,
            loading: false
        });
    };

    searchNewBook = () => {
        this.setState({
            data: [],
            filteredData: [],
        }, () =>
            SearchService.getBooksByKeyword(this.props.location.search.split('=')[1])
                .then((data) => {
                    console.log(data);
                    this.setState({
                        data: data,
                        filteredData: [...data],
                        loading: false
                    });
                    this.forceUpdate();
                }).catch((e) => {
                console.error(e);
            })
        );


    }

    render() {
        // if (this.state.loading) {
        //   return <h2>Loading</h2>
        //}
        return (
            <div>
                <Navigation/>
                <img src={Background} className="bg" alt={'Background'}/>
                <section>
                    <SearchResultPage
                        data={this.state.data}
                        filteredData={this.state.filteredData}
                        onFilter={() => this.filterBook()}
                        searchNewBook={() => this.searchNewBook()}
                        error={this.state.error}/>
                </section>
            </div>
        );
    }
}
