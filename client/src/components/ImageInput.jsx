import { IKContext, IKImage, IKUpload } from 'imagekitio-react';

const ImageInput = props => {
  const handleError = err => {
    console.log('Error', err);
  };

  const handleSuccess = res => {
    console.log('Success', res);
  };

  return (
    <>
      {/* {props.image && (
        <img src={props.image} alt="Selected" width="150" height="150" />
      )} */}
      <IKContext
        publicKey={process.env.REACT_APP_IMAGEIO_PUBLIC_KEY}
        authenticationEndpoint={process.env.REACT_APP_IMAGEIO_AUTH_ENDPOINT}
        urlEndpoint={process.env.REACT_APP_IMAGEIO_URL_ENDPOINT}
      >
        <IKUpload onSuccess={handleSuccess} onError={handleError} />
      </IKContext>
    </>
  );
};

export default ImageInput;
