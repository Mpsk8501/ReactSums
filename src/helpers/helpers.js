

const delay = (mS) => new Promise((resolve) => {
    setTimeout((() => resolve()),mS)
});

let fadeIn = async (time,ref) =>{
    let opacity = 0;
    while (opacity<=1&&ref){
        await delay(time/100);
        opacity+=0.01;
        ref.current.style.opacity = opacity;
    }
};

export {delay,fadeIn}