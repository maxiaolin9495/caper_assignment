import React from "react";
import Background from "../Images/Homepage.jpg";
import DynamicContentTable from "../UIcomponents/BookTable/DynamicContentTable";
import Navigation from "../UIcomponents/PageDesign/Navigation";

export class BookTableView extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            books: [],
        };
    }

    render() {
        setTimeout(() => window.scrollTo(0, 0), 150);
        return (
            <div>
                <Navigation/>
                <section>
                    <img src={Background} alt={"A Background Picture"} className="bg"/>
                    <DynamicContentTable
                        onSubmit={(user) => this.registerWrapper(user)}
                        error={this.state.error}
                        books={this.state.books}
                    />
                </section>
            </div>

        )

    }
}
