import * as React from "react";
import {
    Route,
} from "react-router-dom";
import hoistStatics from "hoist-non-react-statics";

/**
 * Wrapping a Component in MobX's `observer` triggers failure in
 * react-router's `Route`.
 *
 * This simply wraps your wrapped Component to make react-router happy.
 *
 * Usage:
 *      <Route component={ComponentWrapper(Home)} exact path="/" />
 *
 * @see: https://github.com/ReactTraining/react-router/issues/4354
 */

const ComponentWrapper = (Component: any) => {
    const C = (props: any) => {
        const {wrappedComponentRef, ...remainingProps} = props;

        return (
            <Route
                children={routeComponentProps => (
                    <Component
                        {...remainingProps}
                        ref={wrappedComponentRef}
                    />
                )}
            />
        );
    };

    C.displayName = `withRouter(${Component.displayName || Component.name})`;
    C.WrappedComponent = Component;

    return hoistStatics(C, Component);
};

export default ComponentWrapper;
