import React, {Fragment} from 'react';
import '../../Style/Loading.scss';
export function Loading(){
    return(
        <Fragment>
        <h1>Loading...</h1>
        <main>
            <loading>
                <span class="heartL"></span>
                <span class="heartR"></span>
                <span class="square"></span>
            </loading>
            <shadow></shadow>
        </main>
        </Fragment>
    );
}

export default Loading;