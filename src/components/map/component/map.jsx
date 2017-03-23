import { utils as _, react as React, APIFacade as API } from '../../../utils/utils';

export default class Map extends React.Component {
    /**
     * 
     * @param {Object} props 
     */
    constructor(props) {
        super(props);
        // Call this this.api._fetch() to make a request toward the back-end
        this.api = API;
    }

    /**
     * Component Did Mount 
     *      Treat datas
     */
    componentDidMount(){
        
    }

    /**
     * Render 
     *      Render the jsx template
     */
    render() {
        return (
            <div className="map">
                <p>Map</p>
            </div>
        )
    }
}