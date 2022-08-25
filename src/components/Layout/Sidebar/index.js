import './style.css';
import Col from 'react-bootstrap/Col';
import SideHeaderComp from './SideHeaderComp';
import SideNavComp from './SideNavComp';

const Sidebar = () => {
    return (
        <Col xl={1} className='p-0 sidebar'>
            <div className='d-flex flex-column justify-content-between p-3 h-100'>
                <SideHeaderComp/>
                <SideNavComp/>
            </div>
		</Col>
    );
}

export default Sidebar;
