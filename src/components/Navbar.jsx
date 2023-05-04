import React,{useState,useEffect} from 'react';
import { Button,Menu,Avatar,Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { HomeOutlined,MoneyCollectOutlined,BulbOutlined,FundOutlined,MenuOutlined } from '@ant-design/icons';
import icon from "../images/logo.png"

const items=[
  {
    label:'Home',
    key:'/',
    icon:<HomeOutlined/>,
  },
  {
    label:'Cryptocurrency',
    key:'/cryptocurrency',
    icon:<FundOutlined/>,
  },
  {
    label:'News',
    key:'/news',
    icon:<BulbOutlined/>,
  }
]

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [current, setCurrent] = useState('');
  const navigate = useNavigate();

  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={icon} size="large"/>
        <Typography.Title level={1} className="logo">
            <Link to="/">CryptoWorld</Link>
        </Typography.Title>
        <Button className="menu-control-container"onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined/></Button>
      </div>
      {activeMenu && (
        <Menu items={items}onClick={onClick} style={{color:'white',backgroundColor:'rgb(0, 21, 41)'}} selectedKeys={[current]}/>
      )}
    </div>
  )
}

export default Navbar
