import React from 'react';


const FragmentFeature = () => {
    return(
      <React.Fragment>
        <div> unnecessary parent div </div>
        <div> another parent div </div>
      </React.Fragment>
    )
}

export default class extends React.Component {
    render() {
        return(
            <React.Fragment>
                {<FragmentFeature/>}
                <p>
                    Lets you add list of childrens without extra nodes to DOM.
                    Ex: Helps in avoiding extra wrappingtags.
                </p>
            </React.Fragment>    
        )
    }
}