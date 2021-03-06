import { Alert, Col, Container, Row, button } from "react-bootstrap";
import {
    useQuery
  } from "react-query";
import Lottie from "react-lottie";
import * as loadData from "../assets/loading.json";
import React, { useState, useEffect } from 'react';
import Button from "@restart/ui/esm/Button";
import Skeleton from "react-loading-skeleton";
import { animate } from "motion";

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
    const [cSelectedName, setcSelectedName] = useState('Por favor clique em Sortear');
    const [cSelectedLogo, setcSelectedLogo] = useState('https://images.discordapp.net/avatars/775806429541695498/0aff12d62dbc759c950751ba0f446f27.png?size=128');

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
                <h1> Carregando as criptomoedas ... Aguarde por favor! </h1>
                <Lottie options={defaultOptions} height={200} width={200}/>
                <Skeleton count={10} duration={2} /> 
            </div>
            </div>
    )
  
    if (error) return 'An error has occurred: ' + error.message

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    function truncate(str) {
        return str.length > 10 ? str.substring(0, 7) + "..." : str;
    }

    function randomPicker() {
        const random = getRandomIntInclusive(0,49);
        let selectedCryptoName = null;
        let selectedCryptoLogo = null;
        let selectedCryptoId = null;
        
        cData.find((crypto,index) => {
            if (index === random) {
                selectedCryptoName = crypto[1].name.toString();
                selectedCryptoLogo = `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto[1].id}.png`;
                selectedCryptoId = crypto[1].id;
                return [selectedCryptoName, selectedCryptoLogo];
            }
        })
        console.log('random picked name ->', selectedCryptoName);
        console.log('random picked img ->', selectedCryptoLogo);

        setcSelectedName(selectedCryptoName);
        setcSelectedLogo(selectedCryptoLogo);

        const cryptoElements = document.querySelectorAll('.crypto-element');
        
        animate(
            cryptoElements,
            { scale: 1.5 },
            { duration: 5 }
        ).finished.then( () => {
            animate(
                cryptoElements,
                { scale: 1.0 },
                { duration: 3 })
        })
    }

    return (
        <Container className="d-flex h-100 crypto-grid">
            <Row className="row justify-content-center align-self-center my-auto mx-auto">
                <Col className="col-12 col-sm-6 my-2 py-auto mx-auto col">
                    <Button className="btn btn-lg btn-outline-primary" onClick={randomPicker}> Sortear </Button>
                </Col>
                <Col className="col-12 col-sm-6 my-2 py-auto mx-auto col">
                    <span className="crypto-selected">
                        <img 
                                className="img-thumbnail border-0 rounded-circle crypto-logo"
                                alt="crypto selected"
                                src={cSelectedLogo} 
                            />
                        <b>{cSelectedName ?? ''}</b>
                    </span>
                </Col>
                { cData.map((crypto, index) => {
                    return (
                        <Col className={ crypto[1].name == cSelectedName ? 'crypto-element col-4 col-sm-3 col-md-2 col-lg-1 p-4 border border-danger' : 'crypto-element col-4 col-sm-3 col-md-2 col-lg-1 p-4'} id={crypto[1].id} key={crypto[1].id}> 
                            <button type="button" class="btn bg-transparent border-0" data-toggle="tooltip" data-placement="bottom" title={crypto[1].name}>
                                <p className="text-black mb-0" style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                    { truncate(crypto[1].symbol) } 
                                </p>
                                <img 
                                    className="img-thumbnail border-0 rounded-circle crypto-logo"
                                    alt="crypto img - crypto-slot-machine"
                                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto[1].id}.png`} 
                                />
                            </button>
                        </Col>  
                    );
                })}
            </Row> 
        </Container>
    )
  }
 
  export default FetchCryptoData;