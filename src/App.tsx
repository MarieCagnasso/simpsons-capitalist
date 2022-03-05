import React, {useEffect, useState} from 'react';
import './style/App.css';
import {Services} from "./Services";
import {World} from "./world";
import 'react-pro-sidebar/dist/css/styles.css';
import SideBar from "./components/SideBar";
import Products from "./components/Products";


function App() {
    const [services, setServices] = useState(new Services(""))
    const [world, setWorld] = useState(new World())

    useEffect(() => {
        let services = new Services('marie')
        setServices(services)
        services.getWorld().then(response => {
                setWorld(response.data)
            }
        )
    }, [])

    return (
        <div className="App">
            <SideBar wordName={world.name}/>
            <main>
                    <Products products={world.products} services={services}/>
            </main>
        </div>
    );
}

export default App;
