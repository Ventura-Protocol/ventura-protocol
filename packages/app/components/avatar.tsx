import { useEffect, useState } from 'react';
import Image from 'next/image'

const Avatar = ({multiHandle, size = 50} : { multiHandle: string, size?: number }) => {
    
    const [imageUrl, setImageUrl] = useState();
    const handle = multiHandle.split(':')[1];
    const network = multiHandle.split(':')[0];

    useEffect(()=>{
        let onComplete = setImageUrl;
        if (network === 'TW') {
            const url = `https://cllv3zck15.execute-api.eu-west-1.amazonaws.com/dev/embed?url=https://www.twitter.com/${handle}`;
            
            fetch(url).then(response => response.json())
            .then(({imagePath}) => onComplete(imagePath))
            .catch(console.error);
        }
        return () => { onComplete = (noop)=>noop; }
    },[handle]);
    
    const style = {
        borderRadius: imageUrl || network === 'TW' ? '50%' : '0%',
        width: size,
        height: size,
        position: 'relative',
        overflow: 'hidden',
    }

    return(
        <div style={style}>
            {imageUrl 
            ? <Image src={imageUrl} layout="fill" alt='twitter avatar' />
            : network === 'TW' 
                ? <Image src="/loading.gif" layout="fill" alt='twitter logo' />
                : <Image src="/ig_logo.svg" layout="fill" alt='instagram logo' />}
        </div>
        
    )
}

export default Avatar;