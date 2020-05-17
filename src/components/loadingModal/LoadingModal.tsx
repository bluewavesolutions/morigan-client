import React, { Component } from 'react';
import Lottie from 'react-lottie';
import * as animationData from './animation.json';
import './LoadingModal.css';

class LoadingModal extends Component {
    defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: (animationData as any).default,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    render() {
        return (
            <div className='loadingModal'>
                <div className='centered'>
                    <Lottie options={this.defaultOptions} 
                        width={256} 
                        height={256} />
                </div>
            </div>
        );
    }
}

export default LoadingModal;