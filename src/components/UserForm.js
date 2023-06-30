import React from "react";


//this will be a stateless function component

const UserForm = (props) => {//in order to acces the props of this component we need to give an argument called props// on the props we have this getUser function available

    return (
        <form onSubmit={props.getUser}> 
            <input style={{margin:"20px auto", display:"block"}}type="text" name="username"/>
            <button> Submit</button>

        </form>
    );
}

export default UserForm;