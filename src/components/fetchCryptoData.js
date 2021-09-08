import { Alert, Col, Container, Row } from "react-bootstrap";
import {
    useQuery
  } from "react-query";
import Lottie from "react-lottie";
import * as loadData from "../assets/loading.json";
import React, { useState, useEffect } from 'react';

//Lottie configs
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

const FetchCryptoData = () => {
    const [cData, setcData] = useState([]);
    const { isLoading, error, data } = useQuery('repoData', async () =>
        await fetch('/api/coinmarketcap/cryptocurrency')
            .then(resp => resp.json())
            .then(result => {
                const dataConverted = Object.keys(result.cryptoData.data).map((key) => [Number(key), result.cryptoData.data[key]]);
                setcData(dataConverted);
                return cData;
            })
            .catch(error => {
                Alert(error);
                console.log(error);
            }), 
        {
            staleTime: 3600000, // only eligible to refetch after 3600 seconds ~60min
        }
    )
    
    
  
    if (isLoading) return (
        <div className="row">
            <div className="col-12 text-center">
                <h1> Loading a bunch of cryptos ... Wait! </h1>
                <Lottie options={defaultOptions} height={200} width={200}/>
            </div>
            </div>
    )
  
    if (error) return 'An error has occurred: ' + error.message

    return (
        <Container className="d-flex h-100">
            <Row className="justify-content-center align-self-center my-auto mx-auto">
                { cData.map((crypto, index) => {
                    return (
                        <Col> 
                            <span>{ crypto[1].name } </span>
                            <img 
                                className="img-thumbnail border-0 rounded-circle"
                                alt="crypto img - crypto-slot-machine"
                                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto[1].id}.png`} 
                            />
                        </Col>  
                    );
                })}
            </Row> 
        </Container>
    )
  }
 
  export default FetchCryptoData;