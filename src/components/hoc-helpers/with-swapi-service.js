import React from 'react';
import { SwapiServiceConsumer } from '../swapi-service-context';

const withSwapiService = (mapMethodsToProps) => (Wrapped) => {
    return (props) => {
        return (
            <SwapiServiceConsumer>
                {
                    (SwapiService) => {
                        const serviceProps = mapMethodsToProps(SwapiService);

                        return (
                            <Wrapped
                                { ...props}
                                { ...serviceProps }/>
                        );
                    }
                }
            </SwapiServiceConsumer>
        );
    }
};

export default withSwapiService;