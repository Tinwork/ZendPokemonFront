import Layout from '../component/layout';
import Map from '../../map/component/map';

/**
 * Home 
 *          Helper function which return the home layout 
 */
const home = () => {
    return Layout;
};

/**
 * Map 
 *          Helper function which return the Map layout 
 */
const map = () => {
    return Map;
};

/**
 * MenuContent 
 *      Object defining the menu content 
 */
export const menuContent = Object.assign(Object.create({}), {
  content: [{
    name: 'Home',
    link: '/',
    componentFunc: home
  },{
    name: 'Map',
    link: '/map',
    componentFunc: map
  }],
  footerMenu: '',
});
