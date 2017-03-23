import { utils as _ , react as React} from '../../../utils/util.js'

// Load the dependencies 
const dependencies = _.initDependencies()
console.log(dependencies)
/**
 *  Footer 
 *      Markup of the Footer of the App
 */
export default class Footer extends React.Component {
    /**
     * constructor 
     * @param {Object} props 
     */
    constructor(props){
        super(props)
        this.content = props.content
    }

    /**
     * Render 
     *      Render the template 
     */
    render(){
        return (
            <div>
                <p>Jei fiestar !!</p>
            </div>
        )
    }
}