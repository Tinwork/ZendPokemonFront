import { utils as _, react as React} from '../../../utils/util.js'
const dependencies = _.initDependencies()

// Create class which will define a card 
export default class Card extends React.Component {
    /**
     *  Constructor 
     *  @param {Object} props 
     */
    constructor(props){
        super(props)
    }
    /**
     *  Render 
     *      Render a component
     */
    render() {
        return (
            <div>
                <img class="card-img-top" src="..." alt="Card image cap"/>
                <div class="card-block">
                    <h4 class="card-title">Card title</h4>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        )
    }
}

