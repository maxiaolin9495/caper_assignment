import React from "react";
import Background from "../Images/Homepage.jpg";
import RegisterTab from "../UIcomponents/PageDesign/Register";
import {register} from "../Services/RegisterService"
import { toast } from 'react-toastify';
import Navigation from "../UIcomponents/PageDesign/Navigation";

export class RegisterView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    registerWrapper = (user) => {
        register(user.email, user.password, user.userType)
            .then(() => {
                toast.success('Registration succeeded');
                this.props.history.push('/');
            }).catch((e) => {
            toast.error('Registration failed, please check your input');
            this.setState({
                error: e
            });
        })
    };

    render() {
        setTimeout(() => window.scrollTo(0, 0), 150);
        return (
            <div>
                <Navigation/>
                <section>
                    <img src={Background} alt={"A Background Picture"} className="bg"/>
                    <RegisterTab onSubmit={(user) => this.registerWrapper(user)} error={this.state.error}/>
                </section>
            </div>

        )

    }
}
