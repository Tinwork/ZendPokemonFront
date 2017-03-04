import { pokemon } from '../test/pokemon'
import { utils as _ , react as React} from '../../../utils/util.js'
import Card from '../../card/component/card.jsx' 

export default class Header extends React.Component {
    /**
     * Set Pokemon 
     *      Set pokemon in the view 
     */
    setPokemon(){
        let spicies = pokemon.spicies.map((poke) => {
            return <li>{poke.name}</li>
        })

        return (
            <ul>{spicies}</ul>
        )
    }

    /**
     *  Other Component
     */
    otherComponent(){
        return (
            <div>lolo</div>
        )
    }

    /**
     *  Function that must be here in order to RENDER the element 
     */
    render(){
        return (
            <div>
                <h1>Hello how are you ?!</h1>
                <Card />
                <div>
                    {this.setPokemon()}
                </div>
                <p>test</p>
                {this.otherComponent()}
            </div>
        )
    }
}