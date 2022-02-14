import React, { useState } from 'react';
import { Geolocation } from './components/Geolocation';

import './App.scss';
import { Gyroscopes } from './components/Gyroscopes';



export enum APP_VIEW_STATE {
    MAIN,
    GEOLOCATION,
    ACCELEROMETERS
}


interface IAppState {
    view: APP_VIEW_STATE;
}


const App = ():JSX.Element => {

    const [ state, setState ] = useState<IAppState>({
        view: APP_VIEW_STATE.MAIN
    });


    const mainView = (): JSX.Element => {
        return <div className="mainView">
                <h2>Wybierz funkcjonalność do przetestowania:</h2>
            <div className="buttonsDiv">
                <button
                    onClick={ () => switchView( APP_VIEW_STATE.ACCELEROMETERS ) }
                >Żyroskopy</button>
                <button
                    onClick={ () => switchView( APP_VIEW_STATE.GEOLOCATION ) }
                >Geolokacja</button>

            </div>
        </div>
    }


    const switchView = ( view: APP_VIEW_STATE ) => {
        setState( {
            view: view
        } );
    }

    const viewSelector = () => {
        switch (state.view ) {
            case APP_VIEW_STATE.ACCELEROMETERS:
                return <Gyroscopes
                    switchView={ ( view: APP_VIEW_STATE ) => switchView( view ) }
                />
            case APP_VIEW_STATE.GEOLOCATION:
                return <Geolocation
                    switchView={ ( view: APP_VIEW_STATE ) => switchView( view ) }
                />
            default:
                return mainView();
        }
    }

    return (
        <div className="mainPage">
            <h1>Mobile API demo</h1>
            { viewSelector() }
        </div>
    );
}

export default App;
