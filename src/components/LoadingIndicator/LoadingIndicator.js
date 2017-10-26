import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
    container: {
      position: 'relative',
    },
    refresh: {
      marginLeft: '50%',
      marginTop: '10%'
    },
  };

  
export const LoadingIndicator = props => {

    return (
        <div style={style.container}>
            <RefreshIndicator
                size={40}
                left={-20}
                top={-20}
                loadingColor={'#68a283'}
                status="loading"
                style={style.refresh}
            />
        </div>
    )

}

  