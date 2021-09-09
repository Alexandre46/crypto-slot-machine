import { Alert, Col, Container, Row } from "react-bootstrap";
import {
    useQuery
  } from "react-query";
import Lottie from "react-lottie";
import * as loadData from "../assets/loading.json";
import React, { useState, useEffect } from 'react';
import Button from "@restart/ui/esm/Button";

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
    const [cSelectedName, setcSelectedName] = useState('Por favor clique em gerar');
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

        cData.find((crypto,index) => {
            if (index === random) {
                selectedCryptoName = crypto[1].name.toString();
                selectedCryptoLogo = `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto[1].id}.png`
                return [selectedCryptoName, selectedCryptoLogo];
            }
        })
        console.log('random picked name ->', selectedCryptoName);
        console.log('random picked img ->', selectedCryptoLogo);

        setcSelectedName(selectedCryptoName);
        setcSelectedLogo(selectedCryptoLogo);
    }

    return (
        <Container className="d-flex h-100 crypto-grid">
            <Row className="row justify-content-center align-self-center my-auto mx-auto">
                <Col className="col-12 col-lg-6 my-2 py-auto mx-auto col">
                    <Button className="btn-primary btn-lg" onClick={randomPicker}> QUAL COMPRAR ? </Button>
                </Col>
                <Col className="col-12 col-lg-6 my-2 py-auto mx-auto col">
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
                        <Col className={ crypto[1].name == cSelectedName ? 'crypto-element border border-danger' : 'crypto-element'} id={crypto[1].id} key={crypto[1].id}> 
                            <span className="text-black" style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                { truncate(crypto[1].name.substring(0,8)) } 
                            </span>
                            <img 
                                className="img-thumbnail border-0 rounded-circle crypto-logo"
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