import { utils as _, react as React, menuContent} from '../../../utils/util';
import Card from '../../card/component/card';

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
                <li key={idx}><a href='{data.link}' key={idx}>{data.name}</a></li>
            )
        })

        return content 
    }
    /**
     * Nav Bar 
     *      Set the nav bar to the layout 
     */
    navBar() {
        let content = this.navBarContent()
        console.log(this.state.isSideBarClose)
        return (
            <div className={`navbar ${this.state.isSideBarClose}`}>
                <div>
                    {content}
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
                <i className={`fa fa-bars ${this.state.isSideBarClose}`} aria-hidden="true" onClick={this.handleToggle}></i>
                {navbar}
                <Card />
            </div>
        )
    }
}