import { utils as _, react as React} from '../../../utils/utils';
import { menuContent } from '../data/menu';
import Card from '../../card/component/card';
import Map from '../../map/component/map'

// import the router 
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

export default class Layout extends React.Component {
    /**
     * Constructor 
     * @param {Object} props 
     */
    constructor(props){
        super(props)
        this.state = {isSideBarClose : true}
        // Bind the event handler with the class scope 
        this.handleToggle = this.handleToggle.bind(this)
    }

    /**
     * Handle Toggle 
     *          Control the flow of the toggle 
     *          Set the state (no mutation .. react required pure function)
     */
    handleToggle(){
        this.setState(prevState => ({
            isSideBarClose: !prevState.isSideBarClose
        }))
    }

    /**
     *  Nav Bar Content 
     *        Build the content of the nav bar 
     */
    navBarContent() {
        let content = menuContent.content.map((data, idx) => {
            return (
                <li key={idx}><Link to={data.link}>{data.name}</Link></li>
            )
        })

        return content 
    }

    /**
     * MakeRouter
     */
    makeRouter(){
        let route = menuContent.content.map((data, idx) => {
            return (
                <Route path="{data.link}" key={idx} handler={data.componentFunc}/>
            )
        })

        return route 
    }
    /**
     * Nav Bar 
     *      Set the nav bar to the layout 
     */
    navBar() {
        let content = this.navBarContent()
        let routeData = this.makeRouter()
        return (
            <div className={`navbar ${this.state.isSideBarClose}`}>
                <div>
                    <Router>
                        <div>
                            {content}
                            {routeData}
                        </div>
                    </Router>
                </div>
            </div>
        )
    }
    /**
     *  Render 
     *          Render the basic layout of the website 
     */
    render(){
        let navbar = this.navBar()
        return (
            <div>
                <Map>

                </Map>
                <i className={`fa fa-bars ${this.state.isSideBarClose}`} aria-hidden="true" onClick={this.handleToggle}></i>
                {navbar}
                <Card />
            </div>
        )
    }
}