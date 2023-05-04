import React,{useState,useEffect} from 'react';
import millify from 'millify';
import { Link} from 'react-router-dom';
import Loader from './Loader';
import { Card,Row,Col,Input } from 'antd';
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrency = ({simplified}) => {

  const count=simplified?10:50;
  const {data:cryptosList,isFetching}=useGetCryptosQuery(count);
  const [cryptos,setCryptos]=useState([]);
  const [searchTerm,setSearchTerm]=useState('');
  


 

  useEffect(()=>{
    const filterData=cryptosList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filterData);
  },[cryptosList,searchTerm]);


  if(isFetching)return <Loader/>;
  return (
    <>
    {!simplified && (
      <div className='search-crypto'>
      <Input placeholder='Search Cryptocurrency' onChange={(e)=>setSearchTerm(e.target.value)}/>
    </div>
    )}
    <Row gutter={[32,32]} className='crypto-card-container'>
      {cryptos?.map((currency)=>(
        <Col xs={24} sm={12} lg={6} className='crypto-card'key={currency.uuid}>
          <Link to={`/crypto/${currency.uuid}`}>
            <Card 
            
            hoverable
            extra={<img className='crypto-image'alt='img' src={currency.iconUrl}/>}
            title={`${currency.rank}.${currency.name}`}>
              <p><strong>Price</strong> : {millify(currency.price)}</p>
              <p><strong>Market Cap</strong> : {millify(currency.marketCap)}</p>
              <p><strong>Daily Change</strong> : {millify(currency.change)}%</p>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
    {/* <Pagination defaultCurrent={1} total={500} /> */}
    </>
  )
}

export default Cryptocurrency
