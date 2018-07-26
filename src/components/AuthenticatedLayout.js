// Libraries
import React from "react";

// Components
import Footer from "components/Footer.js";
import Header from "components/Header.js";

class AuthenticatedLayout extends React.Component{
    constructor( props ){
        super( props );

        this.state = {};
    };

    render(){
        return(
            <div>
                <div>
                    <Header/>
                    { this.props.children }
                    <Footer/>
                </div>
            </div>
        );
    };
};

export default AuthenticatedLayout;