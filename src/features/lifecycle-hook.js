import React from 'react';

export default class LifecycleHook extends React.Component {
    constructor(props) {
        console.log("constructor")
        super(props);
        this.state = {
            step: 1,    
            elems: [<div>Step: 1, rendered: Constructor</div>],
            visitedDidUpdate: false,
            visitedWillUpdate: false,
            visitedRender: false,
            componentReceivesProps: props.componentReceivesProps
        }
    }

    componentWillMount() {
        console.log("componentWillMount");
        let { step, elems } = this.state;
        step += 1;
        elems = elems.concat(<div>step: {step}, rendered: componentWillMount</div>);
        this.setState({ step, elems });
    }

    componentDidMount() {
        console.log("componentDidMount");
        let { step, elems } = this.state;
        step += 1;
        elems = elems.concat(<div>step: {step}, rendered: componentDidMount</div>);
        this.setState({ step, elems });
    }

    // Is going to get deprecated in newest versions.
    componentWillUpdate() {
        console.log("componentWillUpdate");
        let { step, elems } = this.state;
        step += 1;
        elems = elems.concat(<div>step: {step}, rendered: componentWillUpdate</div>);
        if(!this.state.visitedWillUpdate)
            this.setState({ step, elems, visitedWillUpdate: true});
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate");
        let { step, elems } = this.state;
        step += 1;
        elems = elems.concat(<div>step: {step}, rendered: componentDidUpdate</div>);
        if(!this.state.visitedDidUpdate) {
            this.setState({ step, elems, visitedDidUpdate: true});
        }
    }

    componentDidCatch(error, info) {
        console.log("componentDidCatch");
        let { step, elems } = this.state;
        step += 1;
        elems = elems.concat(<div>step: {step}, rendered: componentDidCatch</div>);
        this.setState({ step, elems });
    }

    // will be deprecated and getDerivedStateFromProps should be used.
    componentWillReceiveProps(nextProps, prevState) {
        console.log("componentWillReceiveProps");
        let { step, elems } = this.state;
        step += 1;
        elems = elems.concat(<div>step: {step}, rendered: componentWillReceiveProps</div>);
        this.setState({ step, elems });
    }

    // This div won't be visible as component will be unmounted.
    componentWillUnmount() {
        console.log("componentWillUnmount");
        let { step, elems } = this.state;
        step += 1;
        elems = elems.concat(<div>step: {step}, rendered: componentWillUnmount</div>);
        this.setState({ step, elems });
    }

    // Is static method. which will update the state with returned values.
    // If no updation is required. return null.
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("getDerivedStateFromProps");
        if(nextProps.componentReceivesProps !== prevState.componentReceivesProps) {
            let { step, elems } = prevState;
            step += 1;
            elems = elems.concat(<div>step: {step}, rendered: getDerivedStateFromProps</div>);
            return {componentReceivesProps: nextProps.componentReceivesProps, step, elems}
        }
        return null;
    }

    renderCalled() {
        console.log("render");
        if(!this.state.visitedRender) {
            let { step, elems, visitedRender } = this.state;
            step += 1;
            visitedRender = true
            elems = elems.concat(<div>step: {step}, rendered: render</div>);
            this.setState({ step, elems, visitedRender })
        }
    }

    render() {
        this.renderCalled();
        return(
            <React.Fragment>
                <button onClick={this.props.receiveProps}>update props </button>
                <p>Parent component state updated with callback: {this.props.componentReceivesProps ? "Yes" : "No"}</p>
                <div>{this.state.elems}</div>
            </React.Fragment>)
    }
}