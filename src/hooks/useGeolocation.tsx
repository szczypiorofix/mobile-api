import React from 'react';


interface IGeolocationState {
    error: boolean;
    message: string;
    longitude: number;
    latitude: number;
    accuracy: number;
    loaded: boolean;
}


const useGeolocation = (): [ IGeolocationState, () => void ] => {

    const [ location, setLocation ] = React.useState<IGeolocationState>({
        accuracy: 0,
        error: false,
        message: '',
        latitude: 0,
        longitude: 0,
        loaded: false
    });

    const getPosition = () =>{
        navigator.geolocation.getCurrentPosition(
            ( position: GeolocationPosition ) => {
                console.log('Acquired geolocation data:');
                console.log(position);

                setLocation({
                    error: false,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    loaded: true,
                    message: ''
                });
            },
            ( err:GeolocationPositionError ) => {
                console.error(err);
                let errorMessage = '';
                switch(err.code) {
                    case GeolocationPositionError.PERMISSION_DENIED:
                        errorMessage = 'Braz zezwolenia na określenie lokalizacji przez użytkownika.';
                        break;
                    case GeolocationPositionError.POSITION_UNAVAILABLE:
                        errorMessage = 'Określenie geolokacji jest niemożliwe.';
                        break;
                    default:
                        errorMessage = 'Upłynął czas oczekiwania na określenie lokalizacji.';
                }
                setLocation({
                    ...location,
                    message: errorMessage,
                    error: true,
                    latitude: 0,
                    longitude: 0,
                    accuracy: 0
                });
            },
            {
                enableHighAccuracy: true,
                maximumAge: 1000,
                timeout: 5000
            }
        );
    };

    const refresh = () => {
        setLocation({
            ...location,
            loaded: false
        })
    }

    React.useEffect( () => {
        if ( !location.loaded ) {
            getPosition();
        }
    }, [ location.loaded ]);

      
    return [ location, refresh ];

}


export default useGeolocation;
