import { useEffect, useState } from "react";
import { RequestMethod, RequestStatus } from "../../types/request";

type T = {
  url : string, 
  method : RequestMethod,
  token ?: string 
};

const useRequest = < DataType >(
    { url, token, method } : T
  ) => 
  {

  const [ status, setStatus ] = useState< RequestStatus >( RequestStatus.Initial );
  const [ data, setData ] = useState< DataType >(  );

  useEffect(() => {

    setStatus( RequestStatus.Sending );

    const sendRequest = async () => {

      const response = await fetch( url, { 
        method,
        headers: {
          "Content-Type": 'application/json',
          "Authorization": token ? `Bearer ${ token }` : ''
        }
      });

      if ( !response.ok ) {

        setStatus( RequestStatus.Errored );

      }

      setStatus( RequestStatus.Completed );

      const data = await response.json();

      setData( data );

    };

    sendRequest();

  }, [  ]);

  return {
    status,
    data
  };

};

export default useRequest;