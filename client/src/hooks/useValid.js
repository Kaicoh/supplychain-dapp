import { useState } from 'react';

const useValid = () => {
    const [valid, setValid] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const setValidities = (validity) => {
        setValid(validity);
        setInvalid(!validity);
    };

    const clearValidities = () => {
        setValid(false);
        setInvalid(false);
    };

    return [valid, invalid, setValidities, clearValidities];
};

export default useValid;
