import React  from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Lottie from "react-lottie";
import * as loadData from "../assets/loading.json";

//Lottie configs
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

export default class CryptoGrid extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          loading: true,
          cryptos: []
        }
    }

    async componentDidMount() {
        await fetch('/api/coinmarketcap/cryptocurrency')
            .then(response => response.json())
            .then(result => {
                let dataArray = Object.keys(result.cryptoData.data).map((key) => [Number(key), result.cryptoData.data[key]]);
                this.setState({ 
                    loading: false,
                    cryptos: dataArray,
                })
            })
            .catch(error => {
                console.log(error);
            });
     }

    render() {
        return (
            (this.state.loading) 
            ?
            <div className="row">
            <div className="col-12 text-center">
                <h1> Loading ... </h1>
                <Lottie options={defaultOptions} height={150} width={150}/>
            </div>
            </div>
            : (
            <Container>
            <Row>
                { this.state.cryptos.map((crypto, index) => {
                    return (
                        <Col> 
                            <span>{ crypto[1].name } </span>
                            <img src={crypto[1].logo} />
                        </Col>  
                    );
                })}
                </Row> 
            </Container>
            )          
        );
    }
}
