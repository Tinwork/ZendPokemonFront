import { react as React } from './utils/utils';
import '../public/css/style.scss';
import Layout from './components/layout/component/layout';
import Map from './components/map/component/map';

class App extends React.Component {
  render() {
    return (
      <div>
        <Layout />
      </div>
    );
  }
}

export default App;
