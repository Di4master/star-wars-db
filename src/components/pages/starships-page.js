import React from 'react';
import { StarshipList } from '../sw-components';

const StarshipsPage = ({ history }) => {

    return (
        <StarshipList
            onItemSelected={(id) => history.push(id)} />
    );
};

export default StarshipsPage;