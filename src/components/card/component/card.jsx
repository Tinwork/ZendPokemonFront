import { utils as _, react as React, APIFacade as API } from '../../../utils/utils.js'
const dependencies = _.initDependencies()

// Create class which will define a card 
export default class Card extends React.Component {
    /**
     *  Constructor 
     *  @param {Object} props 
     *  @private
     */
    constructor(props) {
        super(props)
        this.api = API;
        this.state = {
            pokemonData : []
        };
        // get the pokemon down here...
    }

    /**
     * Component Did Mount 
     *      Call before the render 
     */
    componentDidMount(){
        // Get the data from the JSON 
        this.api._fetch('data/pokemon.json','GET')
            .then(res => {
                let pokemonList = res.region.pokemon.map((poke, idx) => {
                    return (
                        <div key={idx}>
                            <h2>{poke.name}</h2>
                            <p>{poke.type}</p>
                        </div>
                    )
                });

                this.setState(prevState => ({
                    pokemonData : pokemonList
                }));
            })
            .catch(err => {
                console.log(err);
            });
    }

    /**
     *  Render 
     *      Render a component
     */
    render() {
        return (
            <div className="card">
                <div className="pokemonList">{this.state.pokemonData}</div>
            </div>
        )
    }
}