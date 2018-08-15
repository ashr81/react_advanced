import React from 'react';
import FragmentFeature from './features/fragment-feature';
import LifecycleHook from './features/lifecycle-hook';
import { Route } from 'react-router-dom';

export default class Main extends React.Component {
    state = {
        componentReceivesProps: false
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    Content:
                    Helps in quick look of guides to advanced react features.
                </div>
                <div>
                    <Route path="/fragment" render={() => (
                        <FragmentFeature />)}
                    />
                </div>
                <div>
                    <Route path="/lifecycle_hook" render={(props) => (
                        <LifecycleHook {...this.state} 
                            receiveProps={() => {
                            this.setState({ componentReceivesProps: true })
                        }}
                        />)}
                    />
                </div>
            </React.Fragment>
        );
    }
}