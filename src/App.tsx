import React, {useEffect, useState} from 'react';
import './style/App.css';
import {Services} from "./Services";
import {Product, World} from "./world";
import 'react-pro-sidebar/dist/css/styles.css';
import SideBar from "./components/SideBar";
import {Button, Col, Container, Row} from "react-bootstrap";
import ProductComponent from "./components/Product";


function App() {
    const [services, setServices] = useState(new Services(""))
    const [world, setWorld] = useState(new World())
    const [qtmulti, setqtmiltu ]= useState("1")

    const multiplicateur = () =>{
        switch (qtmulti){
            case "1":
                return  setqtmiltu("10")
            case '10':
                return  setqtmiltu('100')
            case '100':
                return  setqtmiltu('Max')
            case 'Max':
                return  setqtmiltu('1')

        }
    }

    function onProductionDone(p: Product): void {
        addToScore(p.revenu)
    }
    function addToScore(value:number):void{
        setWorld(w=>({...w, money:w.money+value,score:w.score+value}))
    }

    function onProductBuy(price: number, product: Product):void{
        // services.putProduct(product)
        setWorld(w=>({...w, money:w.money-price}))
    }

    function onHireManager(money:number,product:Product){
        setWorld(w=>({...w, money:money, }))
    }

    useEffect(() => {
        let services = new Services('marie')
        setServices(services)
        services.getWorld().then(response => {
                setWorld(response.data)
            }
        )
    }, [])
    if (world.products.product.length ===0) return (<div></div>)
    else {
        return (
            <div className="App">
                <SideBar wordName={world.name} managers={world.managers} products={world.products}
                         money={world.money} services={services} unlocks={world.allunlocks}
                onHireManager={onHireManager}/>
                <main>
                    <Container fluid className="mb-5">
                        <Row>
                            <Col>score : {world.score}</Col>
                            <Col>${world.money}</Col>
                            <Col><Button onClick={multiplicateur}>x{qtmulti}</Button></Col>
                            <Col>{services.user}</Col>
                        </Row>
                    </Container>
                    {/*<Products products={world.products} services={services} qtmulti={qtmulti} wordmoney={world.money}/>*/}
                    <Container fluid className='listProduct'>
                        <Row xs={1} md={1} lg={2} className="g-5">
                            <Col>
                                <ProductComponent key={world.products.product[0].name} prod={world.products.product[0]}
                                                  services={services} qtmulti={qtmulti}
                                                  wordmoney={world.money} onProductionDone={onProductionDone}
                                                  onProductBuy={onProductBuy}/>
                            </Col>
                            <Col>
                                <ProductComponent key={world.products.product[1].name} prod={world.products.product[1]}
                                                  services={services} qtmulti={qtmulti}
                                                  wordmoney={world.money} onProductionDone={onProductionDone}
                                                  onProductBuy={onProductBuy}/>
                            </Col>
                        </Row>
                        <Row xs={1} md={1} lg={2} className="g-5">
                            <Col>
                                <ProductComponent key={world.products.product[2].name} prod={world.products.product[2]}
                                                  services={services} qtmulti={qtmulti}
                                                  wordmoney={world.money} onProductionDone={onProductionDone}
                                                  onProductBuy={onProductBuy}/>
                            </Col>
                            <Col>
                                <ProductComponent key={world.products.product[3].name} prod={world.products.product[3]}
                                                  services={services} qtmulti={qtmulti}
                                                  wordmoney={world.money} onProductionDone={onProductionDone}
                                                  onProductBuy={onProductBuy}/>
                            </Col>
                        </Row>
                        <Row xs={1} md={1} lg={2} className="g-5">
                            <Col>
                                <ProductComponent key={world.products.product[4].name} prod={world.products.product[4]}
                                                  services={services} qtmulti={qtmulti}
                                                  wordmoney={world.money} onProductionDone={onProductionDone}
                                                  onProductBuy={onProductBuy}/>
                            </Col>
                            <Col>
                                <ProductComponent key={world.products.product[5].name} prod={world.products.product[5]}
                                                  services={services} qtmulti={qtmulti}
                                                  wordmoney={world.money} onProductionDone={onProductionDone}
                                                  onProductBuy={onProductBuy}/>
                            </Col>
                        </Row>
                    </Container>
                </main>
            </div>
        );
    }
}

export default App;
