import React from 'react';

import useGyroscope from '../hooks/useGyroscope';
import { APP_VIEW_STATE } from '../App';




export interface IGyroscopesProps {
    switchView: ( view: APP_VIEW_STATE ) => void;
}


export const Gyroscopes = ( props: IGyroscopesProps ) => {

    const [ sensorValues ] = useGyroscope();
    
    // console.log( sensorValues );

    return <div>
        <div>
            <button onClick={ () => props.switchView( APP_VIEW_STATE.MAIN )} >
                POWRÓT
            </button>
        </div>
        <div>
            { sensorValues.error ?
                <p>Błąd: { sensorValues.msg }</p>
            :
                <div>

                    <div>
                        <div>
                            accelerationIncludingGravity x: { sensorValues.x.toFixed(2) } m/s2
                        </div>
                        <div>
                            accelerationIncludingGravity y: { sensorValues.y.toFixed(2) } m/s2
                        </div>
                        <div>
                            accelerationIncludingGravity z: { sensorValues.z.toFixed(2) } m/s2
                        </div>
                    </div>
                    
                    <div>
                        <div>
                            rotation alpha: { sensorValues.alpha.toFixed(2) } deg/s
                        </div>
                        <div>
                            rotation beta: { sensorValues.beta.toFixed(2) } deg/s
                        </div>
                        <div>
                            rotation gamma: { sensorValues.gamma.toFixed(2) } deg/s
                        </div>
                    </div>

                </div>
            }
        </div>
    </div>

}
