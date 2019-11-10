import React, {Component} from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button';

import './item-details.css';


const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
};

export {
    Record
};

export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item: null,
        updating: false,
        image: null
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId ||
            this.props.getData !== prevProps.getData ||
            this.props.getImageUrl !== prevProps.getImageUrl) {
            this.setState({updating:true});
            this.updateItem();
        }
    }

    updateItem() {
        
        const { itemId, getData, getImageUrl } = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    image: getImageUrl(item)
                });
            })
            .finally(() => {this.updating = false;
                this.setState({updating:false});
            })
        
    }
    
    render() {

        const { item, image } = this.state;
        
        if (!item) {
            return <span>Select a item from a list</span>;
        }

        const spinner = this.state.updating ?
            <Spinner /> :
            null;
            
        const content = !this.state.updating ?
            <DetailsView
                item={item}
                image={image}
                childeren={this.props.children}/> :
            null;

        return (
            <div className="person-details card">
                {spinner}
                {content}
            </div>
        );
    }
}

const DetailsView = ({item, image, childeren}) => {
    const { name } = item;

    return (
        <React.Fragment>
            <img className="person-image"
            src={image}
            alt="character" />

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(childeren, (child) => {
                            return React.cloneElement(child, { item });
                        })
                    }
                </ul>
                <ErrorButton />
            </div>
        </React.Fragment>
    );
};