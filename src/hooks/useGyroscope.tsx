import React from 'react';



interface IGyroscope {
    msg: string;
    error: boolean;
    x: number;
    y: number;
    z: number;
    alpha: number;
    beta: number;
    gamma:  number;
}


const useGyroscope = (): [ IGyroscope ]  => {

    const [ sensorValues, setSensorValues ] = React.useState<IGyroscope>({
        msg: '',
        error: false,
        x: 0,
        y: 0,
        z: 0,
        alpha: 0,
        beta: 0,
        gamma: 0
    });


    const accelerationListener = ( e: DeviceMotionEvent ) => {
        
        console.log('deviceMotionEvent')
        // console.log(e);

        if ( e.accelerationIncludingGravity ) {
            
            const sx = e.accelerationIncludingGravity.x;
            const sy = e.accelerationIncludingGravity.y;
            const sz = e.accelerationIncludingGravity.z;

            let salpha = 0;
            let sbeta = 0;
            let sgamma = 0;

            if ( e.rotationRate ) {
                salpha = e.rotationRate.alpha ? e.rotationRate.alpha : 0;
                sbeta = e.rotationRate.beta ? e.rotationRate.beta : 0;
                sgamma = e.rotationRate.gamma ? e.rotationRate.gamma : 0;
            }

            setSensorValues({
                ...sensorValues,
                x: sx ? sx : 0,
                y: sy ? sy : 0,
                z: sz ? sz : 0,
                alpha: salpha,
                beta: sbeta,
                gamma: sgamma
            })

        } else {
            setSensorValues({
                msg: 'No sensors detected!',
                error: true,
                x: 0,
                y: 0,
                z: 0,
                alpha: 0,
                beta: 0,
                gamma: 0
            });
        }

        
        
    }


    React.useEffect( () => {

        window.addEventListener('devicemotion', accelerationListener );

        window.addEventListener( 'deviceorientation ', e => {
            console.log( e );
        });

        return () => {
            console.log('Devicemotion listener removed');
            window.removeEventListener( 'devicemotion', accelerationListener );
        }
        
    }, [ sensorValues.error, sensorValues.x ] );

    return [ sensorValues ];

}


export default useGyroscope;
