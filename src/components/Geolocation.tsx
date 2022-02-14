import React from 'react';
import { APP_VIEW_STATE } from '../App';
import useGeolocation from '../hooks/useGeolocation';




export interface IGeolocationProps {
    switchView: ( view: APP_VIEW_STATE ) => void;
}


export const Geolocation = ( props: IGeolocationProps ) => {

    const [ location, refresh ] = useGeolocation();

    const showGeolocationDetails = (): JSX.Element => {
        return <div className="geolocationDetails">
            <p>Szerokość geograficzna: : { location.latitude } { location.latitude > 0 ? 'N' : 'S' }</p>
            <p>Długość geograficzna: { location.longitude } { location.longitude > 0 ? 'E' : 'W' }</p>
            <p>Dokładność do: { location.accuracy } metrów</p>
        </div>
    }

    return <div className="geolocation">
        <div className="buttons">
            <button onClick={ () => props.switchView( APP_VIEW_STATE.MAIN )} >
                POWRÓT
            </button>
             <button
                 onClick={ refresh }
             >ODŚWIEŻ</button>
        </div>
        
        <div className="group">
            Current location:
            { !location.error
                ? showGeolocationDetails()
                : <p>Nie można ustalić obecnej lokalizacji.</p>
             }
        </div>
        
    </div>

}
