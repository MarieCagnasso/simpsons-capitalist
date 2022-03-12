import React, {useEffect, useState} from 'react';
import './style/App.css';
import {Services} from "./Services";
import {Pallier, Product, World} from "./world";
import 'react-pro-sidebar/dist/css/styles.css';
import SideBar from "./components/SideBar";
import {Button, Col, Container, Row, Toast, ToastContainer} from "react-bootstrap";
import ProductComponent from "./components/Product";


function App() {
    const [services, setServices] = useState(new Services(""))
    const [world, setWorld] = useState(new World())
    const [qtmulti, setqtmiltu] = useState("1")
    const [username, setUsername] = useState("")
    const [showToast, setShowToast] = useState(false);
    const toggleShowToast = () => setShowToast(!showToast);
    const [titleToast, setTitleToast] = useState("");
    const [msgToast, setMsgToast] = useState("");

    const multiplicateur = () => {
        switch (qtmulti) {
            case "1":
                return setqtmiltu("10")
            case '10':
                return setqtmiltu('100')
            case '100':
                return setqtmiltu('Max')
            case 'Max':
                return setqtmiltu('1')

        }
    }
    function onUnlocked(msg:string,title:string){
        setTitleToast(title)
        setMsgToast(msg)
        toggleShowToast()
    }
    function isAllUnlocked(seuil:number){
        world.products.product.map(p =>{
            if (p.quantite<seuil) return false
        })
        return true
    }
    function onAllUnlock(unlock:Pallier){
        if(isAllUnlocked(unlock.seuil)){
            unlock.unlocked = true
            world.products.product.map(p=>{
                if (unlock.typeratio=='VITESSE'){
                    p.vitesse /= unlock.ratio
                    p.timeleft /= unlock.ratio
                }if (unlock.typeratio=='GAIN'){
                    p.revenu *= unlock.ratio
                }
            })
        }
    }
    function onProductionDone(p: Product): void {
        addToScore(p.revenu*p.quantite)
    }

    function addToScore(value: number): void {
        setWorld(w => ({...w, money: w.money + value, score: w.score + value}))
    }

    function onProductBuy(price: number, product: Product): void {
        // services.putProduct(product)
        setWorld(w => ({...w, money: w.money - price}))
    }

    function onHireManager(money: number, product: Product) {
        setWorld(w => ({...w, money: money,}))
    }

    function onUserNameChanged() {
        // @ts-ignore
        let username = document.getElementById("username").value
        if (username!=""){
            localStorage.setItem("username", username);
            setUsername(username)
        }
    }

    useEffect(() => {
        if (username !== "") {
            let services = new Services(username)
            setServices(services)
            services.getWorld().then(response => {
                // let liste = compute_unlocks_list(response.data)
                setWorld(response.data)
                // setUnlockList(liste)
            })
        }
    }, [username])

    useEffect(() => {
        let username = localStorage.getItem("username");
        // si pas de username, on génère un username aléatoire
        if (!username || username === "") {
        username = "Captain" + Math.floor(Math.random() * 10000); }
        localStorage.setItem("username", username);
        setUsername(username)
    }, [])

if (world.products.product.length === 0) return (<div></div>)
else {
    return (
        <div className="App">
            <SideBar wordName={world.name} managers={world.managers} products={world.products}
                     money={world.money} services={services} allunlocks={world.allunlocks}
                     onHireManager={onHireManager}/>
            <main>
                <Container fluid className="mb-5">
                    <Row>
                        <Col>score : {world.score}</Col>
                        <Col>${world.money}</Col>
                        <Col><Button onClick={multiplicateur}>x{qtmulti}</Button></Col>
                        <Col>Username<input id="username" type="text" value={username} onChange={onUserNameChanged}/></Col>
                    </Row>
                    <ToastContainer position="top-end" className="p-3">
                        <Toast show={showToast} onClose={toggleShowToast}>
                            <Toast.Header>
                                <strong className="me-auto">{titleToast}</strong>
                            </Toast.Header>
                            <Toast.Body>{msgToast}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                </Container>
                {/*<Products products={world.products} services={services} qtmulti={qtmulti} wordmoney={world.money}/>*/}
                <Container fluid className='listProduct'>
                    <Row xs={1} md={1} lg={2} className="g-5">
                        <Col>
                            <ProductComponent key={world.products.product[0].name} prod={world.products.product[0]}
                                              services={services} qtmulti={qtmulti}
                                              wordmoney={world.money} onProductionDone={onProductionDone}
                                              onProductBuy={onProductBuy} onUnlocked={onUnlocked}
                                              onAllUnlock={onAllUnlock} allUnlock={world.allunlocks}/>
                        </Col>
                        <Col>
                            <ProductComponent key={world.products.product[1].name} prod={world.products.product[1]}
                                              services={services} qtmulti={qtmulti}
                                              wordmoney={world.money} onProductionDone={onProductionDone}
                                              onProductBuy={onProductBuy} onUnlocked={onUnlocked}
                                              onAllUnlock={onAllUnlock} allUnlock={world.allunlocks}/>
                        </Col>
                    </Row>
                    <Row xs={1} md={1} lg={2} className="g-5">
                        <Col>
                            <ProductComponent key={world.products.product[2].name} prod={world.products.product[2]}
                                              services={services} qtmulti={qtmulti}
                                              wordmoney={world.money} onProductionDone={onProductionDone}
                                              onProductBuy={onProductBuy} onUnlocked={onUnlocked}
                                              onAllUnlock={onAllUnlock} allUnlock={world.allunlocks}/>
                        </Col>
                        <Col>
                            <ProductComponent key={world.products.product[3].name} prod={world.products.product[3]}
                                              services={services} qtmulti={qtmulti}
                                              wordmoney={world.money} onProductionDone={onProductionDone}
                                              onProductBuy={onProductBuy} onUnlocked={onUnlocked}
                                              onAllUnlock={onAllUnlock} allUnlock={world.allunlocks}/>
                        </Col>
                    </Row>
                    <Row xs={1} md={1} lg={2} className="g-5">
                        <Col>
                            <ProductComponent key={world.products.product[4].name} prod={world.products.product[4]}
                                              services={services} qtmulti={qtmulti}
                                              wordmoney={world.money} onProductionDone={onProductionDone}
                                              onProductBuy={onProductBuy} onUnlocked={onUnlocked}
                                              onAllUnlock={onAllUnlock} allUnlock={world.allunlocks}/>
                        </Col>
                        <Col>
                            <ProductComponent key={world.products.product[5].name} prod={world.products.product[5]}
                                              services={services} qtmulti={qtmulti}
                                              wordmoney={world.money} onProductionDone={onProductionDone}
                                              onProductBuy={onProductBuy} onUnlocked={onUnlocked}
                                              onAllUnlock={onAllUnlock} allUnlock={world.allunlocks}/>
                        </Col>
                    </Row>
                </Container>
            </main>
        </div>
    );
}
}

export default App;
