import { IKContext, IKUpload } from 'imagekitio-react';

const ImageInput = props => {
  const handleSuccess = result => {
    const { url } = result;
    props.onImageChange(url);
  };

  const handleError = error => {
    console.log(error);
    props.onImageChange('');
  };

  return (
    <>
      {props.picture && (
        <img src={props.picture} alt="Selected" width="150" height="150" />
      )}
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
